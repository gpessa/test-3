import React     from 'react';
import FileStore from '../stores/FileStore';
import App       from './App.jsx';
import Modal     from 'react-bootstrap/lib/Modal';
import Button    from 'react-bootstrap/lib/Button';
import Image     from 'react-bootstrap/lib/Image';

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

  componentWillMount() {
    FileStore.on('preview_image', (file) => {
      this.setState({file: file});
      this.showModal();
    });
  },

  render() {
    this.state.file = this.state.file || {};
    this.state.file.content = this.state.file.content || '';
    let {content} = this.state.file;

    return (
      <Modal bsSize="large" show={this.state.show} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={content} responsive/>
        </Modal.Body>
      </Modal>
    );
  }

});
