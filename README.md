# Spring Framework — Entra21

Repositório único da última disciplina da trilha Java do Entra21.

Aqui ficam os **códigos das aulas**, os **desafios** e os **slides**, para a turma consultar tudo em um só lugar.

## Antes de começar (Windows)

1. Instale o **JDK 21** (LTS): [Adoptium Temurin](https://adoptium.net/)
2. Instale o **VS Code**: [code.visualstudio.com](https://code.visualstudio.com/)
3. No VS Code, instale a extensão **Extension Pack for Java** (Microsoft)
4. Instale também **Spring Boot Extension Pack** (VMware)

Detalhes passo a passo estão nos slides da Aula 01.

## Estrutura do repositório

```text
spring_framework/
├── slides/                 ← slides das aulas (LaTeX Beamer → PDF)
├── ola-spring/             ← projeto feito juntos na Aula 01
└── desafio-saudacao/       ← primeiro desafio (feito sozinho)
```

## Como rodar um projeto Spring Boot

No terminal, dentro da pasta do projeto:

```bash
.\mvnw.cmd spring-boot:run
```

(No macOS/Linux: `./mvnw spring-boot:run`)

Depois abra no navegador: [http://localhost:8080](http://localhost:8080)

## Compilar os slides

Com LaTeX instalado (TeX Live / MiKTeX):

```bash
cd slides/aula-01-introducao
pdflatex slides-aula-01.tex
pdflatex slides-aula-01.tex
```

## Disciplinas anteriores

- Fundamentos de Programação
- Orientação a Objetos
- Java Web
- **Spring Framework** ← você está aqui
