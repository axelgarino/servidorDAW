package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Dominio;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

@Repository
public interface DominioRepositorio extends PagingAndSortingRepository<Dominio, Long> {

    @Query("")
    public Iterable<Dominio> findByNombreDominioContainingIgnoreCaseAndTipo_NombreContainingIgnoreCase(String n,String t);
    
    public Iterable<Dominio> findByNombreDominioContainingIgnoreCase(String nombre);
    public Page<Dominio> findByNombreDominioContainingIgnoreCase(String nombre,Pageable pagina);

}
