import xml2js from 'xml2js';
import covid19ImpactEstimator from './estimator';
/**
 *
 * @param {object} app
 * @returns {object}
 * @description this function handles api routing
 */
const routes = (app) => {
  app.post('/api/v1/on-covid-19', (req, res) => {
    const payload = req.body;
    res.status(200).send(covid19ImpactEstimator(payload));
  });

  app.post('/api/v1/on-covid-19/json', (req, res) => {
    const payload = req.body;
    res.status(200).send(covid19ImpactEstimator(payload));
  });

  app.post('/api/v1/on-covid-19/xml', (req, res) => {
    const payload = req.body;
    const jsonObject = covid19ImpactEstimator(payload);
    const xmlBuilder = new xml2js.Builder();
    res.set('Content-Type', 'text/xml');
    res.status(200).send(xmlBuilder.buildObject(jsonObject));
  });
};

export default routes;
