package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Marca;

import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@Repository
public interface MarcaRepositorio extends PagingAndSortingRepository<Marca,Long> {
    
    @Query("")
    //Listar uno pasando nombre
    public Iterable<Marca> findByNombreMarcaContainingIgnoreCase(String nombre);
    
    //Listar uno pasando nombre paginado
    public Page<Marca> findByNombreMarcaContainingIgnoreCase(String nombre,Pageable pagina);


}
