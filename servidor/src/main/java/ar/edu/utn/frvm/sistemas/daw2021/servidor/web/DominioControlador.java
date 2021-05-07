package ar.edu.utn.frvm.sistemas.daw2021.servidor.web;

//import java.util.ArrayList;
//import java.util.List;
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

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.DominioServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Dominio;

@RestController
@RequestMapping("/dominios") /* MAPEO de URL */
public class DominioControlador {

    @Autowired
    private DominioServicio servicio;


    // GET Listar Todos
    @GetMapping
    public Iterable<Dominio> listarTodos() {
        return servicio.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Dominio> listarUno(@PathVariable Long id) {
        return servicio.listarUno(id);

    }

    @PostMapping
    public Dominio guardar(@RequestBody Dominio d){
        return servicio.guardar(d);
    }

    @PutMapping("/{id}")
    public Dominio actualizar(@PathVariable Long id, @RequestBody Dominio d){
        if(d.getId() != id){
            throw new RuntimeException("El ID no coincide");
        }
        return servicio.actualizar(d);
    }
    @DeleteMapping("/{id}")
    public Dominio eliminar(@PathVariable Long id){
        return servicio.eliminar(id);

    }

    // GET devuelve 1 dominio
    // POST crear
    // PUT crear
    // DELETE eliminar
}
