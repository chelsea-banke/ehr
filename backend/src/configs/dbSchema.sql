-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ehr-db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ehr-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ehr-db` ;
USE `ehr-db` ;

-- -----------------------------------------------------
-- Table `ehr-db`.`center`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`center` (
  `center_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`center_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ehr-db`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`admin` (
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `center_center_id` INT NOT NULL,
  PRIMARY KEY (`username`, `center_center_id`),
  INDEX `fk_admin_center_idx` (`center_center_id` ASC) VISIBLE,
  CONSTRAINT `fk_admin_center`
    FOREIGN KEY (`center_center_id`)
    REFERENCES `ehr-db`.`center` (`center_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ehr-db`.`doctor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`doctor` (
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `center_center_id` INT NOT NULL,
  PRIMARY KEY (`username`, `center_center_id`),
  INDEX `fk_doctor_center1_idx` (`center_center_id` ASC) VISIBLE,
  CONSTRAINT `fk_doctor_center1`
    FOREIGN KEY (`center_center_id`)
    REFERENCES `ehr-db`.`center` (`center_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ehr-db`.`nurse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`nurse` (
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `center_center_id` INT NOT NULL,
  PRIMARY KEY (`username`, `center_center_id`),
  INDEX `fk_nurse_center1_idx` (`center_center_id` ASC) VISIBLE,
  CONSTRAINT `fk_nurse_center1`
    FOREIGN KEY (`center_center_id`)
    REFERENCES `ehr-db`.`center` (`center_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ehr-db`.`labtech`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`labtech` (
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `center_center_id` INT NOT NULL,
  PRIMARY KEY (`username`, `center_center_id`),
  INDEX `fk_labtech_center1_idx` (`center_center_id` ASC) VISIBLE,
  CONSTRAINT `fk_labtech_center1`
    FOREIGN KEY (`center_center_id`)
    REFERENCES `ehr-db`.`center` (`center_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ehr-db`.`patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`patient` (
  `username` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `dob` DATETIME NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ehr-db`.`report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`report` (
  `report_id` INT NOT NULL,
  `disagnosis` VARCHAR(45) NULL,
  `prescriptions` VARCHAR(45) NULL,
  `doctor_username` VARCHAR(45) NOT NULL,
  `doctor_center_center_id` INT NOT NULL,
  `patient_username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`report_id`, `patient_username`),
  INDEX `fk_report_doctor1_idx` (`doctor_username` ASC, `doctor_center_center_id` ASC) VISIBLE,
  INDEX `fk_report_patient1_idx` (`patient_username` ASC) VISIBLE,
  CONSTRAINT `fk_report_doctor1`
    FOREIGN KEY (`doctor_username` , `doctor_center_center_id`)
    REFERENCES `ehr-db`.`doctor` (`username` , `center_center_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_report_patient1`
    FOREIGN KEY (`patient_username`)
    REFERENCES `ehr-db`.`patient` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ehr-db`.`test`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`test` (
  `test_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `results` VARCHAR(45) NULL,
  `doctor_username` VARCHAR(45) NOT NULL,
  `doctor_center_center_id` INT NOT NULL,
  `labtech_username` VARCHAR(45) NOT NULL,
  `labtech_center_center_id` INT NOT NULL,
  `patient_username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`test_id`, `patient_username`),
  INDEX `fk_test_doctor1_idx` (`doctor_username` ASC, `doctor_center_center_id` ASC) VISIBLE,
  INDEX `fk_test_labtech1_idx` (`labtech_username` ASC, `labtech_center_center_id` ASC) VISIBLE,
  INDEX `fk_test_patient1_idx` (`patient_username` ASC) VISIBLE,
  CONSTRAINT `fk_test_doctor1`
    FOREIGN KEY (`doctor_username` , `doctor_center_center_id`)
    REFERENCES `ehr-db`.`doctor` (`username` , `center_center_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_test_labtech1`
    FOREIGN KEY (`labtech_username` , `labtech_center_center_id`)
    REFERENCES `ehr-db`.`labtech` (`username` , `center_center_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_test_patient1`
    FOREIGN KEY (`patient_username`)
    REFERENCES `ehr-db`.`patient` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ehr-db`.`vitals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`vitals` (
  `temperature` INT NOT NULL,
  `pulse_rate` INT NULL,
  `respiratory_rate` INT NULL,
  `blood_pressure` INT NULL,
  `weight` INT NULL,
  `height` VARCHAR(45) NULL,
  `nurse_username` VARCHAR(45) NOT NULL,
  `nurse_center_center_id` INT NOT NULL,
  `patient_username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`temperature`, `patient_username`),
  INDEX `fk_vitals_nurse1_idx` (`nurse_username` ASC, `nurse_center_center_id` ASC) VISIBLE,
  INDEX `fk_vitals_patient1_idx` (`patient_username` ASC) VISIBLE,
  CONSTRAINT `fk_vitals_nurse1`
    FOREIGN KEY (`nurse_username` , `nurse_center_center_id`)
    REFERENCES `ehr-db`.`nurse` (`username` , `center_center_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vitals_patient1`
    FOREIGN KEY (`patient_username`)
    REFERENCES `ehr-db`.`patient` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ehr-db`.`center_has_patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ehr-db`.`center_has_patient` (
  `center_center_id` INT NOT NULL,
  `patient_username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`center_center_id`, `patient_username`),
  INDEX `fk_center_has_patient_patient1_idx` (`patient_username` ASC) VISIBLE,
  INDEX `fk_center_has_patient_center1_idx` (`center_center_id` ASC) VISIBLE,
  CONSTRAINT `fk_center_has_patient_center1`
    FOREIGN KEY (`center_center_id`)
    REFERENCES `ehr-db`.`center` (`center_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_center_has_patient_patient1`
    FOREIGN KEY (`patient_username`)
    REFERENCES `ehr-db`.`patient` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;