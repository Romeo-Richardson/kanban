import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1654741",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
  cluster: "us3",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY!,
  {
    cluster: "us3",
  }
);
