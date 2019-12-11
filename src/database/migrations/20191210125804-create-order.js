
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'id',
        },
        field: 'customer_id',
      },
      orderStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'order_statuses',
          key: 'id',
        },
        field: 'order_status_id',
      },
      paymentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'payments',
          key: 'id',
        },
        field: 'payment_id',
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
    return queryInterface.dropTable('orders');
  },
};
