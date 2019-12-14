
module.exports = (sequelize, DataTypes) => {
  const orderStatus = sequelize.define('order_statuses', {
    status: DataTypes.INTEGER,
    description: DataTypes.STRING,
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
  orderStatus.associate = () => {
    // associations can be defined here
  };
  return orderStatus;
};
