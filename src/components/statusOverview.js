import React from 'react';
import {observer} from 'mobx-react';
import { PUBLIC_STATUSES, FRIEND_STATUSES } from '../constants';

import StatusItem from './statusItem';

@observer
export default class StatusOverview extends React.Component {
	render() {
		const {statusStore, viewStore} = this.props;

		return <section className="main">
			<input
				className="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={statusStore.publicStatusCount === 0}
			/>

			<ul className="status-list">
				{this.getVisibleStatuses().map(status =>
					(
            <StatusItem
  						key={status.id}
  						status={status}
  						viewStore={viewStore}
  					/>
          )
				)}
			</ul>
		</section>
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
