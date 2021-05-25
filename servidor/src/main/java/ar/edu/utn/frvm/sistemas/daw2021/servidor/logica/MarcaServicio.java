package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

//import java.util.ArrayList;
//import java.util.List;
import java.util.Optional;

//Aimport org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Marca;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.MarcaRepositorio;
import org.springframework.data.domain.Pageable;


@Service
public class MarcaServicio {
    
    @Autowired
    private MarcaRepositorio repositorio;
    //Listar todos normal
    public Iterable<Marca> listarTodos(){
        return repositorio.findAll();
    }
    //Listar uno pasando id
    public Optional<Marca> listarUno(Long id){
        return repositorio.findById(id);
    }
    //Listar uno pasando nombre
    public Iterable<Marca> listarFiltradoPorNombre(String nombre) {
        return repositorio.findByNombreMarcaContainingIgnoreCase(nombre);
    }
    //Listar uno pasando nombre y paginado
    public Iterable<Marca> listarFiltradoPorNombrePaginado(String nombre, Pageable pagina) {
        return repositorio.findByNombreMarcaContainingIgnoreCase(nombre,pagina);
    }
    //Listar todos paginado
    public Iterable<Marca> listarTodos(Pageable pagina) {
        return repositorio.findAll(pagina);
    }

    public Marca guardar(Marca m){
        return repositorio.save(m);
    }

    public Marca actualizar(Marca m){
        Optional<Marca> instanciaBD=repositorio.findById(m.getId());
        if(instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        return repositorio.save(m);
    }

    public Marca eliminar(Long id){
        Optional<Marca> instanciaBD=repositorio.findById(id);
        if(instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        repositorio.deleteById(id);
        return instanciaBD.get();
    }




}
