import { faker } from '@faker-js/faker';

describe('Cenário API: CRUD de Usuários', () => {
  const API = Cypress.env('apiBaseUrl')
  const emailUnico = faker.internet.email()

  const novoUsuario = {
    nome: 'Usuário Teste Cypress API',
    email: emailUnico,
    password: 'senha@123',
    administrador: 'false',
  }

  let usuarioCriadoId

  context('POST — Criação de usuário', () => {
    it('deve criar um novo usuário e retornar status 201 com o ID gerado', () => {
      cy.request({
        method: 'POST',
        url: `${API}/usuarios`,
        body: novoUsuario,
      }).then((response) => {
        usuarioCriadoId = response.body._id

        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body).to.have.property('_id')
      })
    })

    it('deve retornar status 400 ao tentar cadastrar e-mail já existente', () => {
      cy.request({
        method: 'POST',
        url: `${API}/usuarios`,
        body: novoUsuario,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message','Este email já está sendo usado')
      })
    })
  })

  context('GET — Busca de usuário por ID', () => {
    before(() => {
      cy.request({
        method: 'POST',
        url: `${API}/usuarios`,
        body: {
          ...novoUsuario,
          email: `get.${emailUnico}`,
        },
      }).then((res) => {
        usuarioCriadoId = res.body._id
      })
    })

    it('deve retornar os dados do usuário ao buscar por ID válido', () => {
      cy.request({
        method: 'GET',
        url: `${API}/usuarios/${usuarioCriadoId}`,
      }).then((response) => {
        expect(response.status).to.eq(200)

        expect(response.body).to.have.property('nome', novoUsuario.nome)
        expect(response.body).to.have.property('_id', usuarioCriadoId)
        expect(response.body).to.have.property('email')
        expect(response.body).to.have.property('administrador')
      })
    })

    it('deve retornar status 400 ao buscar usuário com ID inexistente', () => {
      cy.request({
        method: 'GET',
        url: `${API}/usuarios/0000000000000000`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Usuário não encontrado')
      })
    })

    it('deve retornar status 400 e informar o formato certo do ID', () => {
      cy.request({
        method: 'GET',
        url: `${API}/usuarios/id_inexistente`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('id', 'id deve ter exatamente 16 caracteres alfanuméricos')
      })
    })
  })

context('DELETE — Exclusão de usuário', () => {
    it('deve excluir um usuário existente e retornar status 200', () => {
      cy.request({
        method: 'DELETE',
        url: `${API}/usuarios/${usuarioCriadoId}`,
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
      })
    })
  })

})
