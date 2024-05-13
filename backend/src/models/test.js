const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test', {
    testId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'test_id'
    },
    testName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'test_name'
    },
    results: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    attachment: {
      type: DataTypes.BLOB,
      allowNull: true
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
    labtechUsername: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'labtech',
        key: 'username'
      },
      field: 'labtech_username'
    },
    labtechCenterCenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'labtech',
        key: 'center_center_id'
      },
      field: 'labtech_center_center_id'
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
    },
    reportReportId: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'report',
        key: 'report_id'
      },
      field: 'report_report_id'
    }
  }, {
    sequelize,
    tableName: 'test',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "test_id" },
          { name: "patient_username" },
        ]
      },
      {
        name: "fk_test_doctor1_idx",
        using: "BTREE",
        fields: [
          { name: "doctor_username" },
          { name: "doctor_center_center_id" },
        ]
      },
      {
        name: "fk_test_labtech1_idx",
        using: "BTREE",
        fields: [
          { name: "labtech_username" },
          { name: "labtech_center_center_id" },
        ]
      },
      {
        name: "fk_test_patient1_idx",
        using: "BTREE",
        fields: [
          { name: "patient_username" },
        ]
      },
    ]
  });
};
