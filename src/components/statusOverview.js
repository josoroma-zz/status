import React from 'react';
import {observer} from 'mobx-react';
import { PUBLIC_STATUSES, FRIEND_STATUSES } from '../constants';

import StatusItem from './statusItem';

@observer
export default class StatusOverview extends React.Component {
  render() {
    const {statusStore, viewStore} = this.props;

    return (
      <section className="main">
        <div className="status-list">
          {this.getVisibleStatuses().map(status =>
            (
              <StatusItem
                key={status.id}
                status={status}
                viewStore={viewStore}
              />
            )
          )}
        </div>

        <footer>
        2016
        </footer>
      </section>
    );
  }

  getVisibleStatuses() {
    return this.props.statusStore.statuses.filter(status => {
      switch (this.props.viewStore.statusFilter) {
        case PUBLIC_STATUSES:
          return !status.friend;
        case FRIEND_STATUSES:
          return status.friend;
        default:
          return true;
      }
    });
  }

  toggleAll = (event) => {
    var checked = event.target.checked;
    this.props.statusStore.toggleAll(checked);
  };
}


StatusOverview.propTypes = {
  viewStore: React.PropTypes.object.isRequired,
  statusStore: React.PropTypes.object.isRequired
}
