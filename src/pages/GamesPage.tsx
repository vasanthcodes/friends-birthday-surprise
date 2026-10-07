import { Link, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, Copy, Heart, Link2, RefreshCw, Sparkles, Users, Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import goaPuzzle from "@/assets/Goa/goa 12.jpg";
import goa3 from "@/assets/Goa/goa 3.JPG";
import goa7 from "@/assets/Goa/goa 7.JPG";
import goa9 from "@/assets/Goa/goa 9.jpg";
import bngPuzzle from "@/assets/bangalore 19.JPG";
import bng5 from "@/assets/bangalore 5.JPG";
import bng12 from "@/assets/bangalore 12.JPG";
import bng22 from "@/assets/bangalore 22.JPG";
import { createPuzzleRoom, getPuzzleRoom, PuzzleRoomState, roomSyncEnabled, savePuzzleRoom } from "@/lib/puzzle-room";

type Picture = { id: string; name: string; note: string; src: string };
const pictures: Picture[] = [
  { id: "goa", name: "That Goa sunshine", note: "saltwater, soft skies, us", src: goaPuzzle },
  { id: "goa3", name: "Goa mornings", note: "slow and golden", src: goa3 },
  { id: "goa7", name: "By the water", note: "you and the waves", src: goa7 },
  { id: "goa9", name: "Saltwater days", note: "soaking it all in", src: goa9 },
  { id: "bengaluru", name: "Our Bengaluru", note: "home, but with you in it", src: bngPuzzle },
  { id: "bng5", name: "Bangalore walks", note: "bags, streets, us", src: bng5 },
  { id: "bng12", name: "City nights", note: "lights everywhere", src: bng12 },
  { id: "bng22", name: "Just us", note: "the simplest thing", src: bng22 },
];

const pieceId = (index: number) => `piece-${index}`;
const randomPositions = (count: number): PuzzleRoomState["pieces"] =>
  Object.fromEntries(Array.from({ length: count }, (_, i) => [pieceId(i), { x: 3 + ((i * 37) % 82), y: 8 + ((i * 53) % 78) }]));

const newState = (imageId: string, difficulty: 16 | 25): PuzzleRoomState => ({
  imageId,
  difficulty,
  pieces: randomPositions(difficulty),
  updatedAt: Date.now(),
});

const GamesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get("room");
  const [imageId, setImageId] = useState("goa");
  const [difficulty, setDifficulty] = useState<16 | 25>(16);
  const [game, setGame] = useState(() => newState("goa", 16));
  const [status, setStatus] = useState(roomId ? "Joining your little table…" : "Choose a memory, then start.");
  const syncing = useRef(false);
  const lastRemote = useRef(0);

  const picture = pictures.find((item) => item.id === game.imageId) ?? pictures[0];
  const columns = Math.sqrt(game.difficulty);
  const isRoom = Boolean(roomId);
  const completed = Object.entries(game.pieces).every(([id, position]) => {
    const index = Number(id.replace("piece-", ""));
    return Math.abs(position.x - (7 + (index % columns) * (86 / columns))) < 0.1 && Math.abs(position.y - (7 + Math.floor(index / columns) * (86 / columns))) < 0.1;
  });

  const reset = useCallback((nextImage = imageId, nextDifficulty = difficulty) => {
    setGame(newState(nextImage, nextDifficulty));
    setStatus("A fresh little mess of pieces, ready for you.");
  }, [difficulty, imageId]);

  const shufflePicture = useCallback(() => {
    const others = pictures.filter((p) => p.id !== imageId);
    const next = others[Math.floor(Math.random() * others.length)];
    setImageId(next.id);
    reset(next.id, difficulty);
    setStatus(`Shuffled to: ${next.name} ✨`);
  }, [imageId, difficulty, reset]);

  useEffect(() => {
    if (!roomId || !roomSyncEnabled) return;
    let active = true;
    getPuzzleRoom(roomId).then((remote) => {
      if (!active) return;
      if (remote) {
        lastRemote.current = remote.updatedAt;
        setImageId(remote.imageId);
        setDifficulty(remote.difficulty);
        setGame(remote);
        setStatus("You both have a seat at the table.");
      } else setStatus("This room is waiting to be created.");
    }).catch(() => setStatus("Couldn’t reach the room just yet."));
    const poll = window.setInterval(async () => {
      if (syncing.current) return;
      try {
        const remote = await getPuzzleRoom(roomId);
        if (remote && remote.updatedAt > lastRemote.current) {
          lastRemote.current = remote.updatedAt;
          setImageId(remote.imageId);
          setDifficulty(remote.difficulty);
          setGame(remote);
          setStatus("A piece just moved on their side.");
        }
      } catch { /* keep playing locally if a connection blips */ }
    }, 1100);
    return () => { active = false; window.clearInterval(poll); };
  }, [roomId]);

  const commit = useCallback(async (next: PuzzleRoomState) => {
    setGame(next);
    if (!roomId || !roomSyncEnabled) return;
    syncing.current = true;
    try { await savePuzzleRoom(roomId, next); lastRemote.current = next.updatedAt; }
    catch { setStatus("Your move is safe here; syncing will retry on the next move."); }
    finally { syncing.current = false; }
  }, [roomId]);

  const createRoom = async () => {
    const id = crypto.randomUUID().slice(0, 8);
    const state = newState(imageId, difficulty);
    if (roomSyncEnabled) {
      try { await createPuzzleRoom(id, state); }
      catch { setStatus("The room could not be created. Please try once more."); return; }
    }
    setGame(state);
    setSearchParams({ room: id });
    setStatus(roomSyncEnabled ? "Your table is ready — send the link to your favourite person." : "Your table is ready locally. Add Supabase to make the link live for both of you.");
  };

  const copyInvite = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setStatus("Invitation copied. Go pull them closer.");
  };

  const movePiece = (id: string, x: number, y: number) => {
    const next = { ...game, pieces: { ...game.pieces, [id]: { x: Math.max(0, Math.min(94, x)), y: Math.max(0, Math.min(94, y)) } }, updatedAt: Date.now() };
    commit(next);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#101526] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(244,151,105,.24),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(88,156,177,.25),transparent_34%),linear-gradient(145deg,#12182b,#20354b_54%,#14182d)]" />
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> back to our memories</Link>
        <div className="font-beach-day text-xl text-rose-100">Just Us, Playing</div>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-orange-200/80"><Heart className="h-3.5 w-3.5 fill-current" /> long-distance little things</p>
          <h1 className="font-beach-day text-5xl leading-[.95] text-white sm:text-7xl">A puzzle for the two of us.</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">Pick a memory, scatter it apart, then put it back together — from wherever we happen to be.</p>
        </div>


        {!isRoom && <div className="mb-8 grid gap-4 rounded-3xl border border-white/15 bg-white/[.07] p-5 backdrop-blur-md md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-white/50">Choose our picture</p>
            <div className="flex flex-wrap gap-3">{pictures.map((item) => <button key={item.id} onClick={() => { setImageId(item.id); reset(item.id, difficulty); }} className={`group overflow-hidden rounded-2xl border text-left transition ${imageId === item.id ? "border-orange-200 ring-2 ring-orange-200/35" : "border-white/15 opacity-70 hover:opacity-100"}`}><img src={item.src} alt="" className="h-20 w-28 object-cover" /><span className="block px-3 py-2 text-xs">{item.name}</span></button>)}</div>
          </div>
          <div><p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-white/50">Pieces</p><div className="flex gap-2">{([16, 25] as const).map((count) => <button key={count} onClick={() => { setDifficulty(count); reset(imageId, count); }} className={`rounded-full px-4 py-2 text-sm transition ${difficulty === count ? "bg-orange-200 text-slate-900" : "bg-white/10 text-white/75 hover:bg-white/20"}`}>{count} pieces</button>)}</div></div>
        </div>}

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-orange-100/80"><Sparkles className="mr-1.5 inline h-4 w-4" />{completed ? "We did it. Another memory, put back together. ♡" : status}</p><div className="flex gap-2">{isRoom ? <button onClick={copyInvite} className="inline-flex items-center gap-2 rounded-full bg-orange-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-orange-100"><Copy className="h-4 w-4" /> Copy our link</button> : <button onClick={createRoom} className="inline-flex items-center gap-2 rounded-full bg-orange-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-orange-100"><Users className="h-4 w-4" /> Set a table for two</button>}<button onClick={shufflePicture} className="rounded-full border border-white/15 p-2.5 text-white/75 hover:bg-white/10" aria-label="Shuffle picture" title="Random photo"><Shuffle className="h-4 w-4" /></button><button onClick={() => reset(game.imageId, game.difficulty)} className="rounded-full border border-white/15 p-2.5 text-white/75 hover:bg-white/10" aria-label="Reshuffle pieces" title="Reshuffle pieces"><RefreshCw className="h-4 w-4" /></button></div></div>

        <div className="grid gap-5 lg:grid-cols-[1fr_250px]">
          <PuzzleBoard game={game} picture={picture} columns={columns} onMove={movePiece} onPreview={(id, x, y) => setGame((current) => ({ ...current, pieces: { ...current.pieces, [id]: { x, y } } }))} />
          <aside className="rounded-3xl border border-white/15 bg-white/[.07] p-5 backdrop-blur-md"><p className="text-xs font-semibold uppercase tracking-[.18em] text-white/50">A small hint</p><img src={picture.src} alt={`Reference photo: ${picture.name}`} className="mt-4 aspect-square w-full rounded-2xl object-cover" /><h2 className="mt-4 font-beach-day text-3xl text-orange-100">{picture.name}</h2><p className="mt-1 text-sm text-white/60">{picture.note}</p><div className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/65"><Link2 className="mr-1 inline h-4 w-4 text-orange-200" />{roomSyncEnabled ? "Every move is shared with your room." : "Set up Supabase to share moves across the distance."}</div></aside>
        </div>
      </section>
    </main>
  );
};

