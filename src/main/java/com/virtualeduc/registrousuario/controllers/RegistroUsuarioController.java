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

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;

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

	@CrossOrigin(origins = { "direccionbase/consultarpersona" })
	@GetMapping(path = "/consultarpersona")
	public PersonaDTO consultarpersona(@RequestParam(name = "tipodoc") String tipodoc,
			@RequestParam(name = "numdoc") String numdoc, @RequestParam(name = "tipousuario") String tipousuario) {

		PersonaDTO persona = new PersonaDTO();

		persona = usuarioservice.findPersonaByCedulaAndTipoUsuario(tipodoc, numdoc, tipousuario);

		return persona;
	}
	
	@CrossOrigin(origins = { "direccionbase/guardarusuario" })
	@PostMapping(path = "/guardarusuario")
	public Usuario guardarusuario(Usuario usuario, @RequestParam(name="tipousuario") String tipousuario,Model model) {
		
		Usuario user=new Usuario(); 
		
		List<Role> roles=new ArrayList<>();
		
		user.setUsername(usuario.getUsername());
		
		String clave=usuario.getPassword();
		
		String bcryptedPassword=passWordEncoder.encode(clave);
		
		user.setPassword(bcryptedPassword);
		
		user.setClave1(bcryptedPassword);
		
		user.setCorreo(usuario.getCorreo());
		
		user.setFechaHoraActClave(new Date());
		
		user.setFechaHoraUltIngreso(new Date());
		
		user.setNombre(usuario.getNombre());
		
		user.setCedula(usuario.getCedula());
		
		
		user.setEnabled(true);
		
		
		
		return user;
		
	}

}
