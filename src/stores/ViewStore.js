import {observable} from 'mobx';

import { ALL_STATUSES } from '../constants';

export default class ViewStore {
	@observable statusBeingEdited = null;
	@observable statusFilter= ALL_STATUSES;
}
