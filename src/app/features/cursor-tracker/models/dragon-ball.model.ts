export type DragonBallLocation = "field" | "rock" | "bush" | "house";

export interface DragonBall {
  id: number;
  stars: number;
  x: number;
  y: number;
  size: number;
  collected: boolean;
  location: DragonBallLocation;
}
