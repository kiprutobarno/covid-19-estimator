import xml2js from 'xml2js';
import { Router } from 'express';
import covid19ImpactEstimator from './estimator';

const routes = Router();

routes.post('/api/v1/on-covid-19', (req, res) => {
  const payload = req.body;
  const data = covid19ImpactEstimator(payload);
  return res.json(data);
});

routes.post('/api/v1/on-covid-19/json', (req, res) => {
  const payload = req.body;
  const data = covid19ImpactEstimator(payload);
  return res.json(data);
});

routes.post('/api/v1/on-covid-19/xml', (req, res) => {
  const payload = req.body;
  const data = covid19ImpactEstimator(payload);
  const xmlBuilder = new xml2js.Builder();
  const xmlData = xmlBuilder.buildObject(data);
  res.set('Content-Type', 'application/xml');
  return res.send(xmlData);
});

export default routes;
