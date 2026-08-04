# ola-spring

Primeiro projeto Spring Boot da disciplina — feito **juntos** na Aula 01.

## O que este projeto faz?

Sobe um servidor web na porta **8080** e responde texto em dois endereços:

| URL | Resposta |
|-----|----------|
| http://localhost:8080/ | Olá, Spring Boot! Bem-vindo(a) à disciplina. |
| http://localhost:8080/ola | Tudo funcionando! |

## Como rodar (Windows)

No VS Code, abra a pasta `ola-spring` e no terminal:

```bat
.\mvnw.cmd spring-boot:run
```

Aguarde aparecer uma linha parecida com `Started OlaSpringApplication`.  
Depois abra o navegador em http://localhost:8080

Para parar: `Ctrl + C` no terminal.

## Como rodar (macOS / Linux)

```bash
./mvnw spring-boot:run
```

## Arquivos importantes

- `OlaSpringApplication.java` — liga o Spring Boot (`main`)
- `OlaController.java` — define as URLs e as respostas
- `pom.xml` — lista as dependências do projeto
