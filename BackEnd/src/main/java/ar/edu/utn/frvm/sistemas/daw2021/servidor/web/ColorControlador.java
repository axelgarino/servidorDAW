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

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/colores")
public class ColorControlador {
    
    @Autowired
    private ColorServicio servicio;

    //Listar Todos
    @GetMapping
    public Iterable<Color> listarTodos(){
        return servicio.listarTodos();
    }

    //listar todos paginado
    @GetMapping(params = {"sort"})
    public Iterable<Color> listarTodosPaginado(Pageable pagina) {
        return servicio.listarTodos(pagina);
    }

    //listar todos filtrando por nombre
    @GetMapping(params = {"nombre"})
    public Iterable<Color> listarFiltradoPorNombre(@RequestParam String nombre) {
        return servicio.listarFiltradoPorNombre(nombre);
    }

    //listar todos filtrando por nombre y paginado
    @GetMapping(params = {"nombre","page"})
    public Iterable<Color> listarFiltradoPorNombrePaginado(@RequestParam String nombre, Pageable pagina) {
        return servicio.listarFiltradoPorNombrePaginado(nombre,pagina);
    }

    //Listar uno pasando id
    @GetMapping("/{id}")
    public Optional<Color> listarUno(@PathVariable Long id){
        return servicio.listarUno(id);
    }

    //Guardar
    @PostMapping
    public Color guardar(@RequestBody Color m){
        return servicio.guardar(m);
    }

    //Actualizar
    @PutMapping("/{id}")
    public Color actualizar(@PathVariable Long id, @RequestBody Color m){
        if(m.getId() != id){
            throw new RuntimeException("El ID no coincide");
        }
        return servicio.actualizar(m);
    }

    //Eliminar
    @DeleteMapping("/{id}")
    public Color eliminar(@PathVariable Long id){
        return servicio.eliminar(id);
    }

}