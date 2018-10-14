import React, { Component } from "react";
import Node from "./node/Node";
import { createNodeList } from "./components/nodeList";
import { createStoreForm } from "./components/storeForm";
import { createFindvalueForm } from "./components/findvalueForm";
import { Divider } from "@material-ui/core";
import { createKeyValueList } from "./components/keyValueList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { kbuckets: undefined };

    this.node = new Node("localhost", "20000");
    const kad = this.node.kad;
    kad.callback.onAddPeer = data => {
      console.log({ data });
      this.setState({ kbuckets: kad.kbuckets });
    };
  }

  render() {
    return (
      <div>
        {this.node.kad.nodeId}
        {createNodeList(this.state.kbuckets)}
        {createStoreForm(this.node.kad)}
        {createFindvalueForm(this.node.kad)}
        {createKeyValueList(this.node.kad)}
      </div>
    );
  }
}

export default App;
