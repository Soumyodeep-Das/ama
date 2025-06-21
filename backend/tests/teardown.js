const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose.disconnect();
  if (global.__MONGOSERVER__) {
    await global.__MONGOSERVER__.stop();
  }
};
