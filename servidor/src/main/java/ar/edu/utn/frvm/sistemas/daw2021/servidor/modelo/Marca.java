package ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo;

// import java.util.Date;
// import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
// import javax.persistence.ManyToOne;
// import javax.persistence.OneToMany;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String nombreMarca;
    private String descripcionMarca;

}
