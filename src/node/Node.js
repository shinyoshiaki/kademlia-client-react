import WebRTC from "webrtc4me";
import client from "socket.io-client";
import Kademlia from "kad-rtc";
import sha1 from "sha1";

const def = {
  OFFER: "OFFER",
  ANSWER: "ANSWER",
  ONCOMMAND: "ONCOMMAND"
};

let peerOffer;

export default class Node {
  constructor(targetAddress, targetPort) {
    this.targetUrl;
    if (targetAddress) {
      this.targetUrl = "http://" + targetAddress + ":" + targetPort;
      console.log(this.targetUrl);
    }
    this.nodeId = sha1(Math.random().toString());
    console.log("nodeId", this.nodeId);

    this.kad = new Kademlia(this.nodeId, { kLength: 20 });

    if (this.targetUrl) {
      const socket = client.connect(this.targetUrl);

      socket.on("connect", () => {
        console.log("socket connected");
        this.offerFirst(socket);
      });

      socket.on(def.ANSWER, data => {
        console.log("answer id", data.nodeId);
        peerOffer.nodeId = data.nodeId;
        peerOffer.setAnswer(data.sdp);
      });
    }
  }

  offerFirst(socket) {
    console.log("@cli", "offer first");
    peerOffer = new WebRTC();
    peerOffer.makeOffer();

    peerOffer.signal = sdp => {
      socket.emit(def.OFFER, {
        type: def.OFFER,
        nodeId: this.nodeId,
        sdp: sdp
      });
    };

    peerOffer.connect = () => {
      console.log("first connected");
      this.kad.addknode(peerOffer);
    };
  }

  broadCast(data) {
    this.kApp.broadcast(data);
  }

  send(target, data) {
    this.kad.send(target, data);
  }
}
