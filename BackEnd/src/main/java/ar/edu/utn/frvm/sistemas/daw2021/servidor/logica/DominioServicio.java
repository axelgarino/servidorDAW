package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

//import java.util.ArrayList;
//import java.util.List;
import java.util.Optional;

//Aimport org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Dominio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.DominioRepositorio;
//import org.springframework.data.domain.Sort;

//import org.springframework.data.domain.Sort.Direction;

@Service
public class DominioServicio {

    @Autowired
    private DominioRepositorio repositorio;

    //Listar todos normal
    public Iterable<Dominio> listarTodos() {
        return repositorio.findAll();
    }
    //Listar uno pasando id
    public Optional<Dominio> listarUno(Long id) {
        return repositorio.findById(id);
    }
    //Listar uno pasando nombre
    public Iterable<Dominio> listarFiltradoPorNombre(String nombre) {
        return repositorio.findByNombreDominioContainingIgnoreCase(nombre);
    }
    //Listar uno pasando nombre y paginado
    public Iterable<Dominio> listarFiltradoPorNombrePaginado(String nombre, Pageable pagina) {
        return repositorio.findByNombreDominioContainingIgnoreCase(nombre,pagina);
    }
    //Listar uno pasando nombre y tipo
    public Iterable<Dominio> listarFiltradoPorNombreYTipo(String nombre, String t) {
        return repositorio.findByNombreDominioContainingIgnoreCaseAndTipo_NombreContainingIgnoreCase(nombre,t);
    }
    //Listar todos paginado
    public Iterable<Dominio> listarTodos(Pageable pagina) {

        return repositorio.findAll(pagina);
    }

    

	public Dominio guardar(Dominio d) {
		return repositorio.save(d);
	}

	public Dominio actualizar(Dominio d) {

        Optional<Dominio> instanciaBD=repositorio.findById(d.getId());
        if(!instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        if (instanciaBD.get().getVencido() ==null || instanciaBD.get().getVencido()){
            throw new RuntimeException("El dominio esta vencido no se puede modificar");
        }
        d.setFechaCreacion(instanciaBD.get().getFechaCreacion());
		return repositorio.save(d);
	}

	public Dominio eliminar(Long id) {
        Optional<Dominio> instanciaBD=repositorio.findById(id);
        if(!instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        repositorio.deleteById(id);
		return instanciaBD.get();
	}

    

    

    

}