const PuzzleBoard = ({ game, picture, columns, onMove, onPreview }: { game: PuzzleRoomState; picture: Picture; columns: number; onMove: (id: string, x: number, y: number) => void; onPreview: (id: string, x: number, y: number) => void }) => {
  const board = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; startX: number; startY: number; initialX: number; initialY: number } | null>(null);
  const startDrag = (event: PointerEvent, id: string) => {
    const position = game.pieces[id];
    drag.current = { id, startX: event.clientX, startY: event.clientY, initialX: position.x, initialY: position.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const endDrag = (event: PointerEvent) => {
    if (!drag.current || !board.current) return;
    const rect = board.current.getBoundingClientRect();
    const { id, startX, startY, initialX, initialY } = drag.current;
    let x = initialX + ((event.clientX - startX) / rect.width) * 100;
    let y = initialY + ((event.clientY - startY) / rect.height) * 100;
    const index = Number(id.replace("piece-", ""));
    const targetX = 7 + (index % columns) * (86 / columns);
    const targetY = 7 + Math.floor(index / columns) * (86 / columns);
    if (Math.hypot(x - targetX, y - targetY) < 7) { x = targetX; y = targetY; }
    onMove(id, x, y);
    drag.current = null;
  };
  const dragPiece = (event: PointerEvent) => {
    if (!drag.current || !board.current) return;
    const rect = board.current.getBoundingClientRect();
    const { id, startX, startY, initialX, initialY } = drag.current;
    onPreview(id, Math.max(0, Math.min(94, initialX + ((event.clientX - startX) / rect.width) * 100)), Math.max(0, Math.min(94, initialY + ((event.clientY - startY) / rect.height) * 100)));
  };
  return <div ref={board} className="relative aspect-square min-h-[320px] touch-none overflow-hidden rounded-3xl border border-white/20 bg-slate-950/55 shadow-2xl shadow-black/20">
    <div className="absolute inset-[7%] rounded-xl border border-dashed border-orange-100/35 bg-white/[.03]" />
    {Array.from({ length: game.difficulty }, (_, index) => { const position = game.pieces[pieceId(index)]; const row = Math.floor(index / columns); const col = index % columns; return <motion.button key={pieceId(index)} type="button" onPointerDown={(event) => startDrag(event, pieceId(index))} onPointerMove={dragPiece} onPointerUp={endDrag} whileTap={{ scale: 1.08 }} className="absolute z-10 cursor-grab rounded-[18%] border border-white/40 shadow-lg active:cursor-grabbing" style={{ left: `${position.x}%`, top: `${position.y}%`, width: `${100 / columns * .88}%`, aspectRatio: "1", backgroundImage: `url(${picture.src})`, backgroundSize: `${columns * 100}% ${columns * 100}%`, backgroundPosition: `${(col / (columns - 1)) * 100}% ${(row / (columns - 1)) * 100}%` }} aria-label={`Puzzle piece ${index + 1}`} />; })}
    <p className="absolute bottom-4 left-1/2 z-0 -translate-x-1/2 text-xs text-white/30">drag pieces around the table</p>
  </div>;
};

export default GamesPage;
