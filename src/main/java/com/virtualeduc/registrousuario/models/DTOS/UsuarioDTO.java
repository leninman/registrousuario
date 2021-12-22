/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.virtualeduc.registrousuario.models.DTOS;

import java.io.Serializable;

/**
 *
 * @author Lenin
 */
public class UsuarioDTO implements Serializable {

    private String username;

    private String tipodoc;

    private String nrodoc;

    private String claveprimercampo;

    private String clavesegundocampo;

    private String nombre;

    private String correo;

    private String tipousuario;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getClaveprimercampo() {
        return claveprimercampo;
    }

    public void setClaveprimercampo(String claveprimercampo) {
        this.claveprimercampo = claveprimercampo;
    }

    public String getClavesegundocampo() {
        return clavesegundocampo;
    }

    public void setClavesegundocampo(String clavesegundocampo) {
        this.clavesegundocampo = clavesegundocampo;
    }

    public String getTipodoc() {
        return tipodoc;
    }

    public void setTipodoc(String tipodoc) {
        this.tipodoc = tipodoc;
    }

    public String getNrodoc() {
        return nrodoc;
    }

    public void setNrodoc(String nrodoc) {
        this.nrodoc = nrodoc;
    }

    public String getTipousuario() {
        return tipousuario;
    }

    public void setTipousuario(String tipousuario) {
        this.tipousuario = tipousuario;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

}
