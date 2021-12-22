package com.virtualeduc.registrousuario.controllers;

import com.virtualeduc.registrousuario.models.DTOS.UsuarioDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.virtualeduc.registrousuario.models.Usuario;

@Controller
@RequestMapping("/app")
public class UsuarioController {
	
	
	@Value("${dir.base}")
    String direccionbase;
    
    @Value("${dir.registro.usuario}")
    String direccionregistrousuario;
	
	@GetMapping("/nuevousuario")
	public String nuevousuario(Model model) {
		
		UsuarioDTO usuariodto=new UsuarioDTO();
		
		model.addAttribute("direccionbase",direccionbase);
		model.addAttribute("direccionregistrousuario",direccionregistrousuario);
		model.addAttribute("usuariodto",usuariodto);
		return "usuarios/crearusuario";
		
	}

}
