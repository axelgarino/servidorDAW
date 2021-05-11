package ar.edu.utn.frvm.sistemas.daw2021.servidor.web;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.ColorServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Color;

@RestController
@RequestMapping("/colores")
public class ColorControlador {
    
    @Autowired
    private ColorServicio servicio;


    @GetMapping
    public Iterable<Color> listarTodos(){
        return servicio.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Color> listarUno(@PathVariable Long id){
        return servicio.listarUno(id);
    }

    @PostMapping
    public Color guardar(@RequestBody Color m){
        return servicio.guardar(m);
    }

    @PutMapping("/{id}")
    public Color actualizar(@PathVariable Long id, @RequestBody Color m){
        if(m.getId() != id){
            throw new RuntimeException("El ID no coincide");
        }
        return servicio.actualizar(m);
    }

    @DeleteMapping("/{id}")
    public Color eliminar(@PathVariable Long id){
        return servicio.eliminar(id);
    }

}