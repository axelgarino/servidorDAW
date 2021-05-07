package ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia;

import org.springframework.stereotype.Repository;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Marca;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface MarcaRepositorio extends CrudRepository<Marca,Long> {
    
}
