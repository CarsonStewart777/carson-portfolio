describe('My Portfolio Application E2E Tests', () => {
  it('should navigate to the home page and then to the about page', () => {
    // Visit the application's base URL
    cy.visit('http://localhost:3000'); // Assuming your React app runs on port 3000

    // Verify that the Home page content is visible
    cy.contains('h1', 'Hello, I\'m Carson').should('be.visible');

    // Click on the 'About' navigation link
    cy.get('button').contains('About').click();

    // Verify that the About page content is visible
    cy.contains('h1', 'About Me').should('be.visible');

    // Verify that the About page content is visible
    cy.contains('h1', 'About Me').should('be.visible');
  });
});
