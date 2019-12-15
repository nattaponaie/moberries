
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('orders', 'person_id', {
    type: Sequelize.INTEGER,
    references: {
      model: 'persons',
      key: 'id',
    },
    field: 'person_id',
  }),
  down: queryInterface => queryInterface.removeColumn('orders', 'person_id'),
};
