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
      field: 'order_status_id',
    },
    paymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'payment_id',
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'person_id',
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
    order.belongsTo(models.order_statuses, { constraints: false });
    order.belongsTo(models.payments, { foreignKey: 'payment_id' } );
    order.belongsTo(models.persons, { foreignKey: 'person_id' } );
  });
  return order;
};
