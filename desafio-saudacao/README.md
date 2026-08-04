# Desafio 01 — Saudação personalizada

Você já viu o projeto `ola-spring` funcionar.  
Agora é a **sua vez**: criar um endpoint que cumprimente a pessoa pelo nome.

## Objetivo

Criar (ou alterar) um projeto Spring Boot com um endpoint:

```text
GET /saudacao?nome=Maria
```

Resposta esperada no navegador:

```text
Olá, Maria! Seja bem-vindo(a) ao Spring.
```

Se a pessoa abrir só `/saudacao` (sem nome), a resposta deve ser:

```text
Olá, visitante! Seja bem-vindo(a) ao Spring.
```

## Passo a passo sugerido

1. Entre em https://start.spring.io
2. Configure igual à aula:
   - **Project:** Maven
   - **Language:** Java
   - **Spring Boot:** a versão padrão do site
   - **Group:** `com.entra21`
   - **Artifact:** `desafio-saudacao`
   - **Package name:** `com.entra21.desafio`
   - **Packaging:** Jar
   - **Java:** 21
   - **Dependency:** Spring Web
3. Gere, baixe, extraia e abra a pasta no VS Code
4. Crie a classe `SaudacaoController` no mesmo pacote da Application
5. Use `@RestController` e `@GetMapping("/saudacao")`
6. Receba o parâmetro com `@RequestParam(required = false)` 
7. Rode com `.\mvnw.cmd spring-boot:run`
8. Teste no navegador

## Dica de código (ponto de partida)

```java
@GetMapping("/saudacao")
public String saudacao(@RequestParam(required = false) String nome) {
    // se nome for null ou vazio → use "visitante"
    // senão → use o nome recebido
    return "Olá, " + /* seu código aqui */ + "! Seja bem-vindo(a) ao Spring.";
}
```

## Critérios de aceite

- [ ] O projeto sobe sem erro
- [ ] `/saudacao?nome=Ana` mostra o nome Ana
- [ ] `/saudacao` (sem parâmetro) mostra "visitante"
- [ ] Você consegue explicar com suas palavras o que `@GetMapping` e `@RequestParam` fazem

## Extra (opcional)

Crie também `/soma?a=2&b=3` que retorne `5` (os dois parâmetros como `int`).

## Entrega

Envie o link do seu repositório **ou** a pasta do projeto compactada, conforme combinado com o professor.
