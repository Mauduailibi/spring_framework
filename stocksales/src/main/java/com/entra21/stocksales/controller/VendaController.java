package com.entra21.stocksales.controller;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.entra21.stocksales.Dados;
import com.entra21.stocksales.model.Cliente;
import com.entra21.stocksales.model.Produto;
import com.entra21.stocksales.model.Venda;

@RestController 
public class VendaController {

    private final ProdutoController produtoController;

    VendaController(ProdutoController produtoController) {
        this.produtoController = produtoController;
    }

    public Cliente acharCliente(int clienteId) {
        for(int i = 0; i < Dados.clientes.size(); i++) {
            if(Dados.clientes.get(i).getId() == clienteId) {
                return Dados.clientes.get(i);
            }
        }

        return null;
    }

    public Produto acharProduto(int produtoId) {
        for(int i = 0; i < Dados.produtos.size(); i++) {
            if(Dados.produtos.get(i).getId() == produtoId) {
                return Dados.produtos.get(i);
            }
        }

        return null;
    }
    
    @PostMapping("/api/vendas")
    public Venda cadastrar(@RequestBody Venda pedido) {

        Cliente cliente = acharCliente(pedido.getClienteId());
        if(cliente == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não encontrado!");
        }

        Produto produto = acharProduto(pedido.getProdutoId());
        if(produto == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Produto não encontrado!");
        }

        if(produto.getEstoque() < pedido.getQuantidade()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Estoque insuficiente!");
        }

        pedido.setId(Dados.proximoIdVenda);
        Dados.proximoIdVenda++;
        pedido.setTotal(pedido.getQuantidade() * produto.getPreco());
        produto.setEstoque(produto.getEstoque() - pedido.getQuantidade());
        Dados.vendas.add(pedido);

        return pedido;
    }

    @GetMapping("/api/vendas")
    public ArrayList<Venda> listar() {
        return Dados.vendas;
    }

}
