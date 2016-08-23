import {observable, computed, autorun} from 'mobx';

import StatusModel from '../models/StatusModel'

import uniqueId from 'lodash/uniqueId';

export default class StatusStore {
  @observable statuses = [];

  @computed get publicStatusCount() {
    return this.statuses.reduce(
      (sum, status) => sum + (status.friend ? 0 : 1),
      0
    )
  }

  @computed get friendCount() {
    return this.statuses.length - this.publicStatusCount;
  }

  subscribeServerToStore(model) {
    autorun(() => {
      const statuses = this.toJS();

      if (this.subscribedServerToModel !== true) {
        this.subscribedServerToModel = true;
        return;
      }

      fetch('/api/statuses', {
        method: 'post',
        body: JSON.stringify({ statuses }),
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
    });
  }

  addStatus (title) {
    this.statuses.push(new StatusModel(this, uniqueId, title, false));
  }

  toggleAll (checked) {
    this.statuses.forEach(
      status => status.friend = checked
    );
  }

  toJS() {
    return this.statuses.map(status => status.toJS());
  }

  static fromJS(array) {
    const statusStore = new StatusStore();

    statusStore.statuses = array.map(item => StatusModel.fromJS(statusStore, item));

    return statusStore;
  }
}
