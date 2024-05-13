const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('patient', {
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'last_name'
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'patient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
