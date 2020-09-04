import express from 'express';

const app = express();

app.listen(() => {
  console.log(`🚀 server was started at ${new Date()}`);
});
