package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Articulo;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface ArticuloRepositorio extends CrudRepository<Articulo,Long> {
    
}