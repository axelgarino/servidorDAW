package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Color;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.ColorRepositorio;

@Service
public class ColorServicio {
    @Autowired
    private ColorRepositorio repositorio;

    public Iterable<Color> listarTodos(){
        return repositorio.findAll();
    }

    public Optional<Color> listarUno(Long id){
        return repositorio.findById(id);
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
