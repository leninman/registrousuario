package com.virtualeduc.registrousuario.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualeduc.registrousuario.models.Usuario;
import org.springframework.data.jpa.repository.Query;

public interface IUsuarioRepo extends JpaRepository<Usuario, Long> {

    //public Usuario findByUsername(String username);
    
    @Query(value = "SELECT * from users a "
            + "WHERE a.username=?1 and a.enabled=1", nativeQuery = true)
    public Usuario findByUsername(String username);
    

    @Query(value = "SELECT * from users a "
            + "WHERE a.tipodoc=?1 and a.nrodoc=?2 and a.enabled=1", nativeQuery = true)
    public Usuario findBytipoDocAndnroDoc(String tipodoc, String nrodoc);

}
