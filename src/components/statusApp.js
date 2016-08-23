import React from 'react';
import {observer} from 'mobx-react';
import {Router} from 'director';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import StatusHeader from './statusHeader';
import StatusEntry from './statusEntry';
import StatusOverview from './statusOverview';

import { ALL_STATUSES, PUBLIC_STATUSES, FRIEND_STATUSES } from '../constants';

import merge from 'lodash/merge';

import {grey900} from 'material-ui/styles/colors';
import {grey50} from 'material-ui/styles/colors';
import {blue700} from 'material-ui/styles/colors';
import {blue800} from 'material-ui/styles/colors';
import {fullWhite} from 'material-ui/styles/colors';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import AppBarIcon from 'material-ui/svg-icons/action/favorite';

import { Grid, Flex, Box } from 'reflexbox';

@observer
export default class StatusApp extends React.Component {
  render() {
    const {statusStore, viewStore} = this.props;

    const themeSettings = {
      appBar:{
        color: grey900,
        textColor: fullWhite
      },
      flatButton: {
        buttonFilterColor: blue700,
        color: blue800,
        fontSize: 11,
        fontWeight: 500
      }
    };

    const styles = {
      container: {
        backgroundColor: grey900
      }
    };

    let theme = getMuiTheme(darkBaseTheme);

    merge(theme, themeSettings);

    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className="container" style={styles.container}>
          <AppBar
            iconElementLeft={<IconButton><AppBarIcon /></IconButton>}
            title="Wall"
          />
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
      '/':       function() { viewStore.statusFilter = ALL_STATUSES; },
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
