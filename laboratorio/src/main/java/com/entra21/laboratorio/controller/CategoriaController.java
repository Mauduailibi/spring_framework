package com.entra21.laboratorio.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.laboratorio.data.Dados;
import com.entra21.laboratorio.model.Categoria;

@RestController
public class CategoriaController {

    public CategoriaController() {
        Dados.listaCategorias.add(new Categoria(1, "Material escolar"));
        Dados.listaCategorias.add(new Categoria(2, "Informática"));
        Dados.listaCategorias.add(new Categoria(3, "Vestuário"));
        Dados.listaCategorias.add(new Categoria(4, "Ferramentas"));
        Dados.proximoIdCategoria = 5;
    }

    @GetMapping("/api/categorias")
    public ArrayList<Categoria> listar() {
        return Dados.listaCategorias;
    }

}
