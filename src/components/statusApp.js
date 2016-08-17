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

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import { Grid, Flex, Box } from 'reflexbox'

@observer
export default class StatusApp extends React.Component {
	render() {
		const {statusStore, viewStore} = this.props;

    const styles = {
      box: {
        width: '600px'
      }
    };

		return (
      <MuiThemeProvider>
        <div className="container">
          <AppBar title="Josoroma" />
          <Flex align="center" justify="space-around">
            <Box style={styles.box} px={3}>
              <StatusHeader statusStore={statusStore} viewStore={viewStore} />
              <StatusEntry statusStore={statusStore} />
              <StatusOverview statusStore={statusStore} viewStore={viewStore} />
            </Box>
          </Flex>
        </div>
      </MuiThemeProvider>
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
