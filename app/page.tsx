"use client";

import React, { useState, useCallback } from "react";
import { GameHeader } from "./components/game/GameHeader";
import { WelcomeCard } from "./components/game/WelcomeCard";
import { ScenarioCard } from "./components/game/ScenarioCard";
import { ImpactCard } from "./components/game/ImpactCard";
import { GameOverCard } from "./components/game/GameOverCard";
import { Planet } from "./components/three/Planet";
import {
  INITIAL_METRICS,
  MIN_SCORE,
  SCENARIOS,
  RANDOM_EVENTS,
} from "./constants/game";
import type {
  Metrics,
  Option,
  GameState,
  GameStatus,
  RandomEvent,
  Impact,
  LastSelection,
} from "./types/game";

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>("welcome");
  const [randomEvent, setRandomEvent] = useState<RandomEvent | null>(null);
  const [lastImpact, setLastImpact] = useState<Impact | null>(null);
  const [lastSelection, setLastSelection] = useState<LastSelection | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);

  const checkGameStatus = useCallback(
    (newMetrics: Metrics, step: number): GameStatus => {
      if (
        newMetrics.Société <= MIN_SCORE ||
        newMetrics.Environnement <= MIN_SCORE ||
        newMetrics.Economie <= MIN_SCORE
      ) {
        return {
          status: "gameover",
          type: "scandal",
          message: "Échec critique ! Le village a perdu ses valeurs NIRD.",
        };
      }
      if (step >= SCENARIOS.length) {
        const avg =
          (newMetrics.Société +
            newMetrics.Environnement +
            newMetrics.Economie) /
          3;
        if (avg >= 75)
          return {
            status: "win",
            type: "master",
            message:
              "Victoire ! Votre village est un modèle de résistance numérique !",
          };
        return {
          status: "win",
          type: "average",
          message:
            "Le village survit, mais la dépendance aux Big Tech reste présente.",
        };
      }
      return { status: "playing" };
    },
    []
  );

  const handleChoice = (option: Option): void => {
    let newMetrics = { ...metrics };
    const impact = option.impact;

    Object.keys(impact).forEach((key) => {
      const metricKey = key as keyof Metrics;
      const impactValue = impact[metricKey] || 0;
      newMetrics[metricKey] = Math.max(
        0,
        Math.min(100, newMetrics[metricKey] + impactValue)
      );
    });

    setLastImpact(impact);
    setLastSelection({
      feedback: option.feedback,
      reaction: option.userReaction,
    });

    let statusCheck = checkGameStatus(newMetrics, currentStep);

    if (statusCheck.status !== "playing") {
      setMetrics(newMetrics);
      setGameState(statusCheck.status);
      setLastSelection((prev) => ({
        ...prev!,
        endTitle: statusCheck.type === "win" ? "Mission Terminée" : "Game Over",
        endMsg: statusCheck.message,
      }));
      return;
    }

    let event: RandomEvent | null = null;
    if (Math.random() < 0.3) {
      const possibleEvents = RANDOM_EVENTS.filter((e) =>
        e.condition(newMetrics)
      );
      if (possibleEvents.length > 0) {
        event =
          possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
        Object.keys(event.impact).forEach((key) => {
          const metricKey = key as keyof Metrics;
          const impactValue = event!.impact[metricKey] || 0;
          newMetrics[metricKey] = Math.max(
            0,
            Math.min(100, newMetrics[metricKey] + impactValue)
          );
        });
        setRandomEvent(event);

        statusCheck = checkGameStatus(newMetrics, currentStep);
        if (statusCheck.status !== "playing") {
          setGameState(statusCheck.status);
          setLastSelection((prev) => ({
            ...prev!,
            endTitle:
              statusCheck.type === "win" ? "Mission Terminée" : "Game Over",
            endMsg: statusCheck.message,
          }));
        }
      }
    }

    setMetrics(newMetrics);
    setGameState("paused");
  };

  const nextPhase = (): void => {
    setRandomEvent(null);
    setLastImpact(null);
    setLastSelection(null);

    if (currentStep + 1 >= SCENARIOS.length) {
      const statusCheck = checkGameStatus(metrics, SCENARIOS.length);
      setGameState(statusCheck.status);
      setLastSelection((prev) => ({
        ...prev!,
        endTitle:
          statusCheck.type === "master" ? "Mission Terminée" : "Fin de partie",
        endMsg: statusCheck.message,
      }));
    } else {
      setCurrentStep((p) => p + 1);
      setGameState("playing");
    }
  };

  const resetGame = (): void => {
    setMetrics(INITIAL_METRICS);
    setCurrentStep(0);
    setGameState("welcome");
    setRandomEvent(null);
    setLastImpact(null);
    setLastSelection(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <GameHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center">
          <div className="order-2 lg:order-1">
            <Planet
              treeDensity={metrics.Environnement / 100}
              houseDensity={metrics.Société / 100}
              buildingDensity={metrics.Economie / 100}
              isDragging={isDragging}
            />
          </div>

          <div className="order-1 lg:order-2 relative min-h-[400px]">
            {gameState === "welcome" ? (
              <WelcomeCard onStart={() => setGameState("playing")} />
            ) : gameState === "playing" ? (
              <ScenarioCard
                scenario={SCENARIOS[currentStep]}
                currentStep={currentStep}
                totalScenarios={SCENARIOS.length}
                onChoice={handleChoice}
                onDragStateChange={setIsDragging}
              />
            ) : (
              <>
                {gameState === "gameover" || gameState === "win" ? (
                  <GameOverCard
                    gameState={gameState}
                    endTitle={lastSelection?.endTitle}
                    endMessage={lastSelection?.endMsg}
                    metrics={metrics}
                    onReset={resetGame}
                  />
                ) : (
                  <ImpactCard
                    feedback={lastSelection?.feedback}
                    userReaction={lastSelection?.reaction}
                    impact={lastImpact}
                    randomEvent={randomEvent}
                    onNext={nextPhase}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
