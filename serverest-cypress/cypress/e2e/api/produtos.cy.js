import { faker } from '@faker-js/faker';

describe('Cenário API: CRUD de Produtos', () => {
  const API = Cypress.env('apiBaseUrl')

  let tokenAdmin
  let produtoCriadoId

  before(() => {
    cy.fixture('usuarios').then(({ usuarioValido }) => {
      cy.request({
        method: 'POST',
        url: `${API}/login`,
        body: {
          email: usuarioValido.email,
          password: usuarioValido.password,
        },
      }).then((res) => {
        tokenAdmin = res.body.authorization
      })
    })
  })

  context('POST — Criação de produto', () => {
    it('deve criar um produto com sucesso quando autenticado como administrador', () => {
      cy.fixture('produtos').then(({ produtoValido }) => {
        const produto = {
          ...produtoValido,
          nome: `${produtoValido.nome} ${faker.string.uuid()}`,
        }

        cy.request({
          method: 'POST',
          url: `${API}/produtos`,
          headers: { Authorization: tokenAdmin },
          body: produto,
        }).then((response) => {
          produtoCriadoId = response.body._id

          expect(response.status).to.eq(201)
          expect(response.body).to.have.property(
            'message',
            'Cadastro realizado com sucesso'
          )
          expect(response.body).to.have.property('_id').and.to.be.a('string')
        })
      })
    })

    it('deve retornar status 401 ao tentar criar produto sem token de autenticação', () => {
      cy.fixture('produtos').then(({ produtoValido }) => {
        cy.request({
          method: 'POST',
          url: `${API}/produtos`,
          body: {
            ...produtoValido,
            nome: `${produtoValido.nome} sem token`,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(401)
          expect(response.body).to.have.property('message').and.to.be.a('string')
        })
      })
    })
  })

  context('GET — Listagem de produtos', () => {
    it('deve retornar status 200 e um array de produtos', () => {
      cy.request({
        method: 'GET',
        url: `${API}/produtos`,
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('quantidade').and.to.be.a('number')
        expect(response.body).to.have.property('produtos').and.to.be.an('array')
      })
    })
  })
  
  context('DELETE — Exclusão de produto', () => {
    it('deve excluir o produto criado e retornar status 200', () => {
      cy.fixture('produtos').then(({ produtoValido }) => {
        cy.request({
          method: 'POST',
          url: `${API}/produtos`,
          headers: { Authorization: tokenAdmin },
          body: {
            ...produtoValido,
            nome: `${produtoValido.nome} para exclusao ${faker.string.uuid()}`,
          },
        }).then((createRes) => {
          const idParaExcluir = createRes.body._id

          cy.request({
            method: 'DELETE',
            url: `${API}/produtos/${idParaExcluir}`,
            headers: { Authorization: tokenAdmin },
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(200)
            expect(deleteResponse.body).to.have.property(
              'message',
              'Registro excluído com sucesso'
            )

            cy.request({
              method: 'GET',
              url: `${API}/produtos/${idParaExcluir}`,
              failOnStatusCode: false,
            }).then((getResponse) => {
              expect(getResponse.status).to.eq(400)
              expect(getResponse.body).to.have.property('message', 'Produto não encontrado')
            })
          })
        })
      })
    })
  })
})
