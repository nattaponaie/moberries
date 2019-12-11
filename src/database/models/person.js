
module.exports = (sequelize, DataTypes) => {
  const person = sequelize.define('persons', {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
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
