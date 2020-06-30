import express from 'express';
import path from 'path';
import open from 'open';

/* eslint-disable no-console */

const port = process.env.PORT || 8080;
const app = express();


app.get('*.js', function(req, res, next) {
 req.url = req.url + '.gz';
 res.set('Content-Encoding', 'gzip');
 res.set('Content-Type', 'text/javascript');
 next();
});

app.get('*.css', function(req, res, next) {
 req.url = req.url + '.gz';
 res.set('Content-Encoding', 'gzip');
 res.set('Content-Type', 'text/css');
 next();
});

app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});