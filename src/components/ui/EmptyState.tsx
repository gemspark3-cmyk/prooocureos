import React from 'react'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center glass-premium rounded-[3rem] border border-white/5">
      <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6 text-zinc-700">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">{title}</h3>
      <p className="text-zinc-500 text-sm font-medium max-w-sm mx-auto mb-8">
        {description}
      </p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
