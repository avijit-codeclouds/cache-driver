import redis from 'redis';
// import { promisifyAll } from 'bluebird'; //with the bluebird we can manage async-await
// promisifyAll(redis);

const client = redis.createClient({
  port: 6379,
  host: 'localhost',
});

export default client;
