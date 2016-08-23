import React from 'react';
import {observer} from 'mobx-react';

import {pluralize} from '../vendor/js/utils';

import { ALL_STATUSES, PUBLIC_STATUSES, FRIEND_STATUSES } from '../constants';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
// https://design.google.com/icons/
import ActionAll from 'material-ui/svg-icons/action/reorder';
import ActionPublic from 'material-ui/svg-icons/action/face';
import ActionFriend from 'material-ui/svg-icons/action/lock-outline';

import { Grid, Flex, Box } from 'reflexbox'

@observer
export default class StatusHeader extends React.Component {
  render() {
    return (
      <header>
        <div className="filters">
          {this.renderMenu()}
        </div>
      </header>
    );
  }

  renderMenu() {
    const statusStore = this.props.statusStore;
    const publicStatusWord = pluralize(statusStore.publicStatusCount, 'item');

    const styles = {
      paper: {
        margin: '25px'
      },
      boxTop: {
        paddingTop: '14px'
      }
    };

    return (
      <Paper style={styles.paper}>
        <Flex>
          <Box col={6} p={0} m={0}>
            <IconButton
              href={"#/"}
              className={ALL_STATUSES === this.props.viewStore.statusFilter ? "selected" : ""}
              tooltip="All"
            >
              <ActionAll />
            </IconButton>
            <IconButton
              href={"#/public"}
              className={PUBLIC_STATUSES === this.props.viewStore.statusFilter ? "selected" : ""}
              tooltip="Public"
            >
              <ActionPublic />
            </IconButton>
            <IconButton
              href={"#/friend"}
              className={FRIEND_STATUSES === this.props.viewStore.statusFilter ? "selected" : ""}
              tooltip="Friends"
            >
              <ActionFriend />
            </IconButton>
          </Box>
          <Box col={6} p={0} m={0} style={styles.boxTop}>
            <span className="status-count">
            <strong>{statusStore.publicStatusCount}</strong> {publicStatusWord} public
            </span>
          </Box>
        </Flex>
      </Paper>
    )
  }
}

StatusHeader.propTypes = {
  viewStore: React.PropTypes.object.isRequired,
  statusStore: React.PropTypes.object.isRequired
}
