package com.virtualeduc.registrousuario.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.virtualeduc.registrousuario.models.DTOS.PersonaDTO;
import com.virtualeduc.registrousuario.services.IUsuarioService;

@RestController
@RequestMapping("/app")
public class RegistroUsuarioController {

	@Autowired
	IUsuarioService usuarioservice;

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

}
