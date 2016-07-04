import React            from 'react';
import * as FileActions from '../actions/FileActions';
import Button           from 'react-bootstrap/lib/Button';
import FileStore        from '../stores/FileStore';
import ButtonGroup      from 'react-bootstrap/lib/ButtonGroup';
import Modal            from 'react-bootstrap/lib/Modal';
import Dropzone         from 'react-dropzone';

export default React.createClass({
  getInitialState() {
    return {show: false};
  },

  showModal() {
    this.setState({show: true});
  },

  hideModal() {
    this.setState({show: false});
  },

  onDrop: function(files) {
    let file, reader, method; 

    file = files[0];
    reader = new FileReader();

    reader.onload = (theFile => {
      return (e) => {
        FileActions.saveFile({
          name: file.name,
          type: file.type,
          size: file.size,
          content: e.target.result
        });
      };
    })(file);

    method = {
      "text/html": 'readAsText',
      "image/jpeg": 'readAsDataURL'
    }[file.type];

    reader[method](file);

    this.hideModal();
  },

  render() {
    return (
      <div>
        <Button block onClick={this.showModal} bsStyle="primary">Upload</Button>

        <Modal {...this.props} show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Upload File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Dropzone onDrop={this.onDrop} multiple={false} accept="text/html, image/gif, image/jpeg" className="dropzone">
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
});
