import React            from 'react';
import * as FileActions from '../actions/FileActions';

export default React.createClass({
  previewFile() {
    FileActions.previewFile(this.props.file);
  },

  render() {
    let {file} = this.props;

    return (
      <tr onClick={this.previewFile} className="file">
        <td>{file.name}</td>
        <td>{file.type}</td>
        <td>{file.size}</td>
      </tr>
    );
  }
});
