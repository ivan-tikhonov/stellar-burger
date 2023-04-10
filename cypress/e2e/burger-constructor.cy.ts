import { URL } from '../../src/utils/api'

import { testUrl, dropTargetSelector, endPoints, bun1, bun2, main, sauce } from '../../src/utils/testConsts'


describe('запускаем приложение', function () {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.intercept('GET', `${URL}${endPoints.ingredients}`,
      { statusCode: 200, body: { success: true, data: [bun1, bun2, main, sauce] } });
    cy.intercept('POST', `${URL}${endPoints.login}`, { delay: 1000, fixture: "user.json" }).as('login');
    cy.intercept('POST', `${URL}${endPoints.orders}`, { delay: 1000, fixture: "order.json" }).as('order');
    cy.intercept('POST', `${URL}${endPoints.logout}`, { delay: 1000, fixture: "logout.json" }).as('logout');
  })

  it('аутентификация пользователя и заказ бургера', function () {
    cy.get('p').should('exist').and('contain', 'Соберите бургер');

    // проверка логина
    cy.get('[data-testid=profile]').should('exist').click();

    cy.get('span').should('exist').and('contain', 'Вход');
    cy.get('[type="email"]').should('exist');
    cy.get('[type="password"]').should('exist');
    cy.get('[type="submit"]').should('exist').and('contain', 'Войти');


    cy.get('.input__icon').first().click();
    cy.get('[type="email"]').type('test@mail.com').should('have.value', 'test@mail.com');
    cy.get('[type="password"]').type('TestPassword').should('have.value', 'TestPassword');
    cy.get('[type="submit"]').contains('Войти').click();

    cy.wait('@login').setCookie('accessToken', 'Bearer 123456789').setCookie('refreshToken', '987654321');

    // проверки ингредиентов
    cy.get('[data-testid=constructor]').should('exist').click();
    cy.get(`#${bun1._id}`).should('exist');
    cy.get(`#${bun2._id}`).should('exist');
    cy.get(`#${sauce._id}`).should('exist');
    cy.get(`#${main._id}`).should('exist');

    //формирование бургера
    cy.get(`#${bun1._id}`).trigger('dragstart');
    cy.get(dropTargetSelector).trigger('drop');

    cy.get(`#${bun2._id}`).trigger('dragstart');
    cy.get(dropTargetSelector).trigger('drop');

    cy.get(`#${sauce._id}`).trigger('dragstart');
    cy.get(dropTargetSelector).trigger('drop');

    cy.get(`#${main._id}`).scrollIntoView().should('be.visible')
    cy.get(`#${main._id}`).trigger('dragstart');
    cy.get(dropTargetSelector).trigger('drop');

    //оформление заказа
    cy.get(`[data-testid=buttonMakeOrder]`).should('exist').and('contain', 'Оформить заказ').click();
    cy.get(`[data-testid=buttonMakeOrder2]`).should('exist').and('contain', 'Оформить заказ').click();
    cy.wait('@order').get(`[data-testid=orderId]`).should('exist').and('contain', '123452');

    //возврат на главную страницу
    cy.get('body').type('{esc}')
    cy.get('p').should('exist').and('contain', 'Соберите бургер');

    //переход на страницу профиля
    cy.get('[data-testid=profile]').should('exist').click();

    //logout
    cy.get('[data-testid=logout]').should('exist').click();

    //возврат на стреницу логина
    cy.wait('@logout').get('span').should('exist').and('contain', 'Вход');
  })

});

export { }
