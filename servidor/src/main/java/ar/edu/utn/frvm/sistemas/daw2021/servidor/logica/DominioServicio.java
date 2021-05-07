package ar.edu.utn.frvm.sistemas.daw2021.servidor.logica;

//import java.util.ArrayList;
//import java.util.List;
import java.util.Optional;

//Aimport org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo.Dominio;
import ar.edu.utn.frvm.sistemas.daw2021.servidor.persistencia.DominioRepositorio;

@Service
public class DominioServicio {

    @Autowired
    private DominioRepositorio repositorio;

    public Iterable<Dominio> listarTodos() {
        return repositorio.findAll();
    }

    public Optional<Dominio> listarUno(Long id) {
        return repositorio.findById(id);
    }

	public Dominio guardar(Dominio d) {
		return repositorio.save(d);
	}

	public Dominio actualizar(Dominio d) {

        Optional<Dominio> instanciaBD=repositorio.findById(d.getId());
        if(instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        if (instanciaBD.get().getVencido()){
            throw new RuntimeException("El dominio esta vencido no se puede modificar");
        }

		return repositorio.save(d);
	}

	public Dominio eliminar(Long id) {
        Optional<Dominio> instanciaBD=repositorio.findById(id);
        if(instanciaBD.isPresent()){
            throw new RuntimeException("El id no existe");
        }
        repositorio.deleteById(id);
		return instanciaBD.get();
	}
}
