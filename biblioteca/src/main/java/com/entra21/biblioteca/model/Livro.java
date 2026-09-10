package com.entra21.biblioteca.model;

public class Livro {

	private int id;
	private String nome;
	private String autor;
	private int quantidade;

	public Livro() {
	}

	public Livro(int id, String nome, String autor, int quantidade) {
		this.id = id;
		this.nome = nome;
		this.autor = autor;
		this.quantidade = quantidade;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public int getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}

}
