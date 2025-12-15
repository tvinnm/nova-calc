import { useState } from 'react';
import { HistoryEntry } from '@/hooks/useCalculator';
import { cn } from '@/lib/utils';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryPanel({ history, onSelect, onClear, isOpen, onClose }: HistoryPanelProps) {
  const [search, setSearch] = useState('');

  const filteredHistory = history.filter(
    (entry) =>
      entry.expression.includes(search) || entry.result.includes(search)
  );

  if (!isOpen) return null;

  return (
    <div className="glass-panel p-4 animate-slide-in border-2 border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-secondary-foreground font-mono text-lg">
          HISTORY
        </div>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={onClear}
              className="px-3 py-1 bg-destructive text-destructive-foreground border-2 border-border font-mono text-sm"
              title="Clear history"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1 bg-secondary text-secondary-foreground border-2 border-border font-mono text-sm"
          >
            X
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-input border-2 border-border px-4 py-2 text-base focus:outline-none focus:border-accent font-mono text-black placeholder:text-gray-500"
        />
      </div>

      {/* History list */}
      <div className="max-h-[300px] overflow-y-auto space-y-2 scrollbar-thin">
        {filteredHistory.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-base font-mono">
            {history.length === 0 ? 'No history' : 'No matches'}
          </p>
        ) : (
          filteredHistory.map((entry, index) => (
            <button
              key={entry.id}
              onClick={() => onSelect(entry)}
              className={cn(
                'w-full text-left p-3',
                'bg-secondary border-2 border-border hover:bg-button-hover',
                'transition-all duration-100',
                'animate-fade-in'
              )}
              style={{ 
                animationDelay: `${index * 50}ms`,
                boxShadow: '2px 2px 0 hsl(210 80% 30%)'
              }}
            >
              <div className="font-mono text-sm text-secondary-foreground truncate">
                {entry.expression}
              </div>
              <div className="font-mono text-lg text-secondary-foreground font-bold truncate">
                = {entry.result}
              </div>
              <div className="text-xs text-secondary-foreground/70 mt-1 font-mono">
                {entry.timestamp.toLocaleTimeString()}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
