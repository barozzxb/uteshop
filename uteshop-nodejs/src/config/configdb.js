// src/config/configdb.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("uteshop", "root", "04032004", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Export cả default lẫn named để đồng bộ với các import
export default sequelize;
export { connectDB, sequelize };
