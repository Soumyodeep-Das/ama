const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

module.exports = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGO_URI = uri;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  global.__MONGOSERVER__ = mongoServer;
};
