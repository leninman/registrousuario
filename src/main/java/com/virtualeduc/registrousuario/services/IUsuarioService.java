package com.virtualeduc.registrousuario.services;

import com.virtualeduc.registrousuario.models.Usuario;
import com.virtualeduc.registrousuario.models.DTOS.PersonaDTO;

public interface IUsuarioService {
	
	public Usuario findUsuarioByCedulaAndTipoUsuario(String tipodoc,String numdoc,String tipousuario);
	
	public PersonaDTO findPersonaByCedulaAndTipoUsuario(String tipodoc,String numdoc,String tipoUsuario);
	

}
