package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Color;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ColorRepositorio extends PagingAndSortingRepository<Color,Long> {
    
    @Query("")
     //Listar uno pasando nombre
     public Iterable<Color> findByNombreColorContainingIgnoreCase(String nombre);
    
     //Listar uno pasando nombre paginado
     public Page<Color> findByNombreColorContainingIgnoreCase(String nombre,Pageable pagina);
}
