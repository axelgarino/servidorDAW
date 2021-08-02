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

import ar.edu.utn.frvm.sistemas.daw2021.servidor.logica.ArticuloServicio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Articulo;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
@RestController
@RequestMapping("/articulos")
public class ArticuloControlador {
    
    @Autowired
    private ArticuloServicio servicio;

    //Listar Todos
    @GetMapping
    public Iterable<Articulo> listarTodos(){
        return servicio.listarTodos();
    }

    //listar todos paginado
    @GetMapping(params = {"sort"})
    public Iterable<Articulo> listarTodosPaginado(Pageable pagina) {
        return servicio.listarTodos(pagina);
    }

    //listar uno filtrando por nombre
    @GetMapping(params = {"nombre"})
    public Iterable<Articulo> listarFiltradoPorNombre(@RequestParam String nombre) {
        return servicio.listarFiltradoPorNombre(nombre);
    }

    //listar uno filtrando por nombre y paginado
    @GetMapping(params = {"nombre","page"})
    public Iterable<Articulo> listarFiltradoPorNombrePaginado(@RequestParam String nombre, Pageable pagina) {
        return servicio.listarFiltradoPorNombrePaginado(nombre,pagina);
    }

    //FALTA LISTAR UNO FILTRANDO POR NOMBRE Y COLOR O MARCA

    //Listar uno pasando id
    @GetMapping("/{id}")
    public Optional<Articulo> listarUno(@PathVariable Long id){
        return servicio.listarUno(id);
    }

    //Filtramos por nombre y tipo
    @GetMapping(value="/filtrar")
    public Iterable<Articulo> listarFiltradoPorNombreYMarca(@RequestParam(value="nombre",required = false)String nombre, @RequestParam(value="marcaArticulo",required=false)String m){
        return servicio.listarFiltradoPorNombreYMarca(nombre,m);
    }

    //Guardar
    @PostMapping
    public Articulo guardar(@RequestBody Articulo m){
        return servicio.guardar(m);
    }

    //Actualizar
    @PutMapping("/{id}")
    public Articulo actualizar(@PathVariable Long id, @RequestBody Articulo m){
        if(m.getId() != id){
            throw new RuntimeException("El ID no coincide");
        }
        return servicio.actualizar(m);
    }

    //Eliminar
    @DeleteMapping("/{id}")
    public Articulo eliminar(@PathVariable Long id){
        return servicio.eliminar(id);
    }

}