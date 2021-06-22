package ar.edu.utn.frvm.sistemas.daw2021.servidor.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SeguridadWebConfiguracion extends WebSecurityConfigurerAdapter {{
    
    @Override
    protected void configure(HttpSecurity) {
    http.authorizeRequests().anyRequest().authenticated().and().httpBasic();
    http.cors();
    }
}
