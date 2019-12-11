
module.exports = (sequelize, DataTypes) => {
  const PersonAddress = sequelize.define('person_addresses', {
    streetAddress: {
      type: DataTypes.STRING,
      field: 'street_address',
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
  PersonAddress.associate = function(models) {
    // associations can be defined here
  };
  return PersonAddress;
};
