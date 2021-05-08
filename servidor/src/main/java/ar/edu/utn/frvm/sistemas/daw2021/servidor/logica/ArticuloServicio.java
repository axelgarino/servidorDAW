package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Articulo;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.ArticuloRepositorio;

@Service
public class ArticuloServicio{
    @Autowired
    private ArticuloRepositorio repositorio;

    public Iterable<Articulo> listarTodos(){
        return repositorio.findAll();
    }

    public Optional<Articulo> listarUno(Long id){
        return repositorio.findById(id);
    }

    public Articulo guardar(Articulo m){
        return repositorio.save(m);
    }

    public Articulo actualizar(Articulo m){
        Optional<Articulo> instanciaBD=repositorio.findById(m.getId());
        if(instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        return repositorio.save(m);
    }

    public Articulo eliminar(Long id){
        Optional<Articulo> instanciaBD=repositorio.findById(id);
        if(instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        repositorio.deleteById(id);
        return instanciaBD.get();
    }
}
