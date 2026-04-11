import { NextResponse } from "next/server";

const PLACE_IDS = [7991339063, 9054723407, 13689905003, 13603968116, 114423466246116];

async function getUniverseId(placeId: number): Promise<number | null> {
  const res = await fetch(
    `https://apis.roblox.com/universes/v1/places/${placeId}/universe`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.universeId ?? null;
}

async function getGameDetails(universeIds: number[]) {
  const ids = universeIds.join(",");
  const res = await fetch(
    `https://games.roblox.com/v1/games?universeIds=${ids}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.data ?? [];
}

async function getThumbnails(universeIds: number[]) {
  const ids = universeIds.join(",");
  const res = await fetch(
    `https://thumbnails.roblox.com/v1/games/icons?universeIds=${ids}&size=512x512&format=Png&isCircular=false`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.data ?? [];
}

export async function GET() {
  const universeIds = (
    await Promise.all(PLACE_IDS.map(getUniverseId))
  ).filter((id): id is number => id !== null);

  if (universeIds.length === 0) {
    return NextResponse.json({ games: [] });
  }

  const [details, thumbs] = await Promise.all([
    getGameDetails(universeIds),
    getThumbnails(universeIds),
  ]);

  const thumbMap = Object.fromEntries(
    thumbs.map((t: { targetId: number; imageUrl: string }) => [t.targetId, t.imageUrl])
  );

  const games = details.map((g: {
    id: number;
    name: string;
    description: string;
    visits: number;
    favoritedCount: number;
    playing: number;
    maxPlayers: number;
    genre: string;
    rootPlaceId: number;
    totalUpVotes: number;
    totalDownVotes: number;
  }) => ({
    universeId: g.id,
    name: g.name,
    description: g.description,
    visits: g.visits,
    favoritedCount: g.favoritedCount,
    playing: g.playing,
    maxPlayers: g.maxPlayers,
    genre: g.genre,
    rootPlaceId: g.rootPlaceId,
    totalUpVotes: g.totalUpVotes,
    totalDownVotes: g.totalDownVotes,
    thumbnail: thumbMap[g.id] ?? null,
    url: `https://www.roblox.com/games/${g.rootPlaceId}`,
  }));

  return NextResponse.json({ games });
}
