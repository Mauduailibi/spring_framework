package com.entra21.laboratorio.model;

public class Categoria {
    private int id;
    private String nome;

    public Categoria() {}

    public Categoria(int id, String n) {
        this.id = id;
        this.nome = n;
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

    
}
