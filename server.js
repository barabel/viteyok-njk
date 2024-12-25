import express, { Router } from 'express';
import { readFile } from 'fs';
import bodyParser from 'body-parser';
import process from "node:process";
import dotenv from "dotenv";

dotenv.config();

const { text } = bodyParser;

const router = Router();
const app = express();
const port = process.env.VITE_PORT || 3065;

app.use(text({type:"*/*"}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`)
});

const apiBasePath = '/api';

app.use(apiBasePath, router);

const readJson = (reqPath, callback) => {
  const path = `.${apiBasePath}${reqPath}.json`;

  readFile(path, (err, data) => {
    if (err) {
      console.error(err)
    }

    if (data) {
      const parsedData = JSON.parse(data);

      callback(parsedData);
    }
  });
}

router.get(/.*/, (req, res) => {
  const reqPath = req.path;

  readJson(reqPath, (parsedData) => {
    res.send(parsedData);
  });
});

router.post(/.*/, (req, res) => {
  const reqPath = req.path;

  readJson(reqPath, (parsedData) => {
    res.send(parsedData);
  });
});
