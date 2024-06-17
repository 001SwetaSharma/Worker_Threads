import express from 'express';
const app = express();
import routes from './routes/workerRoutes.js';
const port = 5001;

app.use('/', (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} - ${req.url}`);
    next();
});
app.use('/api', routes);
app.listen(port, () => {
    console.log(`Server Listening at PORT :: ${port}`);
    process
    .on('uncaughtException', (err) => {
        console.error(`Error in uncaughtException :: ${err}`);
    })
    .on('unhandledRejection', (err) => {
        console.error(`Error in Unhandled Rejection :: ${err}`);
    })
});