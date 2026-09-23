package com.entra21.banco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.entra21.banco.model.Conta;
import com.entra21.banco.repository.ContaRepository;

import jakarta.servlet.http.HttpSession;

@Controller 
public class AcessoController {

    @Autowired 
    private ContaRepository contaRepository;

    @GetMapping ("/cadastro")
    public String telaCadastro() {
        return "cadastro";
    }

    @PostMapping("/cadastro")
    public String cadastrar(Conta conta, Model model, RedirectAttributes redirect) {

        if(contaRepository.findByCpf(conta.getCpf()) != null) {
            model.addAttribute("erro", "Já existe uma conta com esse CPF.");
            return "cadastro";
        }

        conta.setSaldo(0);
        contaRepository.save(conta);

        redirect.addFlashAttribute("sucesso", "Conta criada! Agora é só entrar.");
        return "redirect:/login";
    }

    @GetMapping("/")
    public String inicio() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String telaLogin() {
        return "login";
    }


    @PostMapping("/login")
    public String entrar(@RequestParam String cpf, @RequestParam String senha, Model model, HttpSession session) {

        Conta conta = contaRepository.findByCpf(cpf);

        if (conta == null || !conta.getSenha().equals(senha)) {
            model.addAttribute("erro", "CPF ou senha incorretos.");
            return "login";
        }

        session.setAttribute("contaId", conta.getId());
        return "redirect:/conta";
    }
    
}
