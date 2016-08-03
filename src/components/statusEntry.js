import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

const ENTER_KEY = 13;

@observer
export default class StatusEntry extends React.Component {
	render() {
		return (<input
			ref="newField"
			className="new-status"
			placeholder="What's on your mind?"
			onKeyDown={this.handleNewStatusKeyDown}
			autoFocus={true}
		/>);
	}

	handleNewStatusKeyDown = (event) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = ReactDOM.findDOMNode(this.refs.newField).value.trim();

		if (val) {
			this.props.statusStore.addStatus(val);
			ReactDOM.findDOMNode(this.refs.newField).value = '';
		}
	};
}

StatusEntry.propTypes = {
	statusStore: React.PropTypes.object.isRequired
};
