import { Queue } from 'bullmq';
import { createClient } from 'redis';

const redis = createClient();
redis.connect();

export const emailQueue = new Queue('emails', {
  connection: redis
});

export default emailQueue;