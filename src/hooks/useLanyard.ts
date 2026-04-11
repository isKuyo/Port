"use client";

import { useEffect, useState } from "react";

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    global_name: string | null;
    display_name: string | null;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: Activity[];
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
}

export interface Activity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
}

export interface SpotifyData {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  track_id: string;
  timestamps: { start: number; end: number };
}

const DISCORD_ID = "1088946006663630969";

export function useLanyard() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let ws: WebSocket;
    let heartbeatInterval: ReturnType<typeof setInterval>;

    function connect() {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.onopen = () => {
        setConnected(true);
      };

      ws.onmessage = (event) => {
        const payload = JSON.parse(event.data);

        if (payload.op === 1) {
          heartbeatInterval = setInterval(() => {
            ws.send(JSON.stringify({ op: 3 }));
          }, payload.d.heartbeat_interval);

          ws.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: DISCORD_ID },
            })
          );
        }

        if (payload.op === 0) {
          if (payload.t === "INIT_STATE" || payload.t === "PRESENCE_UPDATE") {
            setData(payload.d);
          }
        }
      };

      ws.onclose = () => {
        setConnected(false);
        clearInterval(heartbeatInterval);
        setTimeout(connect, 3000);
      };

      ws.onerror = () => {
        ws.close();
      };
    }

    connect();

    return () => {
      clearInterval(heartbeatInterval);
      ws?.close();
    };
  }, []);

  return { data, connected };
}
