'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        // queryInterface.addConstraint('folders', ['parentId'], {
        //     type: 'foreign key',
        //     name: 'fk_folders_folders',
        //     references: {
        //         table: 'folders',
        //         field: 'id',
        //     },
        //     onDelete: 'cascade',
        //     onUpdate: 'cascade',
        // })
    },

    async down(queryInterface, Sequelize) {
        // return queryInterface.removeConstraint('folders', 'fk_folders_folders');
    },
}
