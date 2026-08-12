package com.entra21.aula2.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import com.entra21.aula2.model.Mensagem;

@RestController
public class MensagemController {
    
    @GetMapping("/api/mensagem")
    public Mensagem mensagem() {
        return new Mensagem("Ola API Spring");
    }
    

}
