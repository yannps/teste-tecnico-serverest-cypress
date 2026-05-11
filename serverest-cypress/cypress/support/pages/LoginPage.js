
class LoginPage {
  get inputEmail() {
    return cy.get('[data-testid="email"]')
  }

  get inputPassword() {
    return cy.get('[data-testid="senha"]')
  }

  get btnEntrar() {
    return cy.get('[data-testid="entrar"]')
  }


  visitar() {
    cy.visit('/login')
    return this
  }


  digitarEmail(email) {
    this.inputEmail.clear().type(email)
    return this
  }


  digitarSenha(senha) {
    this.inputPassword.clear().type(senha)
    return this
  }

 
  clicarEntrar() {
    this.btnEntrar.click()
    return this
  }


  realizarLogin(email, senha) {
    this.digitarEmail(email)
    this.digitarSenha(senha)
    this.clicarEntrar()
    return this
  }


  deveEstarNaPaginaDeLogin() {
    cy.url().should('include', '/login')
    this.btnEntrar.should('be.visible')
    return this
  }

  deveExibirMensagemDeErroDeCamposInvalidos() {
    cy.contains('span', 'Email e/ou senha inválidos').should('be.visible');
  }
}

module.exports = new LoginPage()
