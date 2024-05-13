var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _center = require("./center");
var _centerHasPatient = require("./centerHasPatient");
var _doctor = require("./doctor");
var _labtech = require("./labtech");
var _nurse = require("./nurse");
var _patient = require("./patient");
var _report = require("./report");
var _test = require("./test");
var _vitals = require("./vitals");

function initModels(sequelize) {
  var admin = new _admin(sequelize, DataTypes);
  var center = new _center(sequelize, DataTypes);
  var centerHasPatient = new _centerHasPatient(sequelize, DataTypes);
  var doctor = new _doctor(sequelize, DataTypes);
  var labtech = new _labtech(sequelize, DataTypes);
  var nurse = new _nurse(sequelize, DataTypes);
  var patient = new _patient(sequelize, DataTypes);
  var report = new _report(sequelize, DataTypes);
  var test = new _test(sequelize, DataTypes);
  var vitals = new _vitals(sequelize, DataTypes);

  // center.belongsToMany(patient, { as: 'patientUsernamePatients', through: centerHasPatient, foreignKey: "centerCenterId", otherKey: "patientUsername" });
  // patient.belongsToMany(center, { as: 'centerCenterIdCenters', through: centerHasPatient, foreignKey: "patientUsername", otherKey: "centerCenterId" });
  // admin.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  // center.hasMany(admin, { as: "admins", foreignKey: "centerCenterId"});
  // centerHasPatient.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  // center.hasMany(centerHasPatient, { as: "centerHasPatients", foreignKey: "centerCenterId"});
  // doctor.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  // center.hasMany(doctor, { as: "doctors", foreignKey: "centerCenterId"});
  // labtech.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  // center.hasMany(labtech, { as: "labteches", foreignKey: "centerCenterId"});
  // nurse.belongsTo(center, { as: "centerCenter", foreignKey: "centerCenterId"});
  // center.hasMany(nurse, { as: "nurses", foreignKey: "centerCenterId"});
  // report.belongsTo(doctor, { as: "doctorUsernameDoctor", foreignKey: "doctorUsername"});
  // doctor.hasMany(report, { as: "reports", foreignKey: "doctorUsername"});
  // report.belongsTo(doctor, { as: "doctorCenterCenter", foreignKey: "doctorCenterCenterId"});
  // doctor.hasMany(report, { as: "doctorCenterCenterReports", foreignKey: "doctorCenterCenterId"});
  // test.belongsTo(doctor, { as: "doctorUsernameDoctor", foreignKey: "doctorUsername"});
  // doctor.hasMany(test, { as: "tests", foreignKey: "doctorUsername"});
  // test.belongsTo(doctor, { as: "doctorCenterCenter", foreignKey: "doctorCenterCenterId"});
  // doctor.hasMany(test, { as: "doctorCenterCenterTests", foreignKey: "doctorCenterCenterId"});
  // test.belongsTo(labtech, { as: "labtechUsernameLabtech", foreignKey: "labtechUsername"});
  // labtech.hasMany(test, { as: "tests", foreignKey: "labtechUsername"});
  // test.belongsTo(labtech, { as: "labtechCenterCenter", foreignKey: "labtechCenterCenterId"});
  // labtech.hasMany(test, { as: "labtechCenterCenterTests", foreignKey: "labtechCenterCenterId"});
  // vitals.belongsTo(nurse, { as: "nurseUsernameNurse", foreignKey: "nurseUsername"});
  // nurse.hasMany(vitals, { as: "vitals", foreignKey: "nurseUsername"});
  // vitals.belongsTo(nurse, { as: "nurseCenterCenter", foreignKey: "nurseCenterCenterId"});
  // nurse.hasMany(vitals, { as: "nurseCenterCenterVitals", foreignKey: "nurseCenterCenterId"});
  // centerHasPatient.belongsTo(patient, { as: "patientUsernamePatient", foreignKey: "patientUsername"});
  // patient.hasMany(centerHasPatient, { as: "centerHasPatients", foreignKey: "patientUsername"});
  // report.belongsTo(patient, { as: "patientUsernamePatient", foreignKey: "patientUsername"});
  // patient.hasMany(report, { as: "reports", foreignKey: "patientUsername"});
  // test.belongsTo(patient, { as: "patientUsernamePatient", foreignKey: "patientUsername"});
  // patient.hasMany(test, { as: "tests", foreignKey: "patientUsername"});
  // vitals.belongsTo(patient, { as: "patientUsernamePatient", foreignKey: "patientUsername"});
  // patient.hasMany(vitals, { as: "vitals", foreignKey: "patientUsername"});

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
