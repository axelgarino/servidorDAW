package ar.edu.utn.frvm.sistemas.daw2021.servidor.modelo;


//import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
public class Articulo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String nombreArticulo;
    private String descripcionArticulo;
    private Double precioArticulo;

}
