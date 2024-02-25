import { createClient } from 'redis';
import { REDIS_URL } from '../config/env.config';

let redisClient: any;

(async () => {
  redisClient = createClient();

  redisClient.on("connect", (error: Error) => console.log("Established connection"));

  redisClient.on("error", (error: Error) => console.error(`Error11 : ${error}`));

  await redisClient.connect();
})();

export default redisClient;
