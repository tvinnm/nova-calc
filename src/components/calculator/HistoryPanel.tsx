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
    <div className="glass-panel p-4 animate-slide-in border-2 border-primary/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-primary font-mono text-xl">
          [HISTORY]
        </div>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={onClear}
              className="px-2 py-1 border border-destructive/50 hover:border-destructive text-destructive transition-colors font-mono text-lg"
              title="Clear history"
            >
              [CLR]
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 border border-primary/30 hover:border-primary text-muted-foreground hover:text-primary transition-colors font-mono text-lg"
          >
            [X]
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">{'>'}</span>
        <input
          type="text"
          placeholder="SEARCH..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-background border-2 border-primary/30 pl-8 pr-4 py-2 text-lg focus:outline-none focus:border-primary font-mono text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* History list */}
      <div className="max-h-[300px] overflow-y-auto space-y-2 scrollbar-thin">
        {filteredHistory.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-lg font-mono">
            {history.length === 0 ? '> NO DATA_' : '> NO MATCHES_'}
          </p>
        ) : (
          filteredHistory.map((entry, index) => (
            <button
              key={entry.id}
              onClick={() => onSelect(entry)}
              className={cn(
                'w-full text-left p-3',
                'bg-background border-2 border-primary/30 hover:border-primary',
                'transition-all duration-100 hover:glow-subtle',
                'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="font-mono text-lg text-muted-foreground truncate">
                {'>'} {entry.expression}
              </div>
              <div className="font-mono text-xl text-primary truncate glow-text">
                = {entry.result}
              </div>
              <div className="text-sm text-muted-foreground mt-1 font-mono">
                [{entry.timestamp.toLocaleTimeString()}]
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
