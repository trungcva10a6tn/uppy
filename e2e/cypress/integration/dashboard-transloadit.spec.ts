describe('Dashboard with Transloadit', () => {
  beforeEach(() => {
    cy.visit('/dashboard-transloadit')
    cy.get('.uppy-Dashboard-input').as('file-input')
    cy.intercept('/assemblies/*').as('assemblies')
    cy.intercept('/resumable/*').as('resumable')
  })

  xit('should upload cat image successfully', () => {
    cy.get('@file-input').attachFile('images/cat.jpg')
    cy.get('.uppy-StatusBar-actionBtn--upload').click()

    cy.wait('@assemblies')
    cy.wait('@resumable')

    cy.get('.uppy-StatusBar-statusPrimary').should('contain', 'Complete')
  })

  xit('should close assembly polling when cancelled', () => {
    cy.get('@file-input').attachFile(['images/cat.jpg', 'images/traffic.jpg'])
    cy.get('.uppy-StatusBar-actionBtn--upload').click()

    cy.wait('@assemblies')

    cy.window().then(({ uppy }) => {
      expect(Object.values(uppy.getPlugin('Transloadit').activeAssemblies).every((a: any) => a.pollInterval)).to.equal(true)
    })
    cy.get('button[data-cy=cancel]').click()

    cy.window().then(({ uppy }) => {
      expect(Object.values(uppy.getPlugin('Transloadit').activeAssemblies).some((a: any) => a.pollInterval)).to.equal(false)
    })
  })

  it('should complete on retry', () => {
    cy.get('@file-input').attachFile(['images/cat.jpg', 'images/traffic.jpg'])
    cy.get('.uppy-StatusBar-actionBtn--upload').click()

    // returning false here prevents Cypress from failing the test.
    // Using `new Function` here otherwise Webpack cries like the little bitch it is.
    // TODO: handle the exception in the code.
    Cypress.on(
      'uncaught:exception',
      // eslint-disable-next-line no-new-func
      new Function(`return arguments[1].title !== 'should complete on retry' || arguments[0]?.cause?.cause !== 'Internal Server Error'`),
    )

    cy.intercept(
      { method: 'POST', pathname: '/assemblies', times: 5 },
      { statusCode: 500, body: {} },
    )

    cy.get('button[data-cy=retry]').click()

    cy.wait('@assemblies')
    cy.wait('@resumable')

    cy.get('.uppy-StatusBar-statusPrimary').should('contain', 'Complete')
  })

  it('should complete when resuming after pause', () => {
    cy.get('@file-input').attachFile(['images/cat.jpg', 'images/traffic.jpg'])
    cy.get('.uppy-StatusBar-actionBtn--upload').click()

    cy.wait('@assemblies')

    cy.get('button[data-cy=togglePauseResume]').click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(300) // Wait an arbitrary amount of time as a user would do.
    cy.get('button[data-cy=togglePauseResume]').click()

    cy.wait('@assemblies')
    cy.wait('@resumable')

    cy.get('.uppy-StatusBar-statusPrimary').should('contain', 'Complete')
  })
})
