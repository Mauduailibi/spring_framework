package com.entra21.aula2.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.aula2.model.Aluno;

@RestController
public class AlunoController {

    @GetMapping("/api/alunos")
    public List<Aluno> alunos() {

        List<Aluno> lista = new ArrayList<>();
        lista.add(new Aluno("Ana", "Entra21"));
        lista.add(new Aluno("Bruno", "Entra21"));
        lista.add(new Aluno("Carla", "Entra21"));

        return lista;
    }

}
