package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Color;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.ColorRepositorio;
import org.springframework.data.domain.Pageable;


@Service
public class ColorServicio {
    @Autowired
    private ColorRepositorio repositorio;
    //Listar todos normal
    public Iterable<Color> listarTodos(){
        return repositorio.findAll();
    }
    //Listar uno pasando id
    public Optional<Color> listarUno(Long id){
        return repositorio.findById(id);
    }
    //Listar uno pasando nombre
    public Iterable<Color> listarFiltradoPorNombre(String nombre) {
        return repositorio.findByNombreColorContainingIgnoreCase(nombre);
    }
    //Listar uno pasando nombre y paginado
    public Iterable<Color> listarFiltradoPorNombrePaginado(String nombre, Pageable pagina) {
        return repositorio.findByNombreColorContainingIgnoreCase(nombre,pagina);
    }
    //Listar todos paginado
    public Iterable<Color> listarTodos(Pageable pagina) {
        return repositorio.findAll(pagina);
    }

    public Color guardar(Color m){
        return repositorio.save(m);
    }

    public Color actualizar(Color m){
        Optional<Color> instanciaBD=repositorio.findById(m.getId());
        if(instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        return repositorio.save(m);
    }

    public Color eliminar(Long id){
        Optional<Color> instanciaBD=repositorio.findById(id);
        if(instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        repositorio.deleteById(id);
        return instanciaBD.get();
    }
}
