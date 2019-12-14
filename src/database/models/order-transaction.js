
module.exports = (sequelize, DataTypes) => {
  const orderTransaction = sequelize.define('order_transactions', {
    quantity: DataTypes.INTEGER,
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id',
      },
      field: 'order_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      field: 'product_id',
    },
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'size_id',
    },
    paymentId: {
      type: DataTypes.INTEGER,
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
  orderTransaction.associate = function(models) {
    // associations can be defined here
    orderTransaction.belongsTo(models.products, { foreignKey: 'product_id' } );
  };
  return orderTransaction;
};
