import { Router } from 'express';
import covid19ImpactEstimator from './estimator';
import { inRequest, dataLog } from './logs';

const routes = Router();

const respond = (req, res) => {
  const { date, outResponse } = req.params;

  const data = covid19ImpactEstimator(req.body);

  outResponse(date, req, 200);
  return res.json(data);
};

routes.route('/').post(inRequest, respond);

routes.route('/json').post(inRequest, respond);

routes.route('/xml').post(inRequest, (req, res) => {
  const { date, outResponse } = req.params;
  const data = covid19ImpactEstimator(req.body);
  res.set('Content-Type', 'application/xml');
  outResponse(date, req, 200);
  return res.send(json2xml(data));
});

routes.route('/logs').get(inRequest, dataLog);

export default routes;
