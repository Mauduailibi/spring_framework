package com.entra21.biblioteca.controller;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.entra21.biblioteca.Dados;
import com.entra21.biblioteca.model.Emprestimo;
import com.entra21.biblioteca.model.Leitor;
import com.entra21.biblioteca.model.Livro;

@RestController
public class EmprestimoController {

    public Leitor acharLeitor(int leitorId) {
        for(int i = 0; i < Dados.leitores.size(); i++) {
            if(Dados.leitores.get(i).getId() == leitorId) {
                return Dados.leitores.get(i);
            }
        }

        return null;
    }

    public Livro acharLivro(int livroId) {
        for(int i = 0; i < Dados.livros.size(); i++) {
            if(Dados.livros.get(i).getId() == livroId) {
                return Dados.livros.get(i);
            }
        }

        return null;
    }
    
    @PostMapping("/api/emprestimos")
    public Emprestimo cadastrar(@RequestBody Emprestimo pedido) {

        // Encontrar o leitor
        Leitor leitor = acharLeitor(pedido.getLeitorId());
        if (leitor == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Leitor não encontrado");
        }

        // Encontrar o livro
        Livro livro = acharLivro(pedido.getLivroId());
        if (livro == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Livro não encontrado");
        }

        // Verificar a quantidade
        if(livro.getQuantidade() < pedido.getQuantidade()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantidade insuficiente");
        }

        // Adicionar na lista
        pedido.setId(Dados.proximoIdEmprestimo);
        Dados.proximoIdEmprestimo++;
        livro.setQuantidade(livro.getQuantidade() - pedido.getQuantidade());
        Dados.emprestimos.add(pedido);
        return pedido;
    }

    @GetMapping("/api/emprestimos")
    public ArrayList<Emprestimo> listar() {
        return Dados.emprestimos;
    }

}
