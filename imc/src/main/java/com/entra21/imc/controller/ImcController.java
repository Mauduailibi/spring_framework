package com.entra21.imc.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.imc.model.Imc;

@RestController 
public class ImcController {
    
    @PostMapping("/api/imc")
    public Imc calcular(@RequestBody Imc dados){

        double peso = dados.getPeso();
        double altura = dados.getAltura();

        if(peso <= 0 || altura <= 0) {
            dados.setErro("Peso e altura devem ser maiores que zero!");
            return dados;
        }

        double imc = peso / (altura * altura);
        dados.setImc(imc);

        if(imc < 18.5) {
            dados.setClassificacao("Abaixo do peso");
        } else if (imc < 25) {
            dados.setClassificacao("Peso normal");
        } else if (imc < 30) {
            dados.setClassificacao("Sobrepeso");
        } else {
            dados.setClassificacao("Obesidade");
        }

        return dados;

    }

}
