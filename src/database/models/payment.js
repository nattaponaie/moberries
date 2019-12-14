
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payments', {
    type: DataTypes.INTEGER,
    total: DataTypes.DECIMAL(10, 2),
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id',
      },
      field: 'order_id',
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
  payment.associate = () => {
    // associations can be defined here
  };
  return payment;
};
