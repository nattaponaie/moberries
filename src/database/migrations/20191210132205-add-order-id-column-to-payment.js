module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('payments', 'order_id', {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'orders',
      key: 'id',
    },
    field: 'order_id',
  }),
  down: queryInterface => queryInterface.removeColumn('payments', 'order_id'),
};
