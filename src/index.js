import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import mongoose from 'mongoose';
import { join } from 'path';
import bodyParser from 'body-parser';
import register from 'babel-core/register';
import babelPolyfill from 'babel-polyfill';

// config
import config from './config/config';
import dbConfig from './config/database';
import passport from './config/passport';

// middlewares
import { notFound, catchErrors } from './middlewares/errors';

// routes
import auth from './routes/auth';
import projects from './routes/projects';
import tasks from './routes/tasks';

// verify user callbacks
passport();

// connect to mongoDB
mongoose.connect(dbConfig.mongoUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// create app
const app = express();

// set up view engine
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.json()); // application/json headers

// use routes
app.use('/api/auth', auth());
app.use('/api/projects', projects());
app.use('/api/tasks', tasks());

// errors handling
app.use(notFound);
app.use(catchErrors);

// let's play!
app.listen(config.server.port, () => {
    console.log(`Server is up!`);
});