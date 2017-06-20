const util = require('util');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = process.env.DB_URI || 'mongodb://mongodb/haoc';

// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
  assert.equal(null, err);
  console.log('Connected correctly to server');

  db.close();
});

console.log(util.inspect(process.env));
