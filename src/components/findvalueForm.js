import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import Kademlia from "kad-rtc";

let word = "";

export default class FindvalueForm extends Component {
  constructor(props) {
    super(props);
    this.state = { result: undefined };
  }

  async handleFindValue(kad = new Kademlia()) {
    const result = await kad.findValue(word);
    this.setState({ result: result });
  }

  render() {
    const { kad } = this.props;
    return (
      <div style={{ margin: "20px" }}>
        FindValue
        <TextField label="findvalue" onChange={e => (word = e.target.value)} />
        <Button onClick={() => this.handleFindValue(kad)}>findvalue</Button>
        {this.state.result}
      </div>
    );
  }
}

export function createFindvalueForm(kad = new Kademlia()) {
  return <FindvalueForm kad={kad} />;
}
