describe('Test', () => {
    it('Ana sayfada karanlık mod butonu çalışıyor mu?', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-cy=dark-mode]').click();
    })

    it('Sipariş sayfasında karanlık mod butonu çalışıyor mu?', () => {
        cy.visit('http://localhost:3000/pizza');
        cy.get('[data-cy=dark-mode]').click();
    })

    it('Pizza sayısı azaltma butonu çalışıyor mu?', () => {
        cy.visit('http://localhost:3000/pizza');
        cy.get('[data-cy=decrease-button]').click();
    })

    it('Pizza sayısı arttırma butonu çalışıyor mu?', () => {
        cy.visit('http://localhost:3000/pizza');
        cy.get('[data-cy=increase-button]').click();
    })
})
