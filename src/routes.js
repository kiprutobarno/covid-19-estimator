import fs from 'fs';
import path from 'path';
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

  app.get('/api/v1/on-covid-19/', (req, res) => {
    const payload = res.body;
    res.status(200).send(covid19ImpactEstimator(payload));
  });

  app.get('/api/v1/on-covid-19/json', (req, res) => {
    const payload = res.body;
    res.status(200).send(covid19ImpactEstimator(payload));
  });

  app.get('/api/v1/on-covid-19/xml', (req, res) => {
    const payload = res.body;
    const jsonObject = covid19ImpactEstimator(payload);
    const xmlBuilder = new xml2js.Builder();
    res.set('Content-Type', 'text/xml');
    res.status(200).send(xmlBuilder.buildObject(jsonObject));
  });

  app.get('/api/v1/on-covid-19/logs', (req, res) => {
    try {
      const fPath = path.join(__dirname, 'logs.txt');
      const data = fs.readFileSync(fPath, 'utf8');
      res.status(200).send(data);
    } catch (error) {
      throw new Error('Error');
    }
  });
};

export default routes;
