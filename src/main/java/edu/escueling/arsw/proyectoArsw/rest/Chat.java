package edu.escueling.arsw.proyectoArsw.rest;

import edu.escueling.arsw.proyectoArsw.entitie.User;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;

import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Controller
@ServerEndpoint("/chat")
public class Chat {
    static HashMap<String, List<User>> salas = new HashMap<>();
    private User user;
    private Session sesionUsuario = null;

    //se añade el usuario a la sala correspondiente donde el dese realizar su apuesta
    private void anadirUsuario(String sala, JSONObject msgJson) {

        if (buscarUsuarioenSalas(sala, msgJson) == null) {
            user = crearUsuario(msgJson);
            salas.get(sala).add(crearUsuario(msgJson));
        }
    }

    // se busca si e usuario que se unio esta en esa sala
    private User buscarUsuarioenSalas(String sala, JSONObject msgJson) {
        return salas.get(sala).stream()
                .filter(user -> user.getnombre().equals(msgJson.get("username").toString()))
                .findFirst().orElse(null);
    }

    private User crearUsuario(JSONObject msgJson) {
        return new User(msgJson.get("username").toString(), msgJson.get("room").toString(), sesionUsuario);
    }

    //el mennsaje que el usuario hace se envia
    private void enviarMensaje(String sala, String mensaje) {

        salas.get(sala).forEach(user -> {
            try {

                user.getsesion().getBasicRemote().sendText(mensaje);

            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    //revisar si es un mensaje es enviado por la maquina
    private void mensajedelbot(JSONObject msgJson) {
        if (msgJson.get("tipo").toString().equals("Bot")) {
            if (msgJson.get("mensaje").toString().equals("Se ha unido")) {

                enviarlistadeUsuarios(msgJson);

            } else if (msgJson.get("message").toString().equals("has left.")) {
                User newUser = buscarUsuarioenSalas(msgJson.get("sala").toString(), msgJson);
                salas.get(msgJson.get("sala").toString()).remove(newUser);
                enviarlistadeUsuarios(msgJson);
            }
        }
    }

    private void enviarlistadeUsuarios(JSONObject msgJson) {
        List<String> listaUsuarios = new ArrayList<String>();

        salas.get(msgJson.get("sala").toString()).forEach(user -> {
            listaUsuarios.add("\"" + user.getnombre().toString() + "\"");
        });
        // ;
        String msg = '{' + "\"userList\"" + ":" + listaUsuarios.toString() + '}';

        enviarMensaje(msgJson.get("sala").toString(), msg);


    }
}