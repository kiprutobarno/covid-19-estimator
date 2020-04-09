import {
  getCurrentlyInfected,
  getInfectionsByTime,
  getDays,
  getProjectedSeverePositiveCases,
  getAvailableHospitalBedsByRequestedTime
} from './helpers';

const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

/**
 * returns an estimate of novel COVID-19 impact on people
 * @param {object} data
 * @returns {object}
 */
const covid19ImpactEstimator = (data = input) => {
  const {
    periodType, reportedCases, timeToElapse, totalHospitalBeds
  } = data;

  const days = getDays(periodType, timeToElapse);

  const currentlyInfected = getCurrentlyInfected(reportedCases);
  const infectionsByRequestedTime = getInfectionsByTime(
    currentlyInfected,
    days
  );

  const severeCurrentlyInfected = getCurrentlyInfected(reportedCases, true);
  const severeInfectionByRequestedTime = getInfectionsByTime(
    severeCurrentlyInfected,
    days
  );

  const severeCasesByRequestedTime = getProjectedSeverePositiveCases(
    infectionsByRequestedTime
  );
  const extremeSevereCasesByRequestedTime = getProjectedSeverePositiveCases(
    severeInfectionByRequestedTime
  );

  const hospitalBedsByRequestedTime = getAvailableHospitalBedsByRequestedTime(
    totalHospitalBeds,
    severeCasesByRequestedTime
  );
  const severeHospitalBedsByRequestedTime = getAvailableHospitalBedsByRequestedTime(
    totalHospitalBeds,
    extremeSevereCasesByRequestedTime
  );

  const impact = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };

  const severeImpact = {
    currentlyInfected: severeCurrentlyInfected,
    infectionsByRequestedTime: severeInfectionByRequestedTime,
    severeCasesByRequestedTime: extremeSevereCasesByRequestedTime,
    hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime
  };

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
