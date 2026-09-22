package com.entra21.banco.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entra21.banco.model.Conta;

public interface ContaRepository extends JpaRepository<Conta, Long> {
    
    Conta findByCpf(String cpf);

}
