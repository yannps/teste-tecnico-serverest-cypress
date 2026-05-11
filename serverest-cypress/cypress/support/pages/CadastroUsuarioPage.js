class CadastroUsuarioPage {

  get inputNome() {
    return cy.get('[data-testid="nome"]')
  }

  get inputEmail() {
    return cy.get('[data-testid="email"]')
  }

  get inputSenha() {
    return cy.get('[data-testid="password"]')
  }

  get btnCadastrar() {
    return cy.get('[data-testid="cadastrarUsuario"]')
 }

 get checkboxAdmin() {
  return cy.get('[data-testid="checkbox"]')
}

preencherFormulario(nome, email, senha) {
  this.inputNome.click();
  this.inputNome.type(nome);
  this.inputEmail.click();
  this.inputEmail.type(email);
  this.inputSenha.click();
  this.inputSenha.type(senha);
} 

enviarFormularioVazio() {
  this.btnCadastrar.click();
} 

}

module.exports = new CadastroUsuarioPage()
