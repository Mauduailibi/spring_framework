package com.entra21.laboratorio.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.laboratorio.model.Material;

@RestController
public class MaterialController {

	private ArrayList<Material> materiais = new ArrayList<>();
	private int proximoId = 1;

	public MaterialController() {
		materiais.add(new Material(1, "Caneta", 10));
		materiais.add(new Material(2, "Caderno", 5));
		materiais.add(new Material(3, "Grampeador", 2));
		proximoId = 4;
	}

	@GetMapping("/api/materiais")
	public ArrayList<Material> listar() {
		return materiais;
	}

	@PostMapping("/api/materiais")
	public Material cadastrar(@RequestBody Material material) {
		material.setId(proximoId);
		proximoId = proximoId + 1;
		materiais.add(material);
		return material;
	}

	@DeleteMapping("/api/materiais/{id}")
	public void excluir(@PathVariable int id) {
		for (int i = 0; i < materiais.size(); i++) {
			if (materiais.get(i).getId() == id) {
				materiais.remove(i);
				return;
			}
		}
	}

}
