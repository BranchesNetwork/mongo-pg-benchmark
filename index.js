var Sequelize = require("sequelize");
var mongoose = require("mongoose");
var chalk = require("chalk");

var N_USERS = parseInt(process.argv[2]) || 100;
var N_REPETITIONS = parseInt(process.argv[3] || 10);

var casual = require("casual");

var sequelize = new Sequelize("users", null, null, {
  dialect: "postgres",
  logging: false
});

mongoose.connect("mongodb://localhost/benchmark");

var SequelizeUser = sequelize.define("User", {
    email: Sequelize.STRING,
    site: Sequelize.STRING,
    country: Sequelize.STRING,
    address: Sequelize.STRING,
    bio: Sequelize.STRING(2048),
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    phone: Sequelize.STRING,
    password: Sequelize.STRING(512),
    year: Sequelize.INTEGER
});

var MongooseSchema = new mongoose.Schema({
  email: String,
  site: String,
  country: String,
  address: String,
  bio: String,
  firstname: String,
  lastname: String,
  phone: String,
  password: String,
  year: Number
});

var MongooseUser = mongoose.model("User", MongooseSchema);

casual.define("user", function() {
  return {
    email: casual.email,
    site: casual.domain,
    country: casual.country,
    address: casual.address,
    bio: casual.description,
    firstname: casual.first_name,
    lastname: casual.last_name,
    phone: casual.phone,
    password: casual.password,
    year: casual.year
  };
});

var insertions = {
  mongo: 0,
  pg: 0
}

var start = process.hrtime();

console.log(chalk.red("Benchmarking", N_USERS, "records"));

// Clear MongoDB
MongooseUser.remove({}, function(err) {
  if (err) {
    return console.log(err);
  }

  // Clear Postgres
  sequelize.sync({force: true})
  .success(function() {
  for (var i = 0; i < N_USERS; i++) {
    var user = casual.user;
    SequelizeUser.create(user)
    .success(function() {
      // console.log("pg User created");
      insertions.pg++;
      if (insertions.pg === N_USERS) {
        var diff = process.hrtime(start);

        console.log(chalk.cyan("pg insert", (diff[0] * 10e9 + diff[1]) / 10e5, "ms"));
        pgBenchmark2();
      }
    })
    .error(function(err) {
      console.log("pg error", err);
    });

    var mongooseUser = new MongooseUser(user);
    mongooseUser.save(function(err) {
      if (err) {
        return console.log("error", err);
      }
      // console.log("MongoDB user created");
      insertions.mongo++;
      if (insertions.mongo === N_USERS) {
        var diff = process.hrtime(start);

        console.log(chalk.green("mongo insert", (diff[0] * 10e9 + diff[1]) / 10e5, "ms"));
        mongoBenchmark2();
      }

    });
  }
  });
});

function pgBenchmark2() {
  var start = process.hrtime();

  var values = [];

  for (var i = 0; i < N_REPETITIONS; i++) {
    SequelizeUser.findAll()
    .success(function(users) {
      var diff = process.hrtime(start);
      var diffValue = (diff[0] * 10e9 + diff[1]) / 10e5;
      console.log(chalk.cyan("pg select *", users.length, "results", diffValue , "ms"));
      values.push(diffValue);
      if (values.length === N_REPETITIONS) {
        var average = values.reduce(function(l, r) {
          return l + r;
        }) / N_REPETITIONS;
        console.log(chalk.cyan("pg select * - average", users.length, "results", average, "ms"));
        pgBenchmark3();
      }
    });
  }
}

function mongoBenchmark2() {

  var values = [];

  for (var i = 0; i < N_REPETITIONS; i++) {
    var start = process.hrtime();

    MongooseUser.find({}, function(err, users) {
      if (err) {
        return console.log("Error,", err);
      }

      var diff = process.hrtime(start);
      var diffValue = (diff[0] * 10e9 + diff[1]) / 10e5;
      console.log(chalk.green("mongo select *", users.length, "results", diffValue , "ms"));

      values.push(diffValue);
      if (values.length === N_REPETITIONS) {
        var average = values.reduce(function(l, r) {
          return l + r;
        }) / N_REPETITIONS;
        console.log(chalk.green("mongo select * - average", users.length, "results", average, "ms"));
        mongoBenchmark3();
      }
    });
  }
}

function pgBenchmark3() {
  var start = process.hrtime();

  var values = [];

  for (var i = 0; i < N_REPETITIONS; i++) {
    SequelizeUser.findAll({
      where: "year < 1990" 
    })
    .success(function(users) {
      var diff = process.hrtime(start);
      var diffValue = (diff[0] * 10e9 + diff[1]) / 10e5;
      console.log(chalk.cyan("pg 'select year < 1990'", users.length, "results,", diffValue , "ms"));
      values.push(diffValue);
      if (values.length === N_REPETITIONS) {
        var average = values.reduce(function(l, r) {
          return l + r;
        }) / N_REPETITIONS;
        console.log(chalk.cyan("pg 'select year < 1990' - average", users.length, "results,", average, "ms"));
        pgBenchmark4();
      }
    });
  }
}


function mongoBenchmark3() {

  var values = [];

  for (var i = 0; i < N_REPETITIONS; i++) {
    var start = process.hrtime();

    MongooseUser.find({
      year: {$lt: 1990}
    }, function(err, users) {
      if (err) {
        return console.log("Error,", err);
      }

      var diff = process.hrtime(start);
      var diffValue = (diff[0] * 10e9 + diff[1]) / 10e5;
      console.log(chalk.green("mongo 'select year < 1990'", users.length, "results,", diffValue , "ms"));

      values.push(diffValue);
      if (values.length === N_REPETITIONS) {
        var average = values.reduce(function(l, r) {
          return l + r;
        }) / N_REPETITIONS;
        console.log(chalk.green("mongo 'select year < 1990' - average", users.length, "results,", average, "ms"));
        mongoBenchmark4();
      }
    });
  }
}


function pgBenchmark4() {
  var start = process.hrtime();

  var values = [];

  for (var i = 0; i < N_REPETITIONS; i++) {
    SequelizeUser.findAll({
      where: "country = 'Germany'" 
    })
    .success(function(users) {
      var diff = process.hrtime(start);
      var diffValue = (diff[0] * 10e9 + diff[1]) / 10e5;
      console.log(chalk.cyan("pg 'select country = Germany'", users.length, "results,", diffValue , "ms"));
      values.push(diffValue);
      if (values.length === N_REPETITIONS) {
        var average = values.reduce(function(l, r) {
          return l + r;
        }) / N_REPETITIONS;
        console.log(chalk.cyan("pg 'select country = Germany' - average", users.length, "results,", average, "ms"));
      }
    });
  }
}

function mongoBenchmark4() {

  var values = [];

  for (var i = 0; i < N_REPETITIONS; i++) {
    var start = process.hrtime();

    MongooseUser.find({
      country: "Germany"
    }, function(err, users) {
      if (err) {
        return console.log("Error,", err);
      }

      var diff = process.hrtime(start);
      var diffValue = (diff[0] * 10e9 + diff[1]) / 10e5;
      console.log(chalk.green("mongo 'select country = Germany'", users.length, "results,", diffValue , "ms"));

      values.push(diffValue);
      if (values.length === N_REPETITIONS) {
        var average = values.reduce(function(l, r) {
          return l + r;
        }) / N_REPETITIONS;
        console.log(chalk.green("mongo 'select country = Germany' - average", users.length, "results,", average, "ms"));
      }
    });
  }
}

