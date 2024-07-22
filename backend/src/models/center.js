const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes){
  return sequelize.define('center', {
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'center_id'
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'center',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "center_id" },
        ]
      },
    ]
  })
};
