module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('payments', 'order_id', {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id',
    },
  }),
  down: queryInterface => queryInterface.removeColumn('payments', 'order_id'),
};
