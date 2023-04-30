const URLHost = 'http://localhost:3000';

describe('service is available', function () {

  it('should be available on localhost:3000', function () {
    cy.visit(URLHost);
  })

});
