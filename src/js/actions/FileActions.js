import dispatcher from '../Dispatcher';
import Constants from '../Constants';

export function previewFile(file) {
  let isHtml = file.type.indexOf('html') != -1;

  if(isHtml ){
    dispatcher.dispatch({
      type: Constants.PREVIEW_HTML,
      file
    });
  } else {
    dispatcher.dispatch({
      type: Constants.PREVIEW_IMAGE,
      file
    });
  }
}

export function saveFile(file) {
  dispatcher.dispatch({
    type: Constants.SAVE_FILE,
    file
  });
}
