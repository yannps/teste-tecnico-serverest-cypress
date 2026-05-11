describe('Cenário API: Autenticação', () => {
  const API = Cypress.env('apiBaseUrl')

  context('Credenciais válidas', () => {
    it('deve retornar status 200 e um token ao autenticar com sucesso', () => {
      cy.fixture('usuarios').then(({ usuarioValido }) => {
        cy.request({
          method: 'POST',
          url: `${API}/login`,
          body: {
            email: usuarioValido.email,
            password: usuarioValido.password,
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('message', 'Login realizado com sucesso')
          expect(response.body).to.have.property('authorization')

        })
      })
    })
  })
context('Credenciais inválidas', () => {
    it('deve retornar status 401 ao informar senha incorreta e não realizar login', () => {
      cy.fixture('usuarios').then(({ usuarioInvalido }) => {
        cy.request({
          method: 'POST',
          url: `${API}/login`,
          body: {
            email: usuarioInvalido.email,   
            password: usuarioInvalido.password, 
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(401)
          expect(response.body).to.have.property(
            'message',
            'Email e/ou senha inválidos'
          )
          expect(response.body).not.to.have.property('authorization')
        })
      })
    })
  })
})


