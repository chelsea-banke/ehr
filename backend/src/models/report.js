const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report', {
    reportId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autiIncrement: true,
      field: 'report_id'
    },
    diagnosis: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    prescriptions: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "date_created"
    },
    doctorUsername: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'doctor',
        key: 'username'
      },
      field: 'doctor_username'
    },
    doctorCenterCenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctor',
        key: 'center_center_id'
      },
      field: 'doctor_center_center_id'
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
    tableName: 'report',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "report_id" },
          { name: "patient_username" },
        ]
      },
      {
        name: "fk_report_doctor1_idx",
        using: "BTREE",
        fields: [
          { name: "doctor_username" },
          { name: "doctor_center_center_id" },
        ]
      },
      {
        name: "fk_report_patient1_idx",
        using: "BTREE",
        fields: [
          { name: "patient_username" },
        ]
      },
    ]
  });
};
