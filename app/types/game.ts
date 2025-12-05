export interface Metrics {
  Société: number;
  Environnement: number;
  Economie: number;
}

export interface Impact {
  Environnement?: number;
  Société?: number;
  Economie?: number;
}

export interface Option {
  text: string;
  impact: Impact;
  feedback: string;
  userReaction: string;
}

export interface Scenario {
  phase: string;
  context: string;
  options: Option[];
}

export interface RandomEvent {
  title: string;
  description: string;
  condition: (metrics: Metrics) => boolean;
  impact: Impact;
  type: "good" | "bad";
}

export interface GameStatus {
  status: "playing" | "gameover" | "win";
  type?: string;
  message?: string;
}

export interface LastSelection {
  feedback: string;
  reaction: string;
  endTitle?: string;
  endMsg?: string;
}

export type GameState = "welcome" | "playing" | "paused" | "gameover" | "win";

export type MetricColor = "red" | "green" | "orange" | "blue";
