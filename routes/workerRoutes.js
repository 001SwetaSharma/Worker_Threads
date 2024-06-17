import express from 'express';
import { Worker } from 'worker_threads';
const router = express.Router();

router.get('/', (req,res) => {
    res.status(200).send({message: 'Non-Blocking Data fetched Successfully'});
});

router.get('/fibonacci/:num', (req,res) => {

    //path to your worker threads
    const wThreads = new Worker('C:/Users/conta/Documents/projects/workerThreads/workers.js', {workerData: req.params.num});

    //handling any message which is sent to Parent
    wThreads.on('message', (data) => {
        res.status(200).send(data.toString());
    });

    //handling any error which is sent to Parent
    wThreads.on('error', (error) => {
        console.error(`Error in Worker thread :: ${error}`);
        res.status(404).send(`Error in generating fibonacci series :: ${error}`);
    });
});

export default router;