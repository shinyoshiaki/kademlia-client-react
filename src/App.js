import React, { Component } from "react";
import Node from "kad-rtc/lib/node/node";
import { createNodeList } from "./components/nodeList";
import { createStoreForm } from "./components/storeForm";
import { createFindvalueForm } from "./components/findvalueForm";
// import { createKeyValueList } from "./components/keyValueList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { kbuckets: undefined };

    //localhost:20000のポータルノードに接続
    this.node = new Node("localhost", "20000");
    const kad = this.node.kad;
    //ノードが追加された際のコールバック
    kad.callback.onAddPeer = data => {
      console.log({ data });
      this.setState({ kbuckets: kad.kbuckets });
    };
  }

  render() {
    return (
      <div>
        {/* ノードID */}
        {this.node.kad.nodeId}
        {/* Kbucketsの状態 */}
        {createNodeList(this.state.kbuckets)}
        {/* KademliaのStore */}
        {createStoreForm(this.node.kad)}
        {/* KademliaのFindvalue */}
        {createFindvalueForm(this.node.kad)}
        {/* KademliaのKeyValueList */}
        {/* {createKeyValueList(this.node.kad)} */}
      </div>
    );
  }
}

export default App;
