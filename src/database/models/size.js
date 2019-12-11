
module.exports = (sequelize, DataTypes) => {
  const size = sequelize.define('sizes', {
    size: DataTypes.INTEGER,
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
      field: 'product_id',
    },
    priceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'prices',
        key: 'id',
      },
      field: 'price_id',
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
  size.associate = function(models) {
    // associations can be defined here
  };
  return size;
};
