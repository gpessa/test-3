import React     from 'react';
import FileStore from '../stores/FileStore';
import App       from './App.jsx';

export default React.createClass({
  getInitialState() {
    return {
      files : FileStore.getAll()
    }
  },

  componentWillMount() {
    FileStore.on('change', () => {
      this.setState({
        files: FileStore.getAll()
      })
    });
  },

  render() {
    let {files} = this.state;
    return (<App files={files}/>);
  }
});
