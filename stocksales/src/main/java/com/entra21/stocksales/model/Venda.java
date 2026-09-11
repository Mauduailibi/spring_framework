package com.entra21.stocksales.model;

public class Venda {
   private int id;
   private int produtoId;
   private int clienteId;
   private int quantidade;
   private double total;
   
   public Venda() {}

   public int getId() {
    return id;
   }

   public void setId(int id) {
    this.id = id;
   }

   public int getProdutoId() {
    return produtoId;
   }

   public void setProdutoId(int produtoId) {
    this.produtoId = produtoId;
   }

   public int getClienteId() {
    return clienteId;
   }

   public void setClienteId(int clienteId) {
    this.clienteId = clienteId;
   }

   public int getQuantidade() {
    return quantidade;
   }

   public void setQuantidade(int quantidade) {
    this.quantidade = quantidade;
   }

   public double getTotal() {
    return total;
   }

   public void setTotal(double total) {
    this.total = total;
   }

   
}
