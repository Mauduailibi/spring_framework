package com.entra21.stocksales;

import java.util.ArrayList;

import com.entra21.stocksales.model.Cliente;
import com.entra21.stocksales.model.Produto;
import com.entra21.stocksales.model.Venda;

public class Dados {

	public static ArrayList<Produto> produtos = new ArrayList<>();
	public static int proximoIdProduto = 1;

	public static ArrayList<Cliente> clientes = new ArrayList<>();
	public static int proximoIdCliente = 1;

	public static ArrayList<Venda> vendas = new ArrayList<>();
	public static int proximoIdVenda = 1;

}
