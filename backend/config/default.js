module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'supersecret',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ems',
  port: process.env.PORT || 4000
};
