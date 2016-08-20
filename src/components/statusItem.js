import React from 'react';

import {observer} from 'mobx-react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import TextField from 'material-ui/TextField';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import uniqueId from 'lodash/uniqueId';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class StatusItem extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {editText: props.status.title};

    this.id = uniqueId('editField_');
	}

	render() {
		const {viewStore, status} = this.props;

    const styles = {
      card: {
        margin: '24px'
      },
      cardActions: {
        textAlign: 'right'
      },
      iconMenu: {
        float: 'right'
      },
      flatButton: {
        top: '-18px'
      }
    };

		return (
			<Card style={styles.card} className={[
				status.friend ? "friend": "",
				status === viewStore.statusBeingEdited ? "editing" : ""
			].join(" ")}>
        <IconMenu style={styles.iconMenu}
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem
            primaryText="Private"
            onClick={this.handleToggle}
          />
          <MenuItem
            primaryText="Delete"
            onClick={this.handleDestroy}
          />
        </IconMenu>
        <CardText>
          <TextField
            ref="editField"
            className="edit"
            id={this.id}
            value={this.state.editText}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            fullWidth={true}
            multiLine={true}
            rows={1}
          />
        </CardText>
        <CardActions style={styles.cardActions}>
          <FlatButton
            style={styles.flatButton}
            label="Save"
          />
        </CardActions>
			</Card>
		);
	}

	handleSubmit = (event) => {
		const val = this.state.editText.trim();

		if (val) {
			this.props.status.setTitle(val);
			this.setState({editText: val});
		} else {
			this.handleDestroy();
		}

		this.props.viewStore.statusBeingEdited = null;
	};

	handleDestroy = () => {
		this.props.status.destroy();
		this.props.viewStore.statusBeingEdited = null;
	};

	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.setState({editText: this.props.status.title});
			this.props.viewStore.statusBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	handleChange = (event) => {
		this.setState({editText: event.target.value});
	};

	handleToggle = () => {
		this.props.status.toggle();
	};
}

StatusItem.propTypes = {
	status: React.PropTypes.object.isRequired,
	viewStore: React.PropTypes.object.isRequired
};
