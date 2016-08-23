import {observable} from 'mobx';

export default class StatusModel {
  store;
  id;
  @observable title;
  @observable friend;

  constructor(store, id, title, friend) {
    this.store = store;
    this.id = id;
    this.title = title;
    this.friend = friend;
  }

  toggle() {
    this.friend = !this.friend;
  }

  destroy() {
    this.store.statuses.remove(this);
  }

  setTitle(title) {
    this.title = title;
  }

  toJS() {
    return {
      id: this.id,
      title: this.title,
      friend: this.friend
    };
  }

  static fromJS(store, object) {
    return new StatusModel(store, object.id, object.title, object.friend);
  }
}
