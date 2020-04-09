/**
 * normalize duration input into days
 * @param {string} duration
 * @param {number} days
 * @returns {number}
 */
const getDays = (duration, days) => {
  if (duration === 'weeks') {
    return days * 7;
  } else if (duration === 'months') {
    return days * 30;
  } else {
    return days;
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
  const numberOfSets = Number(time / 3);
  return currentlyInfected * numberOfSets ** 2;
};

export { getCurrentlyInfected, getInfectionsByTime, getDays };
