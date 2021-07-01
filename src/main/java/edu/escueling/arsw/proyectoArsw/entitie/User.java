package edu.escueling.arsw.proyectoArsw.entitie;

import java.util.List;

import javax.websocket.Session;

public class User {

    private String sala;

    private String nombreusuario;

    private List<String> messages;

    private Session session;

    public User(String username, String sala, Session session) {
        this.nombreusuario = username;
        this.sala = sala;
        this.session = session;
    }

    public String getsala() {
        return sala;
    }

    public void setsala(String sala) {
        this.sala = sala;
    }

    public String getUsername() {
        return nombreusuario;
    }

    public void setUsername(String username) {
        this.nombreusuario = username;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }


    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }



}
