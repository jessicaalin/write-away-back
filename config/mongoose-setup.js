const mongoose  = require("mongoose");

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => {
    console.log("Mongoose connection success!");
  })
  .catch((err) => {
    console.log("Mongoose connection failed!");
    console.log(err);
  });
