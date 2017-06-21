const mongoose = require('mongoose');

const dbUri = process.env.DB_URI || 'mongodb://mongodb/haoc';

const connectionPromise = new Promise((resolve, reject) => {
  mongoose.connect(dbUri);
  mongoose.connection.on('connected', () =>
    console.log('Mongoose default connection open to ', dbUri));

  mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ', err);
    reject(err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
    reject();
  });

  mongoose.connection.on('open', () => {
    console.log('Mongoose default connection is open');

    resolve(mongoose.connection);
  });

  process.on('SIGINT', () =>
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    }));
});

module.exports = connectionPromise;
