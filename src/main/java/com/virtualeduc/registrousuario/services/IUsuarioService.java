package com.virtualeduc.registrousuario.services;

import com.virtualeduc.registrousuario.models.Usuario;
import com.virtualeduc.registrousuario.models.DTOS.PersonaDTO;
import com.virtualeduc.registrousuario.models.Role;

public interface IUsuarioService {
	
	public Usuario findUsuarioByCedulaAndTipoUsuario(String tipodoc,String numdoc,String tipousuario);
	
	public PersonaDTO findPersonaByCedulaAndTipoUsuario(String tipodoc,String numdoc,String tipoUsuario);
	
        public Usuario findUsuarioBytipodocAndnrodoc(String tipodoc,String nrodoc);
        
        public Usuario consultarNombreUsuario(String username);
        
        public Usuario guardarUsuario(Usuario usuario);
        
         public Role guardarRole(Role role);

}
