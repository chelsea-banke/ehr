const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vitals', {
    temperature: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pulseRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'pulse_rate'
    },
    respiratoryRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'respiratory_rate'
    },
    bloodPressure: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'blood_pressure'
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    height: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nurseUsername: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'nurse',
        key: 'username'
      },
      field: 'nurse_username'
    },
    nurseCenterCenterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nurse',
        key: 'center_center_id'
      },
      field: 'nurse_center_center_id'
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
          { name: "temperature" },
          { name: "patient_username" },
        ]
      },
      {
        name: "fk_vitals_nurse1_idx",
        using: "BTREE",
        fields: [
          { name: "nurse_username" },
          { name: "nurse_center_center_id" },
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
