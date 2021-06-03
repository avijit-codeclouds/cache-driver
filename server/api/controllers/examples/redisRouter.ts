import express from 'express';
import redisController from './redisController';
// import controller from './controller';
export default express
  .Router()
  .get('/', redisController.jobs)
  .get('/api', redisController.cacheMethod)
  .get('/data', redisController.cacheData);
