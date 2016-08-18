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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import { Grid, Flex, Box } from 'reflexbox'

@observer
export default class StatusApp extends React.Component {
    static childContextTypes = {
      reflexbox: React.PropTypes.object
    }

    getChildContext () {
      return {
        reflexbox: {
          breakpoints: {
            sm: '(min-width: 30em)',
            md: '(min-width: 48em)',
            lg: '(min-width: 60em)'
          }
        }
      }
    }

	render() {
		const {statusStore, viewStore} = this.props;

    const styles = {
      container: {
        backgroundColor: 'rgb(48, 48, 48)'
      }
    };

		return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="container" style={styles.container}>
          <AppBar title="Josoroma" />
          <Flex align="center" justify="space-around">
            <Box col={12} sm={12} md={6} p={0} m={0}>
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
