import { Queue, Worker } from 'bullmq';
import sendEvent from '../history/history.service.js';

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

const Q_NAME = 'queue';

const queue = new Queue(Q_NAME, { connection });

const worker = new Worker(Q_NAME, async (job) => {
  await sendEvent(job.data);
}, { connection });

export { queue, worker, connection };
