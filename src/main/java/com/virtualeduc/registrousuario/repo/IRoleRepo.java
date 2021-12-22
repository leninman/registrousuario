/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.virtualeduc.registrousuario.repo;

import com.virtualeduc.registrousuario.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Lenin
 */
public interface IRoleRepo extends JpaRepository<Role, Long>{
    
}
