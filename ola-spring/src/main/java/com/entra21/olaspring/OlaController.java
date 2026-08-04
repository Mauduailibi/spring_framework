package com.entra21.olaspring;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller = a "porta de entrada" da aplicação.
 * Quando alguém acessa um endereço (URL), o método correspondente responde.
 */
@RestController
public class OlaController {

	@GetMapping("/")
	public String home() {
		return "Olá, Spring Boot! Bem-vindo(a) à disciplina.";
	}

	@GetMapping("/ola")
	public String ola() {
		return "Tudo funcionando!";
	}
}
