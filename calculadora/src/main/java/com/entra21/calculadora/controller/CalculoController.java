package com.entra21.calculadora.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.calculadora.model.Calculo;

@RestController 
public class CalculoController {
    
    @PostMapping("/api/calcular")
    public Calculo calcular(@RequestBody Calculo dados) {

        if(dados.getOperacao().equals("soma")) {
            dados.setResultado(dados.getNumero1() + dados.getNumero2());
            return dados;
        }

        if(dados.getOperacao().equals("subtracao")) {
            dados.setResultado(dados.getNumero1() - dados.getNumero2());
            return dados;
        }

        if(dados.getOperacao().equals("multiplicacao")) {
            dados.setResultado(dados.getNumero1() * dados.getNumero2());
            return dados;
        }

        if(dados.getOperacao().equals("divisao")) {

            if(dados.getNumero2() == 0.0){
                dados.setErro("Impossível dividir por 0");
                return dados;
            }

            dados.setResultado(dados.getNumero1() / dados.getNumero2());
            return dados;

        }

        dados.setErro("Operação inválida");
        return dados;

    }

}
