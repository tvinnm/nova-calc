import { Keyboard } from 'lucide-react';

interface KeyboardIndicatorProps {
  pressedKey: string | null;
}

const keyMappings = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

export function KeyboardIndicator({ pressedKey }: KeyboardIndicatorProps) {
  return (
    <div className="glass-panel rounded-xl p-4 mt-4">
      <div className="flex items-center gap-2 mb-3 text-primary">
        <Keyboard className="w-4 h-4" />
        <span className="text-sm font-display">Keyboard Input</span>
      </div>
      
      <div className="grid grid-cols-4 gap-1">
        {keyMappings.flat().map((key) => (
          <div
            key={key}
            className={`
              h-8 rounded flex items-center justify-center text-sm font-mono
              transition-all duration-100
              ${pressedKey === key 
                ? 'bg-primary text-primary-foreground scale-90 glow-border' 
                : 'bg-muted/30 text-muted-foreground'
              }
            `}
          >
            {key === '*' ? '×' : key === '/' ? '÷' : key}
          </div>
        ))}
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground text-center">
        Press keys to calculate • Enter = Calculate • Backspace = Delete
      </div>
    </div>
  );
}