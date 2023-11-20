describe('Buttons Functionality', () => {
  it('Should click buttons and perform actions', () => {
    cy.visit('https://formy-project.herokuapp.com/buttons');
    cy.contains('Primary').click();
    cy.get('.btn-primary').should('have.class', 'btn-primary');
  });

  it('Should perform drag and drop actions', () => {
    cy.visit('https://formy-project.herokuapp.com/dragdrop');
    const dataTransfer = new DataTransfer();
    cy.get('#image').trigger('dragstart', { dataTransfer });
    cy.get('#box').trigger('drop', { dataTransfer });
    cy.get('#box').should('contain', 'Drop here');
  });

  it('Should switch between windows', () => {
    cy.visit('https://formy-project.herokuapp.com/switch-window');
    cy.get('#new-tab-button').click();
  });

  it('Should select a date using the Datepicker', () => {
    cy.visit('https://formy-project.herokuapp.com/datepicker');
    cy.get('#datepicker').type('2023-11-20');
    cy.get('.datepicker-dropdown').should('be.visible');
    cy.get('#datepicker').should('have.value', '2023-11-20');
  });

  it('Should fill out and submit the complete web form', () => {
    cy.visit('https://formy-project.herokuapp.com/form');
    cy.fixture('data').then((data) => {
      cy.get('#first-name').type(data.firstName);
      cy.get('#last-name').type(data.lastName);
      cy.get('#job-title').type(data.jobTitle);
      cy.get('#radio-button-2').check();
      cy.get('#checkbox-1').check();
      cy.get('#select-menu').invoke('val', 'Option 2');
      cy.get('#datepicker').type('2023-11-20');
      cy.get('.btn-primary').click();
      cy.contains('The form was successfully submitted!').should('be.visible');
    });
  });

  it('Should verify the state of elements (enabled/disabled)', () => {
    cy.visit('https://formy-project.herokuapp.com/enabled');
    cy.get('#input').should('be.enabled');
    cy.get('#disabledInput').should('be.disabled');
  });

  it('Should select radio buttons and verify their state', () => {
    cy.visit('https://formy-project.herokuapp.com/radiobutton');
    cy.get('#radio-button-1').check();
    cy.get(':nth-child(6) > .form-check-input').check();
    cy.get(':nth-child(6) > .form-check-input').should('be.checked');
  });

  it('Should verify key and mouse press actions', () => {
    cy.visit('https://formy-project.herokuapp.com/keypress');
    cy.get('#name').type('Hello');
    cy.get('#button').trigger('mousedown');
    cy.get('#button').trigger('mouseup');
  });

  it('Should verify modal functionality', () => {
    cy.visit('https://formy-project.herokuapp.com/modal');
    cy.contains('Open modal').click();
    cy.get('.modal').should('be.visible');
    cy.contains('Close').click();
  });

  it('Should visit the "Switch Window" page, click "Open Alert" button, and verify the alert popup', () => {
    cy.visit('https://formy-project.herokuapp.com/switch-window');
    cy.contains('Open alert').click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('This is a test alert!');
    });
  });
});
