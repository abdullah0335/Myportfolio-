import raw from "./shots.json";
import { asset } from "./site";

export type Shot = { src: string; width: number; height: number };
export type ProjectShots = { hero?: Shot; full?: Shot; mobile?: Shot; thumb?: Shot };

const SHOTS = raw as Record<string, ProjectShots>;

/** Screenshot set for a project, with sources prefixed for the deploy base path. */
export const getShots = (slug: string): ProjectShots => {
  const set = SHOTS[slug] ?? {};
  return Object.fromEntries(
    Object.entries(set).map(([kind, shot]) => [kind, { ...shot, src: asset(shot.src) }])
  ) as ProjectShots;
};
