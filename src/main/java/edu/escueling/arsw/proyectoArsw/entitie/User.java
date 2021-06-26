package edu.escueling.arsw.proyectoArsw.entitie;

import java.util.List;

import javax.websocket.Session;

public class User {

    private String sala;

    private String nombre;

    private List<String> chatMensajes;

    private Session sesion;


    public User(String nombre, String sala, Session sesion) {
        this.nombre = nombre;
        this.sala = sala;
        this.sesion = sesion;
    }

    public String getsala() {
        return sala;
    }

    public void setsala(String sala) {
        this.sala = sala;
    }

    public String getnombre() {
        return nombre;
    }

    public void setnombre(String nombre) {
        this.nombre = nombre;
    }

    public List<String> getchatMensajes() {
        return chatMensajes;
    }

    public void setchatMensajes(List<String> chatMensajes) {
        this.chatMensajes = chatMensajes;
    }


    public Session getsesion() {
        return sesion;
    }

    public void setsesion(Session sesion) {
        this.sesion = sesion;
    }



}