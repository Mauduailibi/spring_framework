package com.entra21.stocksales.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.stocksales.model.Produto;

@RestController
public class ProdutoController {
    
    @GetMapping("/api/produtos")
    public List<Produto> listarProdutos() {

        List<Produto> produtos = new ArrayList<>();

        produtos.add(new Produto(1, "Teclado Mecanico", 250, 12));
        produtos.add(new Produto(2, "Mouse Gamer", 120, 30));
        produtos.add(new Produto(3, "Monitor 24", 900, 8));
        produtos.add(new Produto(4, "Headset", 200, 15));

        return produtos;

    }

}
