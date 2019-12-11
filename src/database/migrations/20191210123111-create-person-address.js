
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('person_addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      streetAddress: {
        type: Sequelize.STRING,
        field: 'street_address',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('person_addresses');
  },
};
