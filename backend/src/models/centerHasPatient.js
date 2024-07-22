const connection = require("../utils/connection")
const { DataTypes } = require("sequelize")

module.exports = (sequelize, DataType) =>{
  return sequelize.define('centerHasPatient', {
    centerCenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'center',
        key: 'center_id'
      },
      field: 'center_center_id'
    },
    patientUsername: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'patient',
        key: 'username'
      },
      field: 'patient_username'
    }
  }, {
    tableName: 'center_has_patient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "center_center_id" },
          { name: "patient_username" },
        ]
      },
      {
        name: "fk_center_has_patient_patient1_idx",
        using: "BTREE",
        fields: [
          { name: "patient_username" },
        ]
      },
      {
        name: "fk_center_has_patient_center1_idx",
        using: "BTREE",
        fields: [
          { name: "center_center_id" },
        ]
      },
    ]
  });
}

// models.center.belongsToMany(models.patient)
// models.patient.belongsToMany(models.center)