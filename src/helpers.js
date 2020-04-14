import fs from 'fs';

/**
 *
 * @param {string} duration
 * @param {number} figure
 * @returns {number}
 * @description normalize duration input into days
 */
const getDays = (duration, figure) => {
  switch (duration) {
    case 'weeks':
      return figure * 7;
    case 'months':
      return figure * 30;
    default:
      return figure;
  }
};

/**
 *
 * @param {number} reportedCases
 * @param {boolean} isSevere
 * @returns {number}
 * @description computes an estimate of currently infected people
 */
const getCurrentlyInfected = (reportedCases, isSevere = false) => {
  const estimated = isSevere ? 50 : 10;
  return reportedCases * estimated;
};

/**
 *
 * @param {number} currentlyInfected
 * @param {number} time
 * @returns {number}
 * @description computes an estimate of infected people after a given period of time(in days)
 */
const getInfectionsByTime = (currentlyInfected, time) => {
  const numberOfSets = Math.trunc(time / 3);
  return currentlyInfected * 2 ** numberOfSets;
};

/**
 *
 * @param {number} figure
 * @param {number} quotient
 * @returns {number}
 * @description computes the percentage of a figure at a given quotient
 */
const getPercentage = (figure, quotient) => figure * quotient;

/**
 *
 * @param {number} infections
 * @returns {number}
 * @description computes an estimate of severe postive cases
 */
const getProjectedSeverePositiveCases = (infections) => Math.trunc(getPercentage(infections, 0.15));

/**
 *
 * @param {number} capacity
 * @param {number} cases
 * @returns {number}
 * @description computes an estimate of available hospital beds at a requested time
 */
const getAvailableHospitalBedsByRequestedTime = (capacity, cases) => {
  const availableBeds = getPercentage(capacity, 0.35);
  return Math.trunc(availableBeds - cases);
};

/**
 *
 * @param {number} infections
 * @returns {number}
 * @description computes an estimate of severe postive cases that require ICU care
 */
const getCasesForICUByRequestedTime = (infections) => Math.trunc(getPercentage(infections, 0.05));

/**
 *
 * @param {number} infections
 * @returns {number}
 * @description computes an estimate of severe positive cases that require ventilators
 */
const getCasesVentilatorsByTime = (infections) => Math.trunc(getPercentage(infections, 0.02));

/**
 *
 * @param {number} infections
 * @param {number} workingPopulation
 * @param {number} dailyIncome
 * @param {number} duration
 * @returns {number}
 * @description computes an estimate of daily financial loses to the economy
 */
const getEconomicImpact = (
  infections,
  workingPopulation,
  dailyIncome,
  duration
) => {
  const result = (infections * workingPopulation * dailyIncome) / duration;
  return Math.trunc(result);
};

/**
 *
 * @param {number} startTime
 * @returns {number}
 * @description compute time(in milliseconds) taken to serve a request
 */
const getTime = (startTime) => {
  const NS_PER_SEC = 1e9; // time in nano seconds
  const NS_TO_MS = 1e6; // time in milli seconds
  const timeDifference = process.hrtime(startTime);
  return (timeDifference[0] * NS_PER_SEC + timeDifference[1]) / NS_TO_MS;
};

/**
 *
 * @param {string} data
 * @param {object} fileName
 * @description save log data to file
 */
const save = (data, fileName) => {
  fs.appendFile(fileName, `${data}\n`, (err) => {
    if (err) {
      throw new Error('The data could not be saved');
    }
  });
};

export {
  getCurrentlyInfected,
  getInfectionsByTime,
  getDays,
  getProjectedSeverePositiveCases,
  getAvailableHospitalBedsByRequestedTime,
  getCasesForICUByRequestedTime,
  getCasesVentilatorsByTime,
  getEconomicImpact,
  getTime,
  save
};
