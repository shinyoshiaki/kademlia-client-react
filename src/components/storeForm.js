import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import Kademlia from "kad-rtc";
import sha1 from "sha1";

let send = "";

export default class StoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = { key: undefined };
  }

  handleStore(kad = new Kademlia()) {
    kad.store(kad.nodeId, sha1(send), send);
    this.setState({ key: sha1(send) });
  }

  render() {
    const { kad } = this.props;
    return (
      <div style={{ margin: "20px" }}>
        Store
        <TextField label="store" onChange={e => (send = e.target.value)} />
        <Button onClick={() => this.handleStore(kad)}>store</Button>
        {this.state.key}
      </div>
    );
  }
}

export function createStoreForm(kad = new Kademlia()) {
  return <StoreForm kad={kad} />;
}
