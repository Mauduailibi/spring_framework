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
import com.entra21.stocksales.model.Cliente;

@RestController
public class ClienteController {

	public ClienteController() {
		if (Dados.clientes.isEmpty()) {
			Dados.clientes.add(new Cliente(1, "Ana", "ana@email.com", "1199"));
			Dados.clientes.add(new Cliente(2, "Bruno", "bruno@email.com", "1188"));
			Dados.clientes.add(new Cliente(3, "Carla", "carla@email.com", "1177"));
			Dados.proximoIdCliente = 4;
		}
	}

	@GetMapping("/api/clientes")
	public ArrayList<Cliente> listar() {
		return Dados.clientes;
	}

	@PostMapping("/api/clientes")
	public Cliente cadastrar(@RequestBody Cliente cliente) {
		cliente.setId(Dados.proximoIdCliente);
		Dados.proximoIdCliente = Dados.proximoIdCliente + 1;
		Dados.clientes.add(cliente);
		return cliente;
	}

	@PutMapping("/api/clientes/{id}")
	public Cliente atualizar(@PathVariable int id, @RequestBody Cliente dados) {
		for (int i = 0; i < Dados.clientes.size(); i++) {
			if (Dados.clientes.get(i).getId() == id) {
				Dados.clientes.get(i).setNome(dados.getNome());
				Dados.clientes.get(i).setEmail(dados.getEmail());
				Dados.clientes.get(i).setTelefone(dados.getTelefone());
				return Dados.clientes.get(i);
			}
		}
		return null;
	}

	@DeleteMapping("/api/clientes/{id}")
	public void excluir(@PathVariable int id) {
		for (int i = 0; i < Dados.clientes.size(); i++) {
			if (Dados.clientes.get(i).getId() == id) {
				Dados.clientes.remove(i);
				return;
			}
		}
	}

}
