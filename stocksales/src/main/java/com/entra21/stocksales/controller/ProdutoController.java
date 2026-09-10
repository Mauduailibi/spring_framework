package com.entra21.stocksales.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.stocksales.Dados;
import com.entra21.stocksales.model.Produto;

@RestController
public class ProdutoController {

    public ProdutoController() {
        if (Dados.produtos.isEmpty()) {
            Dados.produtos.add(new Produto(1, "Teclado Mecanico", 250, 12));
            Dados.produtos.add(new Produto(2, "Mouse Gamer", 120, 30));
            Dados.produtos.add(new Produto(3, "Monitor 24", 900, 8));
            Dados.produtos.add(new Produto(4, "Headset", 200, 15));
            Dados.proximoIdProduto = 5;
        }
    }

    @GetMapping("/api/produtos")
    public ArrayList<Produto> listarProdutos() {
        return Dados.produtos;
    }

    @PostMapping("/api/produtos")
    public Produto adicionarProduto(@RequestBody Produto produto) {
        produto.setId(Dados.proximoIdProduto);
        Dados.proximoIdProduto = Dados.proximoIdProduto + 1;
        Dados.produtos.add(produto);
        return produto;
    }

    @DeleteMapping("/api/produtos/{id}")
    public void deletarProduto(@PathVariable int id) {
        for (int i = 0; i < Dados.produtos.size(); i++) {
            if (Dados.produtos.get(i).getId() == id) {
                Dados.produtos.remove(i);
                return;
            }
        }
    }

    @PutMapping("/api/produtos/{id}")
    public Produto atualizarProduto(@PathVariable int id, @RequestBody Produto dados) {
        for (int i = 0; i < Dados.produtos.size(); i++) {
            if (Dados.produtos.get(i).getId() == id) {
                Dados.produtos.get(i).setNome(dados.getNome());
                Dados.produtos.get(i).setPreco(dados.getPreco());
                Dados.produtos.get(i).setEstoque(dados.getEstoque());
                return Dados.produtos.get(i);
            }
        }
        return null;
    }

}
