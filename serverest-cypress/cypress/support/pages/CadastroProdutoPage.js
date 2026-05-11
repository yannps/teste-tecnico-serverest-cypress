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

preencherFormulario(nome, preco, descricao, quantidade) {
  this.inputNome.click();
  this.inputNome.type(nome);
  this.inputPreco.click();
  this.inputPreco.type(preco);
  this.inputDescricao.click();
  this.inputDescricao.type(descricao);
  this.inputQuantidade.click();
  this.inputQuantidade.type(quantidade);
} 

enviarFormularioVazio() {
  this.btnCadastrar.click();
} 

}

module.exports = new CadastroProdutoPage()
