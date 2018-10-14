import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

export default class NodeList extends Component {
  render() {
    const { kbuckets } = this.props;
    const arr = {};
    console.log({ kbuckets });
    if (kbuckets)
      kbuckets.forEach((kbucket, i) => {
        if (kbucket.length > 0) {
          let line = "";
          kbucket.forEach(node => {
            line += node.nodeId + " , ";
          });
          arr[i] = line;
        }
      });
    return (
        <div style={{ margin: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>index</TableCell>
              <TableCell>nodes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(arr).map(key => {
              const kbucket = arr[key];
              return (
                <TableRow>
                  <TableCell>{key}</TableCell>
                  <TableCell>{kbucket}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export function createNodeList(kbuckets) {
  console.log({ kbuckets });
  return <NodeList kbuckets={kbuckets} />;
}
