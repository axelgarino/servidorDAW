package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Articulo;

//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Repository
public interface ArticuloRepositorio extends PagingAndSortingRepository<Articulo,Long> {
    @Query("")
     //Listar uno pasando nombre
     public Iterable<Articulo> findByNombreArticuloContainingIgnoreCase(String nombre);
    
     //Listar uno pasando nombre paginado
     public Page<Articulo> findByNombreArticuloContainingIgnoreCase(String nombre,Pageable pagina);

    //FALTA LISTAR UNO FILTRANDO POR NOMBRE Y COLOR O MARCA
    @Query("")
    //Listar uno pasando nombre y tipo
    public Iterable<Articulo> findByNombreArticuloContainingIgnoreCaseAndMarcaArticulo_NombreMarcaContainingIgnoreCase(String n,String m);
    
}