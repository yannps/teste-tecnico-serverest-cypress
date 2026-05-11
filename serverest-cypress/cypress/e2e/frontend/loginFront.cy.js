
import LoginPage from '../../support/pages/LoginPage'
import HomePage from '../../support/pages/HomePage'

describe('Cenário 1 — Autenticação de Usuário', () => {
  beforeEach(() => {
    LoginPage.visitar()
  })

  context('Login com credenciais válidas', () => {
    it('deve redirecionar para a página Home após login bem-sucedido', () => {
      cy.fixture('usuarios').then(({ usuarioValido }) => {
        LoginPage.realizarLogin(usuarioValido.email, usuarioValido.password)
        cy.contains('Bem Vindo Fulano da Silva').should('exist')
        cy.contains('Este é seu sistema para administrar seu ecommerce.').should('exist')
        HomePage.btnLogout.should('be.visible')
      })
    })
  })

  context('Login com credenciais inválidas', () => {
    it('deve exibir mensagem de erro ao informar e-mail ou senha incorretos', () => {
      cy.fixture('usuarios').then(({ usuarioInvalido }) => {
        
        LoginPage.realizarLogin(usuarioInvalido.email, usuarioInvalido.password)
        LoginPage.exibirMensagemDeErroDeCamposInvalidos()
      })
    })
  })
})
