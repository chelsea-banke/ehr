const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vitals', {
    temperature: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    pulseRate: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      field: 'pulse_rate'
    },
    respiratoryRate: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      field: 'respiratory_rate'
    },
    bloodPressure: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      field: 'blood_pressure'
    },
    weight: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    height: {
      type: DataTypes.STRING(1000),
      allowNull: true
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
    sequelize,
    tableName: 'vitals',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "patient_username" },
        ]
      },
      {
        name: "fk_vitals_patient1_idx",
        using: "BTREE",
        fields: [
          { name: "patient_username" },
        ]
      },
    ]
  });
};
