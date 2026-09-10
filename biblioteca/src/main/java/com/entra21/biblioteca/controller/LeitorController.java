package com.entra21.biblioteca.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.biblioteca.Dados;
import com.entra21.biblioteca.model.Leitor;

@RestController
public class LeitorController {

	public LeitorController() {
		if (Dados.leitores.isEmpty()) {
			Dados.leitores.add(new Leitor(1, "Maria", "maria@email.com", "1191"));
			Dados.leitores.add(new Leitor(2, "Jose", "jose@email.com", "1192"));
			Dados.leitores.add(new Leitor(3, "Helena", "helena@email.com", "1193"));
			Dados.proximoIdLeitor = 4;
		}
	}

	@GetMapping("/api/leitores")
	public ArrayList<Leitor> listar() {
		return Dados.leitores;
	}

	@PostMapping("/api/leitores")
	public Leitor cadastrar(@RequestBody Leitor leitor) {
		leitor.setId(Dados.proximoIdLeitor);
		Dados.proximoIdLeitor = Dados.proximoIdLeitor + 1;
		Dados.leitores.add(leitor);
		return leitor;
	}

	@PutMapping("/api/leitores/{id}")
	public Leitor atualizar(@PathVariable int id, @RequestBody Leitor dados) {
		for (int i = 0; i < Dados.leitores.size(); i++) {
			if (Dados.leitores.get(i).getId() == id) {
				Dados.leitores.get(i).setNome(dados.getNome());
				Dados.leitores.get(i).setEmail(dados.getEmail());
				Dados.leitores.get(i).setTelefone(dados.getTelefone());
				return Dados.leitores.get(i);
			}
		}
		return null;
	}

	@DeleteMapping("/api/leitores/{id}")
	public void excluir(@PathVariable int id) {
		for (int i = 0; i < Dados.leitores.size(); i++) {
			if (Dados.leitores.get(i).getId() == id) {
				Dados.leitores.remove(i);
				return;
			}
		}
	}

}
