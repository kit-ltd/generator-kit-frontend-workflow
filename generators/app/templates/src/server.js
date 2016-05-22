import 'babel-polyfill';
import path         from 'path';
import React        from 'react';
import express      from 'express';
import routes       from './routes';
import bodyParser   from 'body-parser';
// import PrettyError  from 'pretty-error';
import cookieParser from 'cookie-parser';
import ReactDOM     from 'react-dom/server';
import Location     from 'react-router/lib/Location';
import { Router, Route, Link } from 'react-router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res) => {
  const location = new Location(req.path, req.query);

  Router.run(routes, location, (err, routeState) => {
    if (err) {
      return console.error(err);
    }

    const InitialComponent = (
      <Router {...routeState} />
    );

    const componentHTML = React.renderToString(InitialComponent);
    const HTML = `
    <DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
    </html>
    `;

    res.end(HTML);
  });
});

app.listen(PORT, () => {
  console.log('Server listen on ${PORT} port');
});
