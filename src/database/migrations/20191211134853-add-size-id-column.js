

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('prices', 'size_id', {
    type: Sequelize.INTEGER,
    references: {
      model: 'sizes',
      key: 'id',
    },
  }),
  down: queryInterface => queryInterface.removeColumn('prices', 'size_id'),
};
