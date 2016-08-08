import React from 'react';
import {observer} from 'mobx-react';

import {Router} from 'director';

import StatusHeader from './statusHeader';
import StatusEntry from './statusEntry';
import StatusOverview from './statusOverview';

import { ALL_STATUSES, PUBLIC_STATUSES, FRIEND_STATUSES } from '../constants';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

@observer
export default class StatusApp extends React.Component {
	render() {
		const {statusStore, viewStore} = this.props;

		return (
			<div className="container">
                <MuiThemeProvider>
                    <RaisedButton label="Default" />
                </MuiThemeProvider>
                <StatusHeader statusStore={statusStore} viewStore={viewStore} />
                <StatusEntry statusStore={statusStore} />
				<StatusOverview statusStore={statusStore} viewStore={viewStore} />
			</div>
		);
	}

	componentDidMount() {
		var viewStore = this.props.viewStore;

		var router = Router({
			'/': function() { viewStore.statusFilter = ALL_STATUSES; },
			'/public': function() { viewStore.statusFilter = PUBLIC_STATUSES; },
			'/friend': function() { viewStore.statusFilter = FRIEND_STATUSES; }
		});
		router.init('/');
	}
}

StatusApp.propTypes = {
	viewStore: React.PropTypes.object.isRequired,
	statusStore: React.PropTypes.object.isRequired
};
