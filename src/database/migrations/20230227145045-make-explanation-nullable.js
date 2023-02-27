'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataType } = require('sequelize-typescript')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('cards', 'explanation', {
            type: DataType.STRING,
            allowNull: true,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('cards', 'explanation', {
            type: DataType.STRING,
            allowNull: false,
        })
    },
}
