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
 * computes an estimation of infected people after a given period of time(in days)
 * @param {number} currentlyInfected
 * @param {number} time
 * @returns {number}
 */
const getInfectionsByTime = (currentlyInfected, time) => {
  const numberOfSets = Math.trunc(time / 3);
  return currentlyInfected * 2 ** numberOfSets;
};

/**
 * computes the percentage of a figure at a givem quotient
 * @param {number} figure
 * @param {number} quotient
 * @returns {number}
 */
const getPercentage = (figure, quotient) => figure * quotient;

/**
 * computes projected estimation of severe postive cases
 * @param {number} infections
 * @returns {number}
 */
const getProjectedSeverePositiveCases = (infections) => Math.trunc(getPercentage(infections, 0.15));

/**
 * returns available hospital beds by requested time
 * @param {number} capacity
 * @param {number} cases
 * @returns {number}
 */
const getAvailableHospitalBedsByRequestedTime = (capacity, cases) => {
  const availableBeds = Math.trunc(getPercentage(capacity, 0.35));
  return availableBeds - cases;
};

/**
 * computes projected estimation of cases that require ICU facilities
 * @param {number} infections
 * @returns {number}
 */
const getCasesForICUByRequestedTime = (infections) => Math.trunc(getPercentage(infections, 0.05));

/**
 * computes projected estimation of cases that require ventilators
 * @param {number} infections
 * @returns {number}
 */
const getCasesVentilatorsByTime = (infections) => Math.trunc(getPercentage(infections, 0.02));

const getEconomicImpact = (
  infections,
  incomePopulation,
  dailyIncome,
  duration
) => {
  const result = infections * incomePopulation * dailyIncome;
  return Math.trunc(result / duration);
};

export {
  getCurrentlyInfected,
  getInfectionsByTime,
  getDays,
  getProjectedSeverePositiveCases,
  getAvailableHospitalBedsByRequestedTime,
  getCasesForICUByRequestedTime,
  getCasesVentilatorsByTime,
  getEconomicImpact
};
