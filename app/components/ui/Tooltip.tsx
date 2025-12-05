import React, { useState, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  title?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  title,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    setTimeout(() => setShowTooltip(false), 200);
  };

  return (
    <div className="relative">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {showTooltip && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`absolute right-0 top-full mt-2 w-72 p-4 bg-slate-800 border border-slate-500/30 rounded-xl shadow-xl z-50 transition-all duration-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          {title && (
            <h3 className="font-bold text-slate-300 mb-2 text-sm">{title}</h3>
          )}
          <div className="text-xs text-gray-300 leading-relaxed">{content}</div>
        </div>
      )}
    </div>
  );
};
