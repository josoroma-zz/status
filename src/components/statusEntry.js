import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

import TextField from 'material-ui/TextField';

const ENTER_KEY = 13;

@observer
export default class StatusEntry extends React.Component {
	render() {
		return (<TextField
                    ref="newField"
                    className="new-status"
                    autoFocus={true}
                    hintText="What's on your mind?"
                    onKeyDown={this.handleNewStatusKeyDown}
                />);
	}

	handleNewStatusKeyDown = (event) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

        // this.refs.newField.getValue()
        var input = event.target.value;

		if (input) {
			this.props.statusStore.addStatus(input);
			event.target.value = '';
		}
	};
}

StatusEntry.propTypes = {
	statusStore: React.PropTypes.object.isRequired
};
