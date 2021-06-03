import { Request, Response } from 'express';
// import redis from 'redis';
import axios from 'axios';
// import { promisifyAll } from 'bluebird'; //with the bluebird we can manage async-await
import client from '../../../config/redis';
// promisifyAll(client);
import NodeCache from 'node-cache';
const myCache = new NodeCache();
import { heavyComputation } from '../../../lib/methods';

export class redisController {
  jobs(req: Request, res: Response): void {
    // const client: any = redis.createClient({
    //   port: 6379,
    //   host: 'localhost',
    // });
    const searchTerm: any = req.query.search;
    client.get(searchTerm, async (err: any, jobs: any): Promise<any> => {
      if (err) throw err;
      if (jobs) {
        res.status(200).send({
          jobs: JSON.parse(jobs),
          message: 'data retrieved from the cache',
        });
      } else {
        const jobs = await axios.get(
          `https://jobs.github.com/positions.json?search=${searchTerm}`
        );
        client.setex(searchTerm, 600, JSON.stringify(jobs.data));
        res.status(200).send({
          jobs: jobs.data,
          message: 'cache miss',
        });
      }
    });
  }

  cacheData = async (_: Request, res: Response): Promise<any> => {
    // res.send({ result: 'HW..' });
    res.status(404).send('Sorry, cant find that');
  };

  cacheMethod = async (_: Request, res: Response): Promise<any> => {
    // If cache has key, retrieve value
    // from cache itself
    if (myCache.has('uniqueKey')) {
      console.log('Retrieved value from cache !!');
      // Serve response from cache using
      // myCache.get(key)
      res.send({ Result: myCache.get('uniqueKey') });
    } else {
      // Perform operation, since cache
      // doesn't have key
      const result: any = await heavyComputation();
      console.log(result);
      // Set value for same key, in order to
      // serve future requests efficiently
      myCache.set('uniqueKey', result);

      console.log('Value not present in cache,' + ' performing computation');
      res.send({ Result: result });
    }
  };
}
export default new redisController();
