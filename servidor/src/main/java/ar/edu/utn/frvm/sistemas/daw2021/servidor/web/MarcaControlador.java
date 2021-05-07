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

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.MarcaServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Marca;

@RestController
@RequestMapping("/marcas")
public class MarcaControlador {
    
    @Autowired
    private MarcaServicio servicio;


    @GetMapping
    public Iterable<Marca> listarTodos(){
        return servicio.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Marca> listarUno(@PathVariable Long id){
        return servicio.listarUno(id);
    }

    @PostMapping
    public Marca guardar(@RequestBody Marca m){
        return servicio.guardar(m);
    }

    @PutMapping("/{id}")
    public Marca actualizar(@PathVariable Long id, @RequestBody Marca m){
        if(m.getId() != id){
            throw new RuntimeException("El ID no coincide");
        }
        return servicio.actualizar(m);
    }

    @DeleteMapping("/{id}")
    public Marca eliminar(@PathVariable Long id){
        return servicio.eliminar(id);
    }

}
