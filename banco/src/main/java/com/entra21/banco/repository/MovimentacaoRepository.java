package com.entra21.banco.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entra21.banco.model.Conta;
import com.entra21.banco.model.Movimentacao;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

    List<Movimentacao> findByContaOrderByDataHoraDesc(Conta conta);

}
