import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DIALECT) {
  throw new Error(
    "One or more required environment variables are not defined."
  );
}

const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD!, {
  host: DB_HOST!,
  dialect: DB_DIALECT as "mysql", 
  logging: false,
});

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "\x1b[33mDatabase connection has been established successfully.\x1b[0m"
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection(); 

export default sequelize;
