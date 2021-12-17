package com.virtualeduc.registrousuario.controllers;

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
		
		Usuario usuario=new Usuario();
		
		model.addAttribute("direccionbase",direccionbase);
		model.addAttribute("direccionregistrousuario",direccionregistrousuario);
		model.addAttribute("usuario",usuario);
		return "usuarios/crearusuario";
		
	}

}
