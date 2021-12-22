package com.virtualeduc.registrousuario.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.virtualeduc.registrousuario.models.Role;
import com.virtualeduc.registrousuario.models.Usuario;
import com.virtualeduc.registrousuario.models.DTOS.PersonaDTO;
import com.virtualeduc.registrousuario.services.IUsuarioService;
import com.virtualeduc.registrousuario.models.DTOS.AlumnoDTO;
import com.virtualeduc.registrousuario.models.DTOS.UsuarioDTO;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@RestController
@RequestMapping("/app")
public class RegistroUsuarioController {

    @Autowired
    IUsuarioService usuarioservice;

    @Autowired
    private BCryptPasswordEncoder passWordEncoder;

    @Value("${dir.base}")
    String direccionbase;

    @Value("${dir.registro.usuario}")
    String direccionregistrousuario;

    @CrossOrigin(origins = {"direccionbase/consultarpersona"})
    @GetMapping(path = "/consultarpersona")
    public PersonaDTO consultarpersona(@RequestParam(name = "tipodoc") String tipodoc,
            @RequestParam(name = "nrodoc") String nrodoc, @RequestParam(name = "tipousuario") String tipousuario) {

        PersonaDTO persona = new PersonaDTO();

        persona = usuarioservice.findPersonaByCedulaAndTipoUsuario(tipodoc, nrodoc, tipousuario);

        return persona;
    }

    @CrossOrigin(origins = {"direccionbase/guardarusuario"})
    @PostMapping(path = "/guardarusuario")
    public Usuario guardarusuario(UsuarioDTO usuariodto, Model model) {

        Usuario usuario = new Usuario();

        String tipouser = usuariodto.getTipousuario();

        //List<Role> roles = new ArrayList<>();

        usuario.setUsername(usuariodto.getUsername());

        String clave = usuariodto.getClaveprimercampo();

        String bcryptedPassword = passWordEncoder.encode(clave);

        usuario.setClave1(bcryptedPassword);
        
        usuario.setPassword(bcryptedPassword);

        usuario.setCorreo(usuariodto.getCorreo());

        usuario.setFechaHoraActClave(new Date());

        usuario.setFechaHoraUltIngreso(new Date());

        usuario.setNombre(usuariodto.getNombre());

        usuario.setTipodoc(usuariodto.getTipodoc());
        
        usuario.setNrodoc(usuariodto.getNrodoc());

        usuario.setTipousuario(usuariodto.getTipousuario());

        Role role = new Role();

  /* SE LE DARA SOLO UN ROL A CADA USUARIO Y EN ESE ROL TENDRA TODOS LOS PERMISOS 
        NECESARIOS EN LA APLICACION */
  
        switch (tipouser) {
            case "Alumno":
                role.setAuthority("ROLE_USER_ALUMNO");
//                roles.add(role);
                break;

            case "Profesor":
                role.setAuthority("ROLE_USER_PROFESOR");
//                roles.add(role);

                break;

            case "Representante":
                role.setAuthority("ROLE_USER_REPRESENTANTE");
//                roles.add(role);

                break;

            case "Administrativo":
                role.setAuthority("ROLE_USER_ADMINISTRATIVO");
//                roles.add(role);

                break;

            case "Directivo":
                role.setAuthority("ROLE_USER_DIRECTIVO");
//                roles.add(role);
                break;
        }
        
        //usuario.setRoles(roles);

        usuario.setEnabled(true);
        
        Usuario nuevousuario=usuarioservice.guardarUsuario(usuario);
        
        role.setUserid(nuevousuario.getId());
        
        Role rolenuevousuario=usuarioservice.guardarRole(role);
       
        usuario=nuevousuario;

        return usuario;

    }

    @CrossOrigin(origins = {"direccionbase/consultarusuarioporcedula"})
    @GetMapping(path = "/consultarusuarioporcedula")
    public boolean consultarusuarioporcedula(@RequestParam(name = "tipodoc") String tipodoc,@RequestParam(name = "nrodoc") String nrodoc) {

        return usuarioservice.findUsuarioBytipodocAndnrodoc(tipodoc,nrodoc);

    }

    @CrossOrigin(origins = {"direccionbase/consultarnombredeusuario"})
    @GetMapping(path = "/consultarnombredeusuario")
    public boolean consultarnombredeusuario(@RequestParam(name = "usuario") String usuario) {

        return usuarioservice.consultarNombreUsuario(usuario);

    }

}
