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

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.ArticuloServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Articulo;

@RestController
@RequestMapping("/articulos")
public class ArticuloControlador {
    
    @Autowired
    private ArticuloServicio servicio;


    @GetMapping
    public Iterable<Articulo> listarTodos(){
        return servicio.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Articulo> listarUno(@PathVariable Long id){
        return servicio.listarUno(id);
    }

    @PostMapping
    public Articulo guardar(@RequestBody Articulo m){
        return servicio.guardar(m);
    }

    @PutMapping("/{id}")
    public Articulo actualizar(@PathVariable Long id, @RequestBody Articulo m){
        if(m.getId() != id){
            throw new RuntimeException("El ID no coincide");
        }
        return servicio.actualizar(m);
    }

    @DeleteMapping("/{id}")
    public Articulo eliminar(@PathVariable Long id){
        return servicio.eliminar(id);
    }

}