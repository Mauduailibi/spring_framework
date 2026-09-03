package com.entra21.stocksales.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.stocksales.model.Produto;

@RestController
public class ProdutoController {

    private List<Produto> produtos = new ArrayList<>();
    private int proximoID = 1;
    
    @GetMapping("/api/produtos")
    public List<Produto> listarProdutos() {
        return produtos;
    }

    // Metodo para adicionar produto
    @PostMapping("/api/produtos")
    public Produto adicionarProduto(@RequestBody Produto produto) {
        produto.setId(this.proximoID++);
        produtos.add(produto);
        return produto;
    }

    // Metodo para deletar produto
    @DeleteMapping("/api/produtos/{id}")
    public void deletarProduto(@PathVariable int id){
        for(int i = 0; i < produtos.size(); i++) {
            if(produtos.get(i).getId() == id) {
                produtos.remove(i);
                return;
            }
        }
    }

    // Metodo para atualizar produto
    @PutMapping("/api/produtos/{id}")
    public Produto atualizarProduto(@PathVariable int id, @RequestBody Produto dados) {
        for(int i = 0; i < produtos.size(); i++) {
            if(produtos.get(i).getId() == id) {
                produtos.get(i).setNome(dados.getNome());
                produtos.get(i).setPreco(dados.getPreco());
                produtos.get(i).setEstoque(dados.getEstoque());
                return produtos.get(i);
            }
        }
        return null;
    }

}
