import { useState } from 'react';
import { History, Search, Trash2, X } from 'lucide-react';
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
    <div className="glass-panel rounded-xl p-4 animate-slide-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-primary">
          <History className="w-5 h-5" />
          <h3 className="font-display text-lg">History</h3>
        </div>
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={onClear}
              className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
              title="Clear history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-muted/50 border border-glass-border/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
        />
      </div>

      {/* History list */}
      <div className="max-h-[300px] overflow-y-auto space-y-2 scrollbar-thin">
        {filteredHistory.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm">
            {history.length === 0 ? 'No calculations yet' : 'No matches found'}
          </p>
        ) : (
          filteredHistory.map((entry, index) => (
            <button
              key={entry.id}
              onClick={() => onSelect(entry)}
              className={cn(
                'w-full text-left p-3 rounded-lg',
                'bg-muted/30 hover:bg-muted/50 border border-glass-border/30',
                'transition-all duration-150 hover:glow-subtle',
                'animate-fade-in'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="font-mono text-sm text-muted-foreground truncate">
                {entry.expression}
              </div>
              <div className="font-display text-lg text-primary truncate">
                = {entry.result}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {entry.timestamp.toLocaleTimeString()}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}