import { Worker } from 'bullmq';
import { createClient } from 'redis';

const redis = createClient();
redis.connect();

const emailWorker = new Worker('emails', async (job) => {
    const{to,subject,body}=job.data;
    console.log(`sending email to ${to}`);
    await new Promise(resolve=> setTimeout(resolve,1000));
    return{succes:true};
}, {
  connection: redis
});

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed: ${err.message}`);
});

export default emailWorker;