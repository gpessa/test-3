import React, {PropTypes} from 'react';
import Button             from 'react-bootstrap/lib/Button';
import Grid               from 'react-bootstrap/lib/Grid';
import Col                from 'react-bootstrap/lib/Col';
import Row                from 'react-bootstrap/lib/Row';
import FileList           from './FileList.jsx';
import HtmlEditor         from './HtmlEditor.jsx';
import Upload             from './Upload.jsx';
import ImagePreview       from './ImagePreview.jsx';

export default React.createClass({
  propTypes: {
    files: PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      files: []
    }
  },

  render() {
    let {files} = this.props;

    return (
      <div>
        <div className="container">
          <FileList files={files}></FileList>
        </div>

        <Grid>
          <Row>
            <Col md={3}>
              <Button bsStyle="primary" block disabled>File List</Button>
            </Col>

            <Col md={3}>
              <Button bsStyle="primary" block disabled>Bookmarks</Button>
            </Col>

            <Col md={3}>
              <HtmlEditor/>
            </Col>

            <Col md={3}>
              <Upload/>
            </Col>
          </Row>
        </Grid>

        <ImagePreview/>
      </div>
    );
  }
});
