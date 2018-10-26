'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const activityController = require('./controllers/activity');
const moodController = require('./controllers/mood');

mongoose.connect('mongodb://localhost:27017/ngweather', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error'));

db.once('open', () => {
  console.log('Connected to database');
});

(async () => {
  try {
    const server = Hapi.server({
      host: 'localhost',
      port: Number(process.argv[2] || 8080),
      routes: {
        cors: true
      } 
    });

    server.route([
      {
        method: 'GET',
        path: '/api/activities',
        handler: activityController.list
      },
      {
        method: 'GET',
        path: '/api/activities/{id}',
        handler: activityController.get
      },
      {
        method: 'POST',
        path: '/api/activities',
        handler: activityController.create
      },
      {
        method: 'DELETE',
        path: '/api/activities/{id}',
        handler: activityController.delete
      },
      {
        method: 'GET',
        path: '/api/moods',
        handler: moodController.list
      },
      {
        method: 'GET',
        path: '/api/moods/{id}',
        handler: moodController.get
      },
      {
        method: 'POST',
        path: '/api/moods',
        handler: moodController.create
      },
      {
        method: 'DELETE',
        path: '/api/moods/{id}',
        handler: moodController.delete
      }
    ]);

    await server.start();
    console.log(`Server running at ${server.info.uri}`);

  } catch (error) {
    console.log(error);
  }
})();
