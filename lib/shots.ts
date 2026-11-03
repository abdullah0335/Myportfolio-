import raw from "./shots.json";

export type Shot = { src: string; width: number; height: number };
export type ProjectShots = { hero?: Shot; full?: Shot; mobile?: Shot; thumb?: Shot };

const SHOTS = raw as Record<string, ProjectShots>;

export const getShots = (slug: string): ProjectShots => SHOTS[slug] ?? {};
