import dispatcher     from '../Dispatcher';
import {EventEmitter} from 'events';
import Constants      from '../Constants';

class FileStore extends EventEmitter {
  constructor() {
    super()

    this.files = localStorage.mobilebridge ? JSON.parse(localStorage.mobilebridge) : [];
    dispatcher.register(this.handleActions.bind(this));
  }

  getSize(s) {
    return encodeURI(s).split(/%..|./).length - 1;
  }

  getFile(id) {
    return this.files.find(file => file.id == id);
  }

  getAll() {
    return this.files;
  }

  saveFiles() {
    localStorage.mobilebridge = JSON.stringify(this.files);
    this.emit('change');
  }

  saveFile(file) {
    let isUpdate = !!file.id;
    let storeMethod = isUpdate ? 'updateFile' : 'createFile';

    this[storeMethod](file);
  }

  updateFile(file) {
    file.size = file.size || this.getSize(file.content);

    let index = this.files.indexOf(file);
    this.files[index] = file;

    this.saveFiles();
  }

  createFile(file) {
    file.size = file.size || this.getSize(file.content);
    file.id = new Date();

    this.files.push(file);

    this.saveFiles();
  }

  previewHtml(file) {
    this.emit('preview_html', file)
  }

  previewImage(file) {
    this.emit('preview_image', file)
  }

  handleActions(action) {
    switch (action.type) {
      case Constants.SAVE_FILE:
        this.saveFile(action.file)
        break;

      case Constants.PREVIEW_HTML:
        this.previewHtml(action.file)
        break;

      case Constants.PREVIEW_IMAGE:
        this.previewImage(action.file)
        break;
    }
  }
};

const fileStore = new FileStore;
export default fileStore;
