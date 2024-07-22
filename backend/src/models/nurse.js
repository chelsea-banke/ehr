const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nurse', {
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
    role: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'status'
    },
    centerCenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'center',
        key: 'center_id'
      },
      field: 'center_center_id'
    }
  }, {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
    sequelize,
    tableName: 'nurse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
          { name: "center_center_id" },
        ]
      },
      {
        name: "fk_nurse_center1_idx",
        using: "BTREE",
        fields: [
          { name: "center_center_id" },
        ]
      },
    ]
  });
};
