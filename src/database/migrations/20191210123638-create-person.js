
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('persons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
      },
      addressId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'person_addresses',
          key: 'id',
        },
        field: 'address_id',
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
  down: queryInterface => {
    return queryInterface.dropTable('persons');
  },
};
