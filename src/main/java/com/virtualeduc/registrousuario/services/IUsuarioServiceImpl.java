package com.virtualeduc.registrousuario.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.virtualeduc.registrousuario.models.Alumno;
import com.virtualeduc.registrousuario.models.Profesor;
import com.virtualeduc.registrousuario.models.Representante;
import com.virtualeduc.registrousuario.models.Usuario;
import com.virtualeduc.registrousuario.models.DTOS.PersonaDTO;
import com.virtualeduc.registrousuario.models.Role;
import com.virtualeduc.registrousuario.repo.IAlumnoRepo;
import com.virtualeduc.registrousuario.repo.IProfesorRepo;
import com.virtualeduc.registrousuario.repo.IRepresentanteRepo;
import com.virtualeduc.registrousuario.repo.IRoleRepo;
import com.virtualeduc.registrousuario.repo.IUsuarioRepo;

@Service
public class IUsuarioServiceImpl implements IUsuarioService {

    @Autowired
    IAlumnoRepo alumnoRepo;

    @Autowired
    IProfesorRepo profesorRepo;

    @Autowired
    IRepresentanteRepo representanteRepo;

    @Autowired
    IUsuarioRepo usuarioRepo;
    
     @Autowired
    IRoleRepo roleRepo;

    @Override
    public Usuario findUsuarioByCedulaAndTipoUsuario(String tipodoc, String numdoc, String tipousuario) {
        // TODO Auto-generated method stub

        return null;
    }

    @Override
    public PersonaDTO findPersonaByCedulaAndTipoUsuario(String tipodoc, String numdoc, String tipoUsuario) {
        // TODO Auto-generated method stub
        PersonaDTO persona = new PersonaDTO();

        try {

            switch (tipoUsuario) {

                case "Alumno":

                    Alumno alumno = alumnoRepo.findAlumnoByTipoDocAlAndNumDocAl(tipodoc, numdoc);

                    if (alumno != null) {
                        persona.setTipoDocumento(alumno.getTipoDocAl());
                        persona.setNumeroDocumento(alumno.getNumDocAl());
                        persona.setPrimerNombre(alumno.getPrimNombAl());
                        persona.setSegundoNombre(alumno.getSegNombAl());
                        persona.setPrimerApellido(alumno.getPrimApellAl());
                        persona.setSegundoApellido(alumno.getSegApellAl());
                        persona.setCorreo(alumno.getEmailAl());

                    }

                    break;

                case "Profesor":

                    Profesor profesor = profesorRepo.consultarProfesorPorCedula(tipodoc, numdoc);

                    if (profesor != null) {
                        persona.setTipoDocumento(profesor.getTipoDocPrf());
                        persona.setNumeroDocumento(profesor.getNumDocPrf());
                        persona.setPrimerNombre(profesor.getPrimNombPrf());
                        persona.setSegundoNombre(profesor.getSegNombPrf());
                        persona.setPrimerApellido(profesor.getPrimApellPrf());
                        persona.setSegundoApellido(profesor.getSegApellPrf());
                        persona.setCorreo(profesor.getEmailPrf());

                    }

                    break;

                case "Representante":

                    Representante representante = representanteRepo.findRepresentanteByTipoDocRprAndNumDocRpr(tipodoc, numdoc);

                    if (representante != null) {
                        persona.setTipoDocumento(representante.getTipoDocRpr());
                        persona.setNumeroDocumento(representante.getNumDocRpr());
                        persona.setPrimerNombre(representante.getPrimNombRpr());
                        persona.setSegundoNombre(representante.getSegNombRpr());
                        persona.setPrimerApellido(representante.getPrimApellRpr());
                        persona.setSegundoApellido(representante.getSegApellRpr());
                        persona.setCorreo(representante.getEmailRpr());

                    }

                    break;

            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return persona;
    }

    @Override
    public Usuario consultarNombreUsuario(String username) {
        // throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody

        Usuario usuario = usuarioRepo.findByUsername(username);
        
       return usuario;

//        if (usuario != null) {
//            return true;
//        } else {
//            return false;
//        }

    }

    @Override
    public Usuario findUsuarioBytipodocAndnrodoc(String tipodoc, String nrodoc) {
        //throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody

        Usuario usuario = usuarioRepo.findBytipoDocAndnroDoc(tipodoc, nrodoc);
        
        return usuario;

//        if (usuario != null) {
//            return true;
//        } else {
//            return false;
//        }

    }

    @Override
    public Usuario guardarUsuario(Usuario usuario) {
       // throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
       return usuarioRepo.save(usuario);
    }

//    @Override
//    public Role guardarUsuario(Role role) {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
//    
//        return roleRepo.save(role);
//    }

    @Override
    public Role guardarRole(Role role) {
//        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        return roleRepo.save(role);
    }

}
