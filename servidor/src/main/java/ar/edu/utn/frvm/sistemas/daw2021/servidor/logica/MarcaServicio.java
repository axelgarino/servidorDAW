package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

//import java.util.ArrayList;
//import java.util.List;
import java.util.Optional;

//Aimport org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Marca;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.MarcaRepositorio;

@Service
public class MarcaServicio {
    
    @Autowired
    private MarcaRepositorio repositorio;

    public Iterable<Marca> listarTodos(){
        return repositorio.findAll();
    }

    public Optional<Marca> listarUno(Long id){
        return repositorio.findById(id);
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
