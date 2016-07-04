import React        from 'react';
import File         from './File.jsx';
import Sort         from './Sort.jsx';
import Alert        from 'react-bootstrap/lib/Alert';
import Table        from 'react-bootstrap/lib/Table';
import FormGroup    from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export default React.createClass({

  getDefaultProps() {
    return {
      files: []
    };
  },

  getInitialState() {
    return {
      sortProperty : 'name',
      filter : ''
    }
  },

  onSortSelect(property){
    this.setState({ sortProperty: property });
  },

  onFilter(evt){
    this.setState({ filter: evt.target.value });
  },

  render() {
    let {files} = this.props;
    let {sortProperty, filter} = this.state;

    if (files.length === 0) {
      return (
        <Alert bsStyle="warning">
          <strong>You have no files</strong>, Create some using the Create New or the Upload button below.
        </Alert>
      );
    }

    return (
      <div>
        <FormGroup>
          <ControlLabel>Filter by name</ControlLabel>
          <FormControl
            type="text"
            value={filter}
            onChange={this.onFilter}
          />
        </FormGroup>

        <Table hover>
          <thead>
            <tr>
              <th>File Name <Sort property={'name'} selected={sortProperty} onSelect={this.onSortSelect}></Sort></th>
              <th>File Type <Sort property={'type'} selected={sortProperty} onSelect={this.onSortSelect}></Sort></th>
              <th>Size (kb) <Sort property={'size'} selected={sortProperty} onSelect={this.onSortSelect}></Sort></th>
            </tr>
          </thead>
          <tbody>
            {files
              .sort((a, b) => a[sortProperty] > b[sortProperty])
              .filter(file => file.name.indexOf(filter) != -1)
              .map((file, index) => <File file={file} key={index}/>)}
          </tbody>
        </Table>
      </div>
    );
  }
});
