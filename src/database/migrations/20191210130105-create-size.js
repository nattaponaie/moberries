
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        field: 'product_id',
      },
      priceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'prices',
          key: 'id',
        },
        field: 'price_id',
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
    return queryInterface.dropTable('sizes');
  },
};
