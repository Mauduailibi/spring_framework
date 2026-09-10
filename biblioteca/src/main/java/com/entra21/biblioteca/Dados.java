package com.entra21.biblioteca;

import java.util.ArrayList;

import com.entra21.biblioteca.model.Emprestimo;
import com.entra21.biblioteca.model.Leitor;
import com.entra21.biblioteca.model.Livro;

public class Dados {

	public static ArrayList<Livro> livros = new ArrayList<>();
	public static int proximoIdLivro = 1;

	public static ArrayList<Leitor> leitores = new ArrayList<>();
	public static int proximoIdLeitor = 1;

	public static ArrayList<Emprestimo> emprestimos = new ArrayList<>();
	public static int proximoIdEmprestimo = 1;

}
