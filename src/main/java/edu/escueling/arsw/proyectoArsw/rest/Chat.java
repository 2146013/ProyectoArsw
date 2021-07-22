package edu.escueling.arsw.proyectoArsw.rest;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.logging.Level;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import edu.escueling.arsw.proyectoArsw.entitie.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;



import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

@Controller
@ServerEndpoint("/apuestasService")
public class Chat {
    private static final Logger loge = Logger.getLogger(Chat.class.getName());

    static Queue<Session> sesion = new ConcurrentLinkedQueue<>();

    private Session sesionPropia = null;

    static HashMap<String, List<User>> salas = new HashMap<>();

    private User usuario;

    private double apuestasSala= 0.0;
    private double apuestasLocal= 0.0;
    private double apuestasVisitante= 0.0;

    @OnMessage
    public void mensaje(String mensaje, Session recibirSesion) {

        this.enviar(mensaje);
    }

    @OnOpen
    public void abrirConexion(Session recibirSesion) {

        sesion.add(recibirSesion);
        sesionPropia = recibirSesion;
        loge.log(Level.INFO, "Connection opened.");
        try {
            recibirSesion.getBasicRemote().sendText("Connection established.");

        } catch (IOException e) {
            loge.log(Level.SEVERE, null, e);
        }

    }

    @OnClose
    public void cerrarConexion(Session recibirSesion) {
        sesion.remove(recibirSesion);

        loge.log(Level.INFO, "Connection closed.");
    }

    @OnError
    public void error(Session recibirSesion, Throwable t) {
        sesion.remove(recibirSesion);
        loge.log(Level.INFO, t.toString());
        loge.log(Level.INFO, "Connection error.");
    }

    private User crearUsuario(JSONObject msgJson) {
        return new User(msgJson.get("nombreusuario").toString(), msgJson.get("sala").toString(), sesionPropia);
    }
    private void mensajeBot(JSONObject msgJson) {
        if (msgJson.get("tipo").toString().equals("ApuestasBot")) {
            if (msgJson.get("message").toString().equals("has joined.")) {

                listaUsuarios(msgJson);

            } else if (msgJson.get("message").toString().equals("has left.")) {

                User nuevoUsuario = encontrarUsuario(msgJson.get("sala").toString(),msgJson);

                salas.get(msgJson.get("sala").toString()).remove(nuevoUsuario);

                listaUsuarios(msgJson);
            }
            else{

              apuestasSala += Double.parseDouble(msgJson.get("valor").toString());
                System.out.println(apuestasSala);
              apuestasLocal += Double.parseDouble(msgJson.get("valorLocal").toString());
              apuestasVisitante += Double.parseDouble(msgJson.get("valorVisitante").toString());

            }
        }
    }


    private JSONObject anadirTiempo(JSONObject msgJson) {
        LocalDateTime fecha = LocalDateTime.now();
        DateTimeFormatter hora = DateTimeFormatter.ISO_LOCAL_TIME;
        String tiempo = fecha.format(hora).toString();

        msgJson.append("time", tiempo);

        return msgJson;
    }



    public void enviar(String mensaje) {

        try {

            JSONObject msgJson = new JSONObject(mensaje);
            String sala = msgJson.get("sala").toString();
            User usuario;
            msgJson = anadirTiempo(msgJson);

            if (salas.containsKey(sala)) {

                anadirUsuario(sala, msgJson);

            } else {
                usuario = crearUsuario(msgJson);
                List<User> usuarios = new ArrayList<User>();
                usuarios.add(usuario);
                salas.put(sala, usuarios);
            }

            mensajeBot(msgJson);
            enviarmensaje(sala, msgJson.toString());

        } catch (JSONException e) {
            loge.log(Level.SEVERE, null, "An error was found JSON.");
        }
    }
    private void enviarmensaje(String sala, String mensaje) {
        //apuestasSala;
        salas.get(sala).forEach(usuario -> {
            try {

                usuario.getSession().getBasicRemote().sendText(mensaje);
                System.out.println(apuestasSala+" holis");
                usuario.getSession().getBasicRemote().sendText(Double.toString(apuestasSala),true);
                usuario.getSession().getBasicRemote().sendText("apuestalocal");
                usuario.getSession().getBasicRemote().sendText(Double.toString(apuestasLocal),true);
                usuario.getSession().getBasicRemote().sendText("apuestavisitante");
                usuario.getSession().getBasicRemote().sendText(Double.toString(apuestasVisitante),true);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    private void anadirUsuario(String sala, JSONObject msgJson) {

        if (encontrarUsuario(sala,msgJson) == null) {
            usuario = crearUsuario(msgJson);
            salas.get(sala).add(crearUsuario(msgJson));
        }
    }

    private User encontrarUsuario(String sala, JSONObject msgJson) {
        return salas.get(sala).stream()
                .filter(usuario -> usuario.getUsername().equals(msgJson.get("nombreusuario").toString()))
                .findFirst().orElse(null);
    }



    private void listaUsuarios(JSONObject msgJson) {
        List<String> usuarios = new ArrayList<String>();

        salas.get(msgJson.get("sala").toString()).forEach(usuario -> {
            usuarios.add("\"" + usuario.getUsername().toString() + "\"");
        });
        // ;
        String msg = '{' + "\"userList\"" + ":" + usuarios.toString() + '}';

        enviarmensaje(msgJson.get("sala").toString(), msg);


    }



}