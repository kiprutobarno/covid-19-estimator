import fs from 'fs';

/**
 * normalize duration input into days
 * @param {string} duration
 * @param {number} figure
 * @returns {number}
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
 * computes an estimate of currently infected people
 * @param {number} reportedCases
 * @param {boolean} isSevere
 * @returns {number}
 */
const getCurrentlyInfected = (reportedCases, isSevere = false) => {
  const estimated = isSevere ? 50 : 10;
  return reportedCases * estimated;
};

/**
 * computes an estimate of infected people after a given period of time(in days)
 * @param {number} currentlyInfected
 * @param {number} time
 * @returns {number}
 */
const getInfectionsByTime = (currentlyInfected, time) => {
  const numberOfSets = Math.trunc(time / 3);
  return currentlyInfected * 2 ** numberOfSets;
};

/**
 * computes the percentage of a figure at a given quotient
 * @param {number} figure
 * @param {number} quotient
 * @returns {number}
 */
const getPercentage = (figure, quotient) => figure * quotient;

/**
 * computes an estimate of severe postive cases
 * @param {number} infections
 * @returns {number}
 */
const getProjectedSeverePositiveCases = (infections) => Math.trunc(getPercentage(infections, 0.15));

/**
 * computes an estimate of available hospital beds at a requested time
 * @param {number} capacity
 * @param {number} cases
 * @returns {number}
 */
const getAvailableHospitalBedsByRequestedTime = (capacity, cases) => {
  const availableBeds = getPercentage(capacity, 0.35);
  return Math.trunc(availableBeds - cases);
};

/**
 * computes an estimate of severe postive cases that require ICU care
 * @param {number} infections
 * @returns {number}
 */
const getCasesForICUByRequestedTime = (infections) => Math.trunc(getPercentage(infections, 0.05));

/**
 * computes an estimate of severe positive cases that require ventilators
 * @param {number} infections
 * @returns {number}
 */
const getCasesVentilatorsByTime = (infections) => Math.trunc(getPercentage(infections, 0.02));

/**
 * computes an estimate of daily financial loses to the economy
 * @param {number} infections
 * @param {number} workingPopulation
 * @param {number} dailyIncome
 * @param {number} duration
 * @returns {number}
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

const getTimeInMilliseconds = (startTime) => {
  const NS_PER_SEC = 1e9; // time in nano seconds
  const NS_TO_MS = 1e6; // time in milli seconds
  const timeDifference = process.hrtime(startTime);
  return (timeDifference[0] * NS_PER_SEC + timeDifference[1]) / NS_TO_MS;
};

const saveToFile = (data, filename) => {
  fs.appendFile(filename, `${data}\n`, (err) => {
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
  getTimeInMilliseconds,
  saveToFile
};
