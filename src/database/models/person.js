
module.exports = (sequelize, DataTypes) => {
  const person = sequelize.define('persons', {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    addressId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'person_addresses',
        key: 'id',
      },
      field: 'address_id',
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
  person.associate = function(models) {
    // associations can be defined here
  };
  return person;
};
