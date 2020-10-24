const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting Down...');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

// const DB = process.env.DB_PATH.replace('<PASSWORD>', process.env.DB_PASS);
const DB = process.env.DB_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connection successful!');
  });

const port = process.env.PORT || 4200;
const server = app.listen(port, () => {
  console.log(`The server is running at port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! Shutting Down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
