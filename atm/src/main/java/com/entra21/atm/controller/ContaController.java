package com.entra21.atm.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.atm.model.Conta;

@RestController 
public class ContaController {

    private double saldo = 0;
    
    @GetMapping("/api/conta")
    public Conta consultar() {
        Conta conta = new Conta();
        conta.setSaldo(this.saldo);
        return conta;
    }

    @PostMapping ("/api/conta")
    public Conta operar(@RequestBody Conta dados) {
        double valor = dados.getValor();
        String operacao = dados.getOperacao();

        if (valor <= 0) {
            dados.setErro("Informe um valor maior que zero.");
            dados.setSaldo(this.saldo);
            return dados;
        }

        if (operacao.equals("deposito")) {
            this.saldo = this.saldo + valor;
            dados.setSaldo(this.saldo);
            return dados;
        } 

        if (operacao.equals("saque")) {

            if (valor > this.saldo) {
                dados.setErro("Saldo insuficiente.");
                dados.setSaldo(this.saldo);
                return dados;
            }

            this.saldo = this.saldo - valor;
            dados.setSaldo(this.saldo);
            return dados;

        }

        dados.setErro("Operação inválida.");
        dados.setSaldo(this.saldo);
        return dados;
    }

}
