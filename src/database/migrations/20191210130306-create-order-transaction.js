
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders',
          key: 'id',
        },
        field: 'order_id',
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        field: 'product_id',
      },
      sizeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sizes',
          key: 'id',
        },
        field: 'size_id',
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
    return queryInterface.dropTable('order_transactions');
  },
};
