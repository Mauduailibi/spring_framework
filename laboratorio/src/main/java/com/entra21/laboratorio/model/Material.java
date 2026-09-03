package com.entra21.laboratorio.model;

public class Material {

	private int id;
	private String nome;
	private int quantidade;
	private int categoriaId;

	public Material() {
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

	public int getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}

	public int getCategoriaId() {
		return this.categoriaId;
	}

	public void setCategoriaId(int categoriaId){
		this.categoriaId = categoriaId;
	}

}
