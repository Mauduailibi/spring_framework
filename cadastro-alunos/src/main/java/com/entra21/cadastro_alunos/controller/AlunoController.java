package com.entra21.cadastro_alunos.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.entra21.cadastro_alunos.model.Aluno;

@RestController
public class AlunoController {
    
    private ArrayList<Aluno> listaDeAlunos = new ArrayList<>();
    private int proximoId = 1;

    @GetMapping("/api/alunos")
    public ArrayList<Aluno> listar() {
        return listaDeAlunos;
    }

    @PostMapping("/api/alunos")
    public Aluno cadastrar(@RequestBody Aluno novoAluno) {
        novoAluno.setId(this.proximoId);
        this.proximoId += 1;
        listaDeAlunos.add(novoAluno);
        return novoAluno;
    }

    @DeleteMapping("/api/alunos/{id}")
    public void excluir(@PathVariable int id){
        for(int i = 0; i < listaDeAlunos.size(); i++) {
            if(listaDeAlunos.get(i).getId() == id) {
                listaDeAlunos.remove(i);
                return;
            }
        }
    }

}
