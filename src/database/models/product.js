
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
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
  product.associate = ((models) => {
  // associations can be defined here
  });
  return product;
};

