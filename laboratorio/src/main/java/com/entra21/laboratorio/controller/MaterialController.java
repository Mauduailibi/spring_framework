package com.entra21.laboratorio.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.laboratorio.data.Dados;
import com.entra21.laboratorio.model.Material;

@RestController
public class MaterialController {

	public MaterialController() {
		Dados.proximoIdMaterial = 1;
	}

	@GetMapping("/api/materiais")
	public ArrayList<Material> listar() {
		return Dados.listaMateriais;
	}

	@PostMapping("/api/materiais")
	public Material cadastrar(@RequestBody Material material) {
		material.setId(Dados.proximoIdMaterial);
		Dados.proximoIdMaterial = Dados.proximoIdMaterial + 1;
		Dados.listaMateriais.add(material);
		System.out.println(Dados.listaMateriais);
		return material;
	}

	@DeleteMapping("/api/materiais/{id}")
	public void excluir(@PathVariable int id) {
		for (int i = 0; i < Dados.listaMateriais.size(); i++) {
			if (Dados.listaMateriais.get(i).getId() == id) {
				Dados.listaMateriais.remove(i);
				return;
			}
		}
	}

	@PutMapping("/api/materiais/{id}")
	public Material atualizar(@PathVariable int id, @RequestBody Material dados) {
		for(int i = 0; i < Dados.listaMateriais.size(); i++) {
			if(Dados.listaMateriais.get(i).getId() == id) {
				Dados.listaMateriais.get(i).setNome(dados.getNome());
				Dados.listaMateriais.get(i).setQuantidade(dados.getQuantidade());
				return Dados.listaMateriais.get(i);
			}
		}
		return null;
	}

}
