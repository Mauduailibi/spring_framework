package com.entra21.aula2.model;

public class Aluno {

    private String nome;
    private String turma;

    public Aluno(String n, String t) {
        this.nome = n;
        this.turma = t;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTurma() {
        return turma;
    }

    public void setTurma(String turma) {
        this.turma = turma;
    }

}