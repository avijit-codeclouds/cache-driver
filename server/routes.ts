import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import redisRouter from './api/controllers/examples/redisRouter';
// import { redisApp } from './config/redis';
// import redis from 'redis';
// import axios from 'axios';

// const client = redis.createClient({
//   port: 6379,
//   host: 'localhost',
// });
// const client = redisApp;
export default function routes(app: Application): void {
  app.use('/api/v1/redis', redisRouter);
  app.use('/api/v1/examples', examplesRouter);

  // app.get('/jobs', async (req: any, res: any): Promise<any> => {
  //   const searchTerm = req.query.search;
  //   client.get(searchTerm, async (err: any, jobs: any): Promise<any> => {
  //     if (err) throw err;
  //     if (jobs) {
  //       res.status(200).send({
  //         jobs: JSON.parse(jobs),
  //         message: 'data retrieved from the cache',
  //       });
  //     } else {
  //       const jobs = await axios.get(
  //         `https://jobs.github.com/positions.json?search=${searchTerm}`
  //       );
  //       client.setex(searchTerm, 600, JSON.stringify(jobs.data));
  //       res.status(200).send({
  //         jobs: jobs.data,
  //         message: 'cache miss',
  //       });
  //     }
  //   });
  // });
}
