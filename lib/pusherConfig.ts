import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1654741",
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "us3",
  useTLS: true,
});

export const pusherClient = new PusherClient(process.env.PUSHER_KEY!, {
  cluster: "us3",
});
