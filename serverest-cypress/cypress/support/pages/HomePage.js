class HomePage {

    get btnCadastrarProdutos() {
    return cy.get('[data-testid="cadastrarProdutos"]')
  }
    get btnLogout() {
    return cy.get('[data-testid="logout"]')
  }

  get btnCadastrarUsuarios() {
    return cy.get('[data-testid="cadastrarUsuarios"]')
  }
}
module.exports = new HomePage()