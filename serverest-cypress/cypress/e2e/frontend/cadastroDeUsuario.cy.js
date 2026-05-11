import CadastroUsuarioPage from '../../support/pages/CadastroUsuarioPage'
import LoginPage from '../../support/pages/LoginPage'
import HomePage from '../../support/pages/HomePage'

import { faker } from '@faker-js/faker';

describe('Cadastro de Usuario', () => {

    let nomeUsuario = faker.person.fullName();
    let emailUsuario = faker.internet.email();
    let senhaUsuario = faker.internet.password();

    let nomeUsuarioAdmin = faker.person.fullName();
    let emailUsuarioAdmin = faker.internet.email();
    let senhaUsuarioAdmin = faker.internet.password();


  beforeEach(() => {
    cy.fixture('usuarios').then(({ usuarioValido }) => {
      LoginPage.visitar()
      LoginPage.realizarLogin(usuarioValido.email, usuarioValido.password)
      HomePage.btnCadastrarUsuarios.click()
    })
  })

  context('Cadastro com sucesso', () => {
    it('Cadastrar Usuário Comum', () => {
        CadastroUsuarioPage.preencherFormulario(nomeUsuario, emailUsuario, senhaUsuario)
        CadastroUsuarioPage.btnCadastrar.click()
        cy.contains('Lista dos usuários').should('exist')
        cy.contains(emailUsuario).should('exist')
    })
  })

  context('Cadastro com sucesso - Usuário Admin', () => {
    it('Cadastrar Usuário Admin', () => {
        CadastroUsuarioPage.preencherFormulario(nomeUsuarioAdmin, emailUsuarioAdmin, senhaUsuarioAdmin)
        CadastroUsuarioPage.checkboxAdmin.click()
        CadastroUsuarioPage.btnCadastrar.click()
        cy.contains('Lista dos usuários').should('exist')
        cy.contains(emailUsuarioAdmin).should('exist')
    })
  })

  context('Tentativa de cadastro com formulário vazio', () => {
    it('Tentar cadastrar usuário sem preencher os campos', () => {
        CadastroUsuarioPage.enviarFormularioVazio()
        cy.contains('Lista dos Usuários').should('not.exist')
        cy.contains('span', 'Nome é obrigatório').should('be.visible')
        cy.contains('span', 'Email é obrigatório').should('be.visible')
        cy.contains('span', 'Password é obrigatório').should('be.visible')
    })
  })
})

