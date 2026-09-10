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
import com.entra21.biblioteca.model.Livro;

@RestController
public class LivroController {

	public LivroController() {
		if (Dados.livros.isEmpty()) {
			Dados.livros.add(new Livro(1, "Dom Casmurro", "Machado de Assis", 5));
			Dados.livros.add(new Livro(2, "O Cortico", "Aluisio Azevedo", 3));
			Dados.livros.add(new Livro(3, "Capitaes da Areia", "Jorge Amado", 4));
			Dados.livros.add(new Livro(4, "A Hora da Estrela", "Clarice Lispector", 2));
			Dados.proximoIdLivro = 5;
		}
	}

	@GetMapping("/api/livros")
	public ArrayList<Livro> listar() {
		return Dados.livros;
	}

	@PostMapping("/api/livros")
	public Livro cadastrar(@RequestBody Livro livro) {
		livro.setId(Dados.proximoIdLivro);
		Dados.proximoIdLivro = Dados.proximoIdLivro + 1;
		Dados.livros.add(livro);
		return livro;
	}

	@PutMapping("/api/livros/{id}")
	public Livro atualizar(@PathVariable int id, @RequestBody Livro dados) {
		for (int i = 0; i < Dados.livros.size(); i++) {
			if (Dados.livros.get(i).getId() == id) {
				Dados.livros.get(i).setNome(dados.getNome());
				Dados.livros.get(i).setAutor(dados.getAutor());
				Dados.livros.get(i).setQuantidade(dados.getQuantidade());
				return Dados.livros.get(i);
			}
		}
		return null;
	}

	@DeleteMapping("/api/livros/{id}")
	public void excluir(@PathVariable int id) {
		for (int i = 0; i < Dados.livros.size(); i++) {
			if (Dados.livros.get(i).getId() == id) {
				Dados.livros.remove(i);
				return;
			}
		}
	}

}
