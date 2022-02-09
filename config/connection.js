const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/usersDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
