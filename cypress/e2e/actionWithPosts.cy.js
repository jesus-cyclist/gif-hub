import { serverUrl } from '../../src/constants/url'

describe('test actions with posts', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.viewport(1450, 1000)
    cy.intercept('POST', `${serverUrl}/api/login`, {
      fixture: 'mockLoginUser.json',
    })
    cy.get('[data-test-id="login-button"]').as('login-button')
    cy.get('@login-button').should('have.text', 'Log in')
    cy.get('@login-button').click()
    cy.get('[data-test-id="posts"]').as('posts')
  })

  it('has three posts ', () => {
    cy.get('@posts').should('have.length', 3)
    cy.get('@posts').eq(0).should('have.text', 'Pervaya2022-11-09homerlorem')
    cy.get('@posts').eq(1).should('have.text', 'Vtoraya2021-11-09homer')
  })

  it('can filter', () => {
    cy.get('@posts').eq(0).get('[data-test-id="hashtag"]').eq(0).click()
    cy.get('@posts').should('have.length', 2)
    cy.get('@posts').eq(0).get('[data-test-id="hashtag"]').eq(1).click()
    cy.get('@posts').should('have.length', 1)
  })

  it('can sort', () => {
    cy.get('[data-test-id="input-search"]').as('input-search')
    cy.get('@input-search').type('homer')
    cy.get('@posts').should('have.length', 2)
  })
})
