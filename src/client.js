import StatusStore from './stores/StatusStore';
import ViewStore from './stores/ViewStore';

import StatusApp from './components/statusApp.js';

import React from 'react';
import ReactDOM from 'react-dom';

const initialState = window.initialState || {};

var statusStore = StatusStore.fromJS(initialState.statuses || []);
var viewStore = new ViewStore();

statusStore.subscribeServerToStore();

ReactDOM.render(
  <StatusApp statusStore={statusStore} viewStore={viewStore}/>,
  document.getElementById('app-status')
);
