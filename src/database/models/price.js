
module.exports = (sequelize, DataTypes) => {
  const price = sequelize.define('prices', {
    price: DataTypes.DECIMAL(10, 2),
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sizes',
        key: 'id',
      },
      field: 'size_id',
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
  price.associate = function(models) {
    // associations can be defined here
  };
  return price;
};
