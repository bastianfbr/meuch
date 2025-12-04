import React from "react";
import { Users, Activity } from "lucide-react";

interface FeedbackToastProps {
  userReaction: string;
  feedback: string;
}

export const FeedbackToast: React.FC<FeedbackToastProps> = ({
  userReaction,
  feedback,
}) => (
  <div className="animate-in slide-in-from-bottom-5 fade-in duration-500">
    <div className="mb-4 bg-slate-800/50 border-l-4 border-orange-500 p-4 rounded-r-xl">
      <h4 className="flex items-center gap-2 font-bold text-orange-200 mb-1">
        <Activity size={16} /> Impact NIRD
      </h4>
      <p className="text-sm text-gray-300 italic">{feedback}</p>
    </div>
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4">
      <div className="bg-linear-to-br from-orange-500 to-red-600 w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
        <Users size={20} />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase">
          La Voix du Village
        </p>
        <p className="font-medium text-white">"{userReaction}"</p>
      </div>
    </div>
  </div>
);
