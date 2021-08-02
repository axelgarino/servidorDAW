package ar.edu.utn.frvm.sistemas.daw2021.servidor.web;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
@RestController
@RequestMapping("/marcas")
public class MarcaControlador {
    
    @Autowired
    private MarcaServicio servicio;

    //Listar Todos
    @GetMapping
    public Iterable<Marca> listarTodos(){
        return servicio.listarTodos();
    }

    //listar todos paginado
    @GetMapping(params = {"sort"})
    public Iterable<Marca> listarTodosPaginado(Pageable pagina) {
        return servicio.listarTodos(pagina);
    }

    //listar uno filtrando por nombre
    @GetMapping(params = {"nombre"})
    public Iterable<Marca> listarFiltradoPorNombre(@RequestParam String nombre) {
        return servicio.listarFiltradoPorNombre(nombre);
    }

    //listar uno filtrando por nombre y paginado
    @GetMapping(params = {"nombre","page"})
    public Iterable<Marca> listarFiltradoPorNombrePaginado(@RequestParam String nombre, Pageable pagina) {
        return servicio.listarFiltradoPorNombrePaginado(nombre,pagina);
    }

    //Listar uno pasando id
    @GetMapping("/{id}")
    public Optional<Marca> listarUno(@PathVariable Long id){
        return servicio.listarUno(id);
    }

    //Guardar
    @PostMapping
    public Marca guardar(@RequestBody Marca m){
        return servicio.guardar(m);
    }

    //Actualizar
    @PutMapping("/{id}")
    public Marca actualizar(@PathVariable Long id, @RequestBody Marca m){
        System.out.println(("getID:" + (m.getId())));
        System.out.println(("ID:" + (id)));
        if(m.getId() != id){
            throw new RuntimeException("El ID no coincide");
        }
        return servicio.actualizar(m);
    }

    //Eliminar
    @DeleteMapping("/{id}")
    public Marca eliminar(@PathVariable Long id){
        return servicio.eliminar(id);
    }

}
