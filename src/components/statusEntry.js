import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

import {Card, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const ENTER_KEY = 13;

@observer
export default class StatusEntry extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {entryText: ''};
  }

	render() {

		return (
      <Card>
        <TextField
          ref="newField"
          className="new-status"
          autoFocus={true}
          hintText="What's on your mind?"
          value={this.state.entryText}
          onChange={this.handleChange}
          fullWidth={true}
          multiLine={true}
          rows={2}
        />
        <CardActions>
          <FlatButton onClick={this.handleNewStatusAction} label="Save" />
        </CardActions>
    </Card>
    );
	}

  handleNewStatusAction = (event) => {
    const input = this.state.entryText;

    if (input) {
      this.props.statusStore.addStatus(input);
      this.setState({entryText: ''});
    }
	};

	handleChange = (event) => {
    this.setState({entryText: this.refs.newField.getValue()});
	};
}

StatusEntry.propTypes = {
	statusStore: React.PropTypes.object.isRequired
};
