import { Router } from 'express';
import json2xml from 'json2xml';
import covid19ImpactEstimator from './estimator';

const routes = Router();

routes.post('/', (req, res) => {
  const payload = req.body;
  const data = covid19ImpactEstimator(payload);
  return res.json(data);
});

routes.post('/json', (req, res) => {
  const payload = req.body;
  const data = covid19ImpactEstimator(payload);
  return res.json(data);
});

routes.post('/xml', (req, res) => {
  const payload = req.body;
  const data = covid19ImpactEstimator(payload);
  res.set('Content-Type', 'application/xml');
  return res.send(json2xml(data));
});

export default routes;
