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
├── aula2/                  ← exercícios da Aula 02
├── cadastro-alunos/        ← CRUD da Aula 03
├── laboratorio/            ← exercícios da primeira parte, Aulas 04 e 05
├── biblioteca/             ← exercícios da primeira parte, a partir da Aula 06
├── stocksales/             ← projeto da loja, segunda parte de cada aula
├── calculadora/            ← exercício: front pronto, API em Java
├── imc/                    ← exercício: calculadora de IMC
├── atm/                    ← exercício: caixa eletrônico
├── tarefas/                ← exercício: lista de tarefas
└── banco/                  ← Aula 08: Thymeleaf + MySQL (login, saldo, PIX, extrato)
```

## Como rodar um projeto Spring Boot

No terminal, dentro da pasta do projeto:

```bash
.\mvnw.cmd spring-boot:run
```

(No macOS/Linux: `./mvnw spring-boot:run`)

Depois abra no navegador: [http://localhost:8080](http://localhost:8080)

## Banco de dados (a partir da Aula 08)

O projeto `banco` usa MySQL. Usamos o **XAMPP**: [apachefriends.org](https://www.apachefriends.org)

1. No XAMPP Control Panel, clique em **Start** no Apache e no MySQL
2. Abra [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
3. Crie o banco `banco` (agrupamento `utf8mb4_general_ci`)
4. Só depois suba o Spring

Usuário `root`, sem senha (padrão do XAMPP).

## Compilar os slides

Com LaTeX instalado (TeX Live / MiKTeX):

```bash
cd slides/aula-06-classe-do-meio
pdflatex slides-aula-06.tex
pdflatex slides-aula-06.tex
```

(Com Tectonic: `tectonic slides-aula-06.tex`.)

## Disciplinas anteriores

- Fundamentos de Programação
- Orientação a Objetos
- Java Web
- **Spring Framework** ← você está aqui
