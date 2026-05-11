
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

  realizarLogin(email, senha) {
    this.inputEmail.type(email)
    this.inputPassword.type(senha)
    this.btnEntrar.click()
    return this
  }

  exibirMensagemDeErroDeCamposInvalidos() {
    cy.contains('span', 'Email e/ou senha inválidos').should('be.visible');
  }
}

module.exports = new LoginPage()
