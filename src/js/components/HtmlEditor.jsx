import React from 'react';
import * as FileActions from '../actions/FileActions';
import FileStore from '../stores/FileStore';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';
import ReactQuill from 'react-quill';

export default React.createClass({
  getInitialState() {
    return {show: false};
  },

  componentWillMount() {
    FileStore.on('preview_html', file => {
      this.setState({file});
      this.showModal();
    });
  },

  onTextChange(content) {
    this.state.file.content = content;
    this.setState(this.state);
  },

  handleChangeName(e) {
    this.state.file.name = e.target.value;
    this.setState(this.state);
  },

  showModal() {
    this.setState({show: true});
  },

  hideModal() {
    this.setState({show: false, file: {}});
  },

  onSave() {
    this.state.file.type = "text/html";
    FileActions.saveFile(this.state.file);
    this.hideModal();
  },

  render() {
    this.state.file = this.state.file || {};
    this.state.file.content = this.state.file.content || '';
    let {content, name} = this.state.file;

    return (
      <div>
        <Button block onClick={this.showModal} bsStyle="primary">Create New</Button>

        <Modal bsSize="large" show={this.state.show} onHide={this.hideModal}>
          <Modal.Header>
            <Modal.Title>Edit Page</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup >
                <FormControl type="text" value={name} placeholder="File name" onChange={this.handleChangeName}/>
              </FormGroup>
            </form>
            <ReactQuill theme="snow" value={content} onChange={this.onTextChange}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onSave} bsStyle="primary">Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
