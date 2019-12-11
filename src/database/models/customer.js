
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customers', {
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persons',
        key: 'id',
      },
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
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};
