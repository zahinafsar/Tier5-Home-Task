if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./.env" });
}

const env = process.env;

module.exports = {
  connectionString: env.MONGODB_URI,
};
