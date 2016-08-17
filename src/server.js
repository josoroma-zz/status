import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { renderToString } from 'react-dom/server'

import StatusStore from '../src/stores/StatusStore';
import ViewStore from '../src/stores/ViewStore';
import StatusApp from '../src/components/statusApp.js';
import React from 'react';

global.navigator = { userAgent: 'all' };

const app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const renderFullPage = html => {
	const initialState = { statuses };

	return `
    <!doctype html>
    <html lang="utf-8">
      <head>
        <script>
          window.initialState = ${JSON.stringify(initialState)}
        </script>
      </head>
      <body>
        <section id="app-status" class="app-status">
          <div>
            ${html}
          </div>
        </section>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
	`
};

// Statuses are going to be stored here.
let statuses = [
    {
        id: 1,
        title: `Here’s a selfie of my girl.`
    },
    {
        id: 2,
        title: `I’m done with this.”`
    }
];

app.use(bodyParser.json());

app.get('/', function(req, res) {
	const statusStore = StatusStore.fromJS(statuses);
	const viewStore = new ViewStore();

	const initView = renderToString((
		<StatusApp statusStore={statusStore} viewStore={viewStore} />
	));

	const page = renderFullPage(initView);

	res.status(200).send(page);
});

app.post('/api/statuses', function(req, res) {
	statuses = req.body.statuses;
	if (Array.isArray(statuses)) {
		console.log(`Updated statuses (${statuses.length})`);
		res.status(201).send(JSON.stringify({ success: true }));
	} else {
		res.status(200).send(JSON.stringify({ success: false, error: "expected `statuses` to be array" }));
	}
});

// example of handling 404 pages
app.get('*', function(req, res) {
    console.error('- 404 -\n');
	res.status(404).send('404 - Page Not Found');
});

// global error catcher, need four arguments
app.use((err, req, res, next) => {
	console.error('Error on request %s %s\n', req.method, req.url);
	console.error(err.stack + '\n');
	res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
	console.log('Exception: ', evt);
});

app.listen(3000, function(){
	console.log('Open http://localhost:3000' + '\n');
});
