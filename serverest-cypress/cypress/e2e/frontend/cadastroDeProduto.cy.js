import CadastroProdutoPage from '../../support/pages/CadastroProdutoPage'
import LoginPage from '../../support/pages/LoginPage'
import HomePage from '../../support/pages/HomePage'

import { faker } from '@faker-js/faker';

describe('Cadastro de Produto', () => {

    let nomeProduto = faker.commerce.productName();
    let precoProduto = faker.number.int({ max: 1000 });
    let descricaoProduto = faker.commerce.productDescription();
    let quantidadeProduto = faker.number.int({ max: 100 });

  beforeEach(() => {
    cy.fixture('usuarios').then(({ usuarioValido }) => {
      LoginPage.visitar()
      LoginPage.realizarLogin(usuarioValido.email, usuarioValido.password)
      HomePage.btnCadastrarProdutos.click()
    })
  })

  context('Cadastro com sucesso', () => {
    it('Cadastrar produto', () => {
        CadastroProdutoPage.preencherFormulario(nomeProduto, precoProduto, descricaoProduto, quantidadeProduto)
        CadastroProdutoPage.btnCadastrar.click()
        cy.contains('Lista dos Produtos').should('exist')
        cy.contains(nomeProduto).should('exist')
    })
  })

  context('Tentativa de cadastro com formulário vazio', () => {
    it('Cadastrar produto sem preencher os campos', () => {
        CadastroProdutoPage.enviarFormularioVazio()
        cy.contains('Lista dos Produtos').should('not.exist')
        cy.contains('span', 'Nome é obrigatório').should('be.visible')
        cy.contains('span', 'Preco é obrigatório').should('be.visible')
        cy.contains('span', 'Descricao é obrigatório').should('be.visible')
        cy.contains('span', 'Quantidade é obrigatório').should('be.visible')
    })
  })
})

