package com.entra21.banco.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.entra21.banco.model.Conta;
import com.entra21.banco.model.Movimentacao;
import com.entra21.banco.repository.ContaRepository;
import com.entra21.banco.repository.MovimentacaoRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;

@Controller 
public class ContaController {

    @Autowired 
    ContaRepository contaRepository;

    @Autowired 
    MovimentacaoRepository movimentacaoRepository;

    public Conta contaLogada(HttpSession session) {
        Long contaId = (Long) session.getAttribute("contaId");
        if(contaId == null) {
            return null;
        }

        return contaRepository.findById(contaId).orElse(null);
    }

    public void registrar(Conta conta, String descricao, double valor){
        Movimentacao movimentacao = new Movimentacao();
        movimentacao.setConta(conta);
        movimentacao.setValor(valor);
        movimentacao.setDescricao(descricao);
        movimentacao.setDataHora(LocalDateTime.now());
        movimentacaoRepository.save(movimentacao);
    }
    
    @GetMapping("/conta")
    public String telaConta(Model model, HttpSession session) {
        Conta conta = contaLogada(session);
        if(conta == null) {
            return "redirect:/login";
        }

        model.addAttribute("conta", conta);
        model.addAttribute("movimentacoes", movimentacaoRepository.findByContaOrderByDataHoraDesc(conta));

        return "conta";
    }

    @PostMapping("/deposito")
    public String depositar(@RequestParam double valor, HttpSession session, RedirectAttributes redirect) {
        Conta conta = contaLogada(session);
        if(conta == null) {
            return "redirect:/login";
        }

        if(valor <= 0) {
            redirect.addFlashAttribute("erro", "Digite um valor maior que zero.");
            return "redirect:/conta";
        }

        conta.setSaldo(conta.getSaldo() + valor);
        contaRepository.save(conta);

        registrar(conta, "Depósito", valor);

        redirect.addFlashAttribute("sucesso", "Depósito realizado.");
        return "redirect:/conta";
    }

    @PostMapping("/saque")
    public String sacar(@RequestParam double valor, HttpSession session, RedirectAttributes redirect) {
        Conta conta = contaLogada(session);
        if(conta == null) {
            return "redirect:/login";
        }

        if(valor <= 0) {
            redirect.addFlashAttribute("erro", "Digite um valor maior que zero.");
            return "redirect:/conta";
        }

        if(valor > conta.getSaldo()) {
            redirect.addFlashAttribute("erro", "Saldo insuficiente.");
            return "redirect:/conta";
        }

        conta.setSaldo(conta.getSaldo() - valor);
        contaRepository.save(conta);
        registrar(conta, "Saque", -valor);

        redirect.addFlashAttribute("sucesso", "Saque realizado.");
        return "redirect:/conta";
    }

    @Transactional 
    @PostMapping("/pix")
    public String pix(@RequestParam String cpfDestino, @RequestParam double valor, HttpSession session, RedirectAttributes redirect) {
        Conta origem = contaLogada(session);
        if(origem == null) {
            return "redirect:/login";
        }

        if(valor <= 0) {
            redirect.addFlashAttribute("erro", "Digite um valor maior que zero.");
            return "redirect:/conta";
        }

        Conta destino = contaRepository.findByCpf(cpfDestino);
        if(destino == null) {
            redirect.addFlashAttribute("erro", "Nenhuma conta com esse CPF.");
            return "redirect:/conta";
        }

        if(destino.getId().equals(origem.getId())) {
            redirect.addFlashAttribute("erro", "Proibido PIX para você mesmo.");
            return "redirect:/conta";
        }

        if(valor > origem.getSaldo()) {
            redirect.addFlashAttribute("erro", "Saldo insuficiente.");
            return "redirect:/conta";
        }

        origem.setSaldo(origem.getSaldo() - valor);
        destino.setSaldo(destino.getSaldo() + valor);

        contaRepository.save(origem);
        contaRepository.save(destino);

        registrar(origem, "PIX enviado para " + destino.getNome(), -valor);
        registrar(destino, "PIX recebido de " + origem.getNome(), valor);

        redirect.addFlashAttribute("sucesso", "PIX realizado para " + destino.getNome());
        return "redirect:/conta";
    }

}
