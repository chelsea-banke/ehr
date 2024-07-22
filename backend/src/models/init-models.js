var DataTypes = require("sequelize").DataTypes;
var adminModel = require("./admin");
var centerModel = require("./center");
var centerHasPatientModel = require("./centerHasPatient");
var doctorModel = require("./doctor");
var labtechModel = require("./labtech");
var nurseModel = require("./nurse");
var patientModel = require("./patient");
var reportModel = require("./report");
var testModel = require("./test");
var vitalsModel = require("./vitals");

function initModels(sequelize) {
  var admin = adminModel(sequelize, DataTypes);
  var center = centerModel(sequelize, DataTypes);
  var centerHasPatient = centerHasPatientModel(sequelize, DataTypes);
  var doctor = doctorModel(sequelize, DataTypes);
  var labtech = labtechModel(sequelize, DataTypes);
  var nurse = nurseModel(sequelize, DataTypes);
  var patient = patientModel(sequelize, DataTypes);
  var report = reportModel(sequelize, DataTypes);
  var test = testModel(sequelize, DataTypes);
  var vitals = vitalsModel(sequelize, DataTypes);

  center.belongsToMany(patient, { as: 'patientUsernamePatients', through: centerHasPatient, foreignKey: "centerCenterId", otherKey: "patientUsername" });
  patient.belongsToMany(center, { as: 'centerCenterIdCenters', through: centerHasPatient, foreignKey: "patientUsername", otherKey: "centerCenterId" });
  admin.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  center.hasMany(admin, { as: "admins", foreignKey: "centerCenterId"});
  centerHasPatient.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  center.hasMany(centerHasPatient, { as: "centerHasPatients", foreignKey: "centerCenterId"});
  doctor.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  center.hasMany(doctor, { as: "doctors", foreignKey: "centerCenterId"});
  labtech.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  center.hasMany(labtech, { as: "labteches", foreignKey: "centerCenterId"});
  nurse.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  center.hasMany(nurse, { as: "nurses", foreignKey: "centerCenterId"});
  report.belongsTo(doctor, { as: "doctorUsernameDoctor", foreignKey: "doctorUsername"});
  doctor.hasMany(report, { as: "reports", foreignKey: "doctorUsername"});
  report.belongsTo(doctor, { as: "doctorCenterCenter", foreignKey: "doctorCenterCenterId"});
  doctor.hasMany(report, { as: "doctorCenterCenterReports", foreignKey: "doctorCenterCenterId"});
  test.belongsTo(doctor, { as: "doctorUsernameDoctor", foreignKey: "doctorUsername"});
  doctor.hasMany(test, { as: "tests", foreignKey: "doctorUsername"});
  test.belongsTo(doctor, { as: "doctorCenterCenter", foreignKey: "doctorCenterCenterId"});
  doctor.hasMany(test, { as: "doctorCenterCenterTests", foreignKey: "doctorCenterCenterId"});
  test.belongsTo(labtech, { as: "labtechUsernameLabtech", foreignKey: "labtechUsername"});
  labtech.hasMany(test, { as: "tests", foreignKey: "labtechUsername"});
  test.belongsTo(labtech, { as: "labtechCenterCenter", foreignKey: "labtechCenterCenterId"});
  labtech.hasMany(test, { as: "labtechCenterCenterTests", foreignKey: "labtechCenterCenterId"});
  // vitals.belongsTo(nurse, { as: "nurseUsernameNurse", foreignKey: "nurseUsername"});
  // nurse.hasMany(vitals, { as: "vitals", foreignKey: "nurseUsername"});
  // vitals.belongsTo(nurse, { as: "nurseCenterCenter", foreignKey: "nurseCenterCenterId"});
  // nurse.hasMany(vitals, { as: "nurseCenterCenterVitals", foreignKey: "nurseCenterCenterId"});
  centerHasPatient.belongsTo(patient, { as: "patientUsernamePatient", foreignKey: "patientUsername"});
  patient.hasMany(centerHasPatient, { as: "centerHasPatients", foreignKey: "patientUsername"});
  report.belongsTo(patient, { as: "patientUsernamePatient", foreignKey: "patientUsername"});
  patient.hasMany(report, { as: "reports", foreignKey: "patientUsername"});
  test.belongsTo(patient, { as: "patientUsernamePatient", foreignKey: "patientUsername"});
  patient.hasMany(test, { as: "tests", foreignKey: "patientUsername"});
  vitals.belongsTo(patient, { as: "patientUsernamePatient", foreignKey: "patientUsername"});
  patient.hasMany(vitals, { as: "vitals", foreignKey: "patientUsername"});

  return {
    admin,
    center,
    centerHasPatient,
    doctor,
    labtech,
    nurse,
    patient,
    report,
    test,
    vitals,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
