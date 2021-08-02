package ar.edu.utn.frvm.sistemas.daw2021.servidor.web;

import java.security.Principal;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class SeguridadControlador {
    
    @RequestMapping("/login")
    public Principal login(Principal usuario){
        return usuario;
    }
}
