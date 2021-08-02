package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Articulo;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.ArticuloRepositorio;

import org.springframework.data.domain.Pageable;


@Service
public class ArticuloServicio{
    @Autowired
    private ArticuloRepositorio repositorio;
    //Listar todos normal
    public Iterable<Articulo> listarTodos(){
        return repositorio.findAll();
    }

    //Listar uno pasando id
    public Optional<Articulo> listarUno(Long id){
        return repositorio.findById(id);
    }

     //Listar uno pasando nombre
     public Iterable<Articulo> listarFiltradoPorNombre(String nombre) {
        return repositorio.findByNombreArticuloContainingIgnoreCase(nombre);
    }

    //Listar uno pasando nombre y paginado
    public Iterable<Articulo> listarFiltradoPorNombrePaginado(String nombre, Pageable pagina) {
        return repositorio.findByNombreArticuloContainingIgnoreCase(nombre,pagina);
    }

    //Listar todos paginado
    public Iterable<Articulo> listarTodos(Pageable pagina) {
        return repositorio.findAll(pagina);
    }

    //FALTA LISTAR UNO FILTRANDO POR NOMBRE Y COLOR O MARCA
    //Listar uno pasando nombre y tipo
    public Iterable<Articulo> listarFiltradoPorNombreYMarca(String nombre, String m) {
        return repositorio.findByNombreArticuloContainingIgnoreCaseAndMarcaArticulo_NombreMarcaContainingIgnoreCase(nombre,m);
    }

    //Guardar
    public Articulo guardar(Articulo m){
        return repositorio.save(m);
    }

    //Actualizar
    public Articulo actualizar(Articulo m){
        Optional<Articulo> instanciaBD=repositorio.findById(m.getId());
        if(!instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        return repositorio.save(m);
    }

    //Eliminar
    public Articulo eliminar(Long id){
        Optional<Articulo> instanciaBD=repositorio.findById(id);
        if(!instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        repositorio.deleteById(id);
        return instanciaBD.get();
    }
}
