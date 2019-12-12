module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('orders', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
      field: 'customer_id',
    },
    orderStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order_statuses',
        key: 'id',
      },
      field: 'order_status_id',
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'payments',
        key: 'id',
      },
      field: 'payment_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
  }, {});
  order.associate = ((models) => {
  // associations can be defined here
    order.belongsTo(models.customers, { foreignKey: 'customer_id' } );
  });
  return order;
};
