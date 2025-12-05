import React, { useState, useRef, useEffect } from "react";
import { Server, ArrowRight, GripVertical } from "lucide-react";
import { Card } from "../ui/Card";
import type { Scenario, Option } from "../../types/game";
import { createPortal } from "react-dom";

interface ScenarioCardProps {
  scenario: Scenario;
  currentStep: number;
  totalScenarios: number;
  onChoice: (option: Option) => void;
  onDragStateChange?: (isDragging: boolean) => void;
}

interface DraggableOptionProps {
  option: Option;
  index: number;
  onDrop: (option: Option) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const DraggableOption: React.FC<DraggableOptionProps> = ({
  option,
  index,
  onDrop,
  onDragStart,
  onDragEnd,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    setSize({ width: rect.width, height: rect.height });
    setPosition({ x: rect.left, y: rect.top });
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setIsDragging(true);
    onDragStart();

    // Capture pointer to ensure we get move/up events even if cursor leaves element
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    onDragEnd();
    (e.target as Element).releasePointerCapture(e.pointerId);

    // Check if dropped on planet
    const planetContainer = document.getElementById("planet-container");
    if (planetContainer) {
      const planetRect = planetContainer.getBoundingClientRect();
      if (
        e.clientX >= planetRect.left &&
        e.clientX <= planetRect.right &&
        e.clientY >= planetRect.top &&
        e.clientY <= planetRect.bottom
      ) {
        onDrop(option);
      }
    }
  };

  const content = (
    <div className="flex gap-4 items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
          isDragging
            ? "bg-orange-500 text-white"
            : "bg-slate-800 text-gray-400 group-hover:bg-orange-500 group-hover:text-white"
        }`}
      >
        {isDragging ? <GripVertical size={16} /> : index + 1}
      </div>
      <span
        className={`flex-1 font-medium transition-colors ${
          isDragging ? "text-white" : "text-gray-200 group-hover:text-white"
        }`}
      >
        {option.text}
      </span>
      {!isDragging && (
        <ArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
      )}
    </div>
  );

  return (
    <>
      <div
        ref={ref}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`w-full group text-left p-5 rounded-2xl border transition-all duration-300 cursor-grab active:cursor-grabbing touch-none select-none ${
          isDragging
            ? "opacity-0"
            : "bg-white/5 border-white/5 hover:bg-linear-to-r hover:from-orange-500/10 hover:to-red-500/10 hover:border-orange-500/30"
        }`}
      >
        {content}
      </div>

      {isDragging &&
        createPortal(
          <div
            ref={dragRef}
            style={{
              position: "fixed",
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
              zIndex: 9999,
              pointerEvents: "none", // Let events pass through to the captured element
            }}
            className="p-5 rounded-2xl bg-slate-900 border border-orange-500 shadow-2xl shadow-orange-500/20 flex items-center"
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  currentStep,
  totalScenarios,
  onChoice,
  onDragStateChange,
}) => (
  <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-t-4 border-t-orange-500">
    <div className="flex justify-between items-center mb-4">
      <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-bold text-orange-400 border border-slate-700 flex items-center gap-2">
        <Server size={14} /> {scenario.phase}
      </span>
      <span className="text-xs font-mono text-gray-600">
        MISSION {currentStep + 1}/{totalScenarios}
      </span>
    </div>

    <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
      {scenario.context}
    </h2>

    <div className="space-y-3 mt-8">
      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-2 flex items-center gap-2">
        <GripVertical size={14} /> Glissez votre choix vers la planète
      </p>
      {scenario.options.map((opt, i) => (
        <DraggableOption
          key={i}
          index={i}
          option={opt}
          onDrop={onChoice}
          onDragStart={() => onDragStateChange?.(true)}
          onDragEnd={() => onDragStateChange?.(false)}
        />
      ))}
    </div>
  </Card>
);
