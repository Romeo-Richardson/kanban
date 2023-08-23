import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1654741",
  key: "42e378a63c3df66fff67",
  secret: "37f8224741a0ed7a572a",
  cluster: "us3",
  useTLS: true,
});

export const pusherClient = new PusherClient("42e378a63c3df66fff67", {
  cluster: "us3",
});
