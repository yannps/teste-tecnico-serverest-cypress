# 🧪 Teste Técnico — Automação com Cypress + ServeRest

Projeto de automação de testes desenvolvido como teste técnico, utilizando o framework **Cypress** para cobrir cenários de testes de **API REST** e **E2E (ponta a ponta)** na aplicação [ServeRest](https://serverest.dev).

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Executar os Testes](#como-executar-os-testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Aplicação Alvo](#aplicação-alvo)
- [CI/CD com GitHub Actions](#cicd-com-github-actions)

---

## 📖 Sobre o Projeto

Este repositório contém a solução de um teste técnico de automação de qualidade de software. Os testes foram implementados com **Cypress** e têm como alvo a aplicação **ServeRest**, que simula uma loja virtual e disponibiliza tanto uma API REST quanto um frontend para fins de estudo e prática em testes.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| [Cypress](https://www.cypress.io/) | Framework principal de automação de testes |
| [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Linguagem de programação |
| [Node.js](https://nodejs.org/) | Ambiente de execução |
| [ServeRest](https://serverest.dev) | API alvo dos testes |
| [GitHub Actions](https://github.com/features/actions) | Pipeline de CI/CD |

---

## ✅ Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) — versão 18 ou superior
- [npm](https://www.npmjs.com/) — instalado junto com o Node.js
- [Git](https://git-scm.com/)

---

## 🚀 Instalação

Clone o repositório e instale as dependências:

```bash
# Clone o repositório
git clone https://github.com/yannps/teste-tecnico-serverest-cypress.git

# Acesse a pasta do projeto
cd teste-tecnico-serverest-cypress/serverest-cypress

# Instale as dependências
npm install
```

---

## ▶️ Como Executar os Testes

### Modo headless (linha de comando)

Executa todos os testes sem interface gráfica, ideal para pipelines de CI/CD:

```bash
npx cypress run
```

### Modo interativo (interface gráfica)

Abre o Cypress Test Runner para execução visual e debug:

```bash
npx cypress open
```

### Executar apenas testes de API

```bash
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"
```

### Executar apenas testes E2E

```bash
npx cypress run --spec "cypress/e2e/**/*.cy.js"
```

---

## 🗂️ Estrutura do Projeto

```
teste-tecnico-serverest-cypress/
├── .github/
│   └── workflows/
│       └── cypress.yml          # Pipeline de CI/CD
└── serverest-cypress/
    ├── cypress/
    │   ├── e2e/                 # Arquivos de teste (.cy.js)
    │   ├── fixtures/            # Dados estáticos para os testes
    │   └── support/
    │       ├── commands.js      # Comandos customizados do Cypress
    │       └── e2e.js           # Configurações globais
    ├── cypress.config.js        # Configuração do Cypress
    ├── package.json
    └── package-lock.json
```

---

## 🎯 Aplicação Alvo

Os testes cobrem as seguintes aplicações do ServeRest:

| Aplicação | URL |
|---|---|
| API REST | [https://serverest.dev](https://serverest.dev) |
| Frontend | [https://front.serverest.dev](https://front.serverest.dev) |
| Documentação Swagger | [https://serverest.dev/#/](https://serverest.dev/#/) |

### Principais endpoints testados

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/usuarios` | Listar usuários |
| `POST` | `/usuarios` | Criar usuário |
| `DELETE` | `/usuarios/{id}` | Excluir usuário |
| `POST` | `/login` | Autenticar usuário |
| `GET` | `/produtos` | Listar produtos |
| `POST` | `/produtos` | Cadastrar produto |

---

## ⚙️ CI/CD com GitHub Actions

O projeto está configurado para rodar automaticamente com **GitHub Actions** a cada `push` ou `pull request` na branch `main`.

> **Atenção:** o arquivo de workflow deve estar em `.github/workflows/cypress.yml` na **raiz** do repositório para que o GitHub Actions o reconheça.

Exemplo de configuração do workflow:

```yaml
name: Cypress Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        working-directory: serverest-cypress
        run: npm install

      - name: Run Cypress tests
        uses: cypress-io/github-action@v6
        with:
          working-directory: serverest-cypress
```

---

## 👤 Autor

Desenvolvido por **[yannps](https://github.com/yannps)** como parte de um processo seletivo técnico.
