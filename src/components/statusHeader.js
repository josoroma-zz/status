import React from 'react';
import {observer} from 'mobx-react';

import {pluralize} from '../vendor/js/utils';

import { ALL_STATUSES, PUBLIC_STATUSES, FRIEND_STATUSES } from '../constants';

@observer
export default class StatusHeader extends React.Component {
	render() {
		const statusStore = this.props.statusStore;
		const publicStatusWord = pluralize(statusStore.publicStatusCount, 'item');

		return (
			<header>
                <h1>Wall</h1>

				<span className="status-count">
					<strong>{statusStore.publicStatusCount}</strong> {publicStatusWord} public
				</span>

				<ul className="filters">
					{this.renderFilterLink(ALL_STATUSES, "", "All")}
					{this.renderFilterLink(PUBLIC_STATUSES, "public", "Public")}
					{this.renderFilterLink(FRIEND_STATUSES, "friend", "Friend")}
				</ul>
			</header>
		);
	}

	renderFilterLink(filterName, url, caption) {
		return (<li>
			<a href={"#/" + url}
				className={filterName ===  this.props.viewStore.statusFilter ? "selected" : ""}>
				{caption}
			</a>
			{' '}
		</li>)
	}
}

StatusHeader.propTypes = {
	viewStore: React.PropTypes.object.isRequired,
	statusStore: React.PropTypes.object.isRequired
}
