import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import Kademlia from "kad-rtc";

export default class KeyValueList extends Component {
  constructor(props) {
    super(props);
    this.state = { kvs: [] };
  }

  componentDidMount() {
    const { kad } = this.props;
    this.init(kad);
  }

  init(kad = new Kademlia()) {
    kad.callback.onStore = kvs => {
      console.log("cb onstore", kvs);
      const arr = [];
      Object.keys(kvs).forEach(key => {
        arr.push(key + " : " + kvs[key]);
      });
      this.setState({ kvs: arr });
    };
  }

  render() {
    return (
      <div style={{ margin: "20px" }}>
        KeyValueList
        <br />
        {this.state.kvs.map(v => {
          return (
            <div>
              {v}
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export function createKeyValueList(kad = new Kademlia()) {
  return <KeyValueList kad={kad} />;
}
