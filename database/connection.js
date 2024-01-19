const { Sequelize } = require("sequelize");

// database name znz, username root , password null (empty), host localhost
const sequelize = new Sequelize("usama", "root", "", {
  host: "localhost",
  dialect: "mysql",
  // logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to usama=>");
  })
  .catch((error) => {
    console.error("something went wrong, DB not connected!");
  });

module.exports = sequelize;