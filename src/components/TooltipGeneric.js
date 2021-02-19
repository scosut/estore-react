import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

class TooltipGeneric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    }
  }

  toggle() {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  }

  render() {
    const { container, placement, target } = this.props;

    return (
      <Tooltip placement={placement} isOpen={this.state.tooltipOpen} container={container} target={target} toggle={() => this.toggle()}>
        {this.props.text}
      </Tooltip>
    )
  }
}

export default TooltipGeneric;