import raw from "./shots.json";
import { asset } from "./site";

export type Shot = { src: string; width: number; height: number };
export type ProjectShots = {
  hero?: Shot;
  full?: Shot;
  mobile?: Shot;
  thumb?: Shot;
  /** Ordered step-by-step screenshots (e.g. a booking flow). */
  steps?: Shot[];
};

const SHOTS = raw as Record<string, ProjectShots>;

const withBase = (shot: Shot): Shot => ({ ...shot, src: asset(shot.src) });

/** Screenshot set for a project, with sources prefixed for the deploy base path. */
export const getShots = (slug: string): ProjectShots => {
  const { steps, ...single } = SHOTS[slug] ?? {};
  const out = Object.fromEntries(
    Object.entries(single).map(([kind, shot]) => [kind, withBase(shot as Shot)])
  ) as ProjectShots;
  if (steps) out.steps = steps.filter(Boolean).map(withBase);
  return out;
};
