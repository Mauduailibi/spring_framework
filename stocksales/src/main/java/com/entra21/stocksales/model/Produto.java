package com.entra21.stocksales.model;

public class Produto {
    
    private int id;
    private String nome;
    private double preco;
    private int estoque;

    public Produto(int id, String n, double p, int e) {
        this.id = id;
        this.nome = n;
        this.preco = p;
        this.estoque = e;
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

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public int getEstoque() {
        return estoque;
    }

    public void setEstoque(int estoque) {
        this.estoque = estoque;
    }

    

}
