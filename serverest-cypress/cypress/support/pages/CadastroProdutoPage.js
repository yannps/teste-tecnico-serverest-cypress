class CadastroProdutoPage {

  get inputNome() {
    return cy.get('[data-testid="nome"]')
  }

  get inputPreco() {
    return cy.get('[data-testid="preco"]')
  }

  get inputDescricao() {
    return cy.get('[data-testid="descricao"]')
  }

  get inputQuantidade() {
    return cy.get('[data-testid="quantity"]')
  }

  get btnCadastrar() {
    return cy.get('[data-testid="cadastarProdutos"]')
  }

}

module.exports = new CadastroProdutoPage()
