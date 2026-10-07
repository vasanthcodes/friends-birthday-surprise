export type PiecePosition = { x: number; y: number };

export interface PuzzleRoomState {
  imageId: string;
  difficulty: 16 | 25;
  pieces: Record<string, PiecePosition>;
  updatedAt: number;
}

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const roomSyncEnabled = Boolean(url && anonKey);

const headers = () => ({
  apikey: anonKey || "",
  Authorization: `Bearer ${anonKey || ""}`,
  "Content-Type": "application/json",
});

export async function createPuzzleRoom(roomId: string, state: PuzzleRoomState) {
  if (!roomSyncEnabled) return;
  const response = await fetch(`${url}/rest/v1/puzzle_rooms`, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify({ id: roomId, state }),
  });
  if (!response.ok && response.status !== 409) throw new Error("Could not create the room.");
}

export async function getPuzzleRoom(roomId: string): Promise<PuzzleRoomState | null> {
  if (!roomSyncEnabled) return null;
  const response = await fetch(`${url}/rest/v1/puzzle_rooms?id=eq.${encodeURIComponent(roomId)}&select=state`, { headers: headers() });
  if (!response.ok) throw new Error("Could not find that room.");
  const rooms = await response.json() as Array<{ state: PuzzleRoomState }>;
  return rooms[0]?.state ?? null;
}

export async function savePuzzleRoom(roomId: string, state: PuzzleRoomState) {
  if (!roomSyncEnabled) return;
  const response = await fetch(`${url}/rest/v1/puzzle_rooms?id=eq.${encodeURIComponent(roomId)}`, {
    method: "PATCH",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify({ state }),
  });
  if (!response.ok) throw new Error("Could not save the puzzle.");
}
