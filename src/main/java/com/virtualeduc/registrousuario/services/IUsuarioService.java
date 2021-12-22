package com.virtualeduc.registrousuario.services;

import com.virtualeduc.registrousuario.models.Usuario;
import com.virtualeduc.registrousuario.models.DTOS.PersonaDTO;
import com.virtualeduc.registrousuario.models.Role;

public interface IUsuarioService {
	
	public Usuario findUsuarioByCedulaAndTipoUsuario(String tipodoc,String numdoc,String tipousuario);
	
	public PersonaDTO findPersonaByCedulaAndTipoUsuario(String tipodoc,String numdoc,String tipoUsuario);
	
        public boolean findUsuarioBytipodocAndnrodoc(String tipodoc,String nrodoc);
        
        public boolean consultarNombreUsuario(String nombredeusuario);
        
        public Usuario guardarUsuario(Usuario usuario);
        
         public Role guardarRole(Role role);

}
