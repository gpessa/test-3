import React  from 'react';
import Button from 'react-bootstrap/lib/Button';

export default React.createClass({

  onSelect() {
    this.props.onSelect(this.props.property);
  },

  render() {
    let buttonClassNames = this.props.property == this.props.selected ? ' active' : '';

    return (
      <Button bsStyle="link" bsSize="xsmall" onClick={this.onSelect} className={'sort' + buttonClassNames}>▼</Button>
    )
  }

});
