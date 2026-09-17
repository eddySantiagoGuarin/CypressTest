describe('Gestor de Tareas E2E', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Debe mostrar el título principal correctamente', () => {
        cy.get('[data-cy="main-title"]')
            .should('be.visible')
            .and('contain.text', 'Gestor de Tareas');
    });

    it('Debe listar las tareas iniciales', () => {
        cy.get('[data-cy="task-item"]').should('have.length', 2);
    });

    it('Debe agregar una nueva tarea', () => {
        const newTitle = 'Nueva tarea de prueba E2E';

        cy.get('[data-cy="task-input"]').type(newTitle);
        cy.get('[data-cy="add-task-btn"]').click();

        cy.get('[data-cy="task-item"]').should('have.length', 3);
        cy.get('[data-cy="task-list"]').should('contain.text', newTitle);
    });

    it('Debe marcar una tarea como completada', () => {
        cy.get('[data-cy="task-item"]').first().as('firstTask');

        cy.get('@firstTask').find('[data-cy="task-title"]').click();
        cy.get('@firstTask').should('have.class', 'completed');
    });

    it('Debe eliminar una tarea y mostrar el mensaje de lista vacía si se borran todas', () => {
        cy.get('[data-cy="delete-task-btn"]').first().click();
        cy.get('[data-cy="delete-task-btn"]').first().click();

        cy.get('[data-cy="task-item"]').should('have.length', 0);
        cy.get('[data-cy="empty-msg"]').should('be.visible').and('contain.text', 'No hay tareas pendientes.');
    });
});