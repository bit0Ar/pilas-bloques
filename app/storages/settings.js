// app/storages/settings.js
import StorageObject from 'ember-local-storage/local/object';

const Storage = StorageObject.extend();

Storage.reopenClass({
  initialState() {
    return {
      desafio: '100'
    };
  }
});

export default Storage;