import { cn } from '@/lib/utils';

interface DisplayProps {
  expression: string;
  preview: string;
  error: string | null;
  memory: number;
  isRadians: boolean;
}

export function Display({ expression, preview, error, memory, isRadians }: DisplayProps) {
  const formatDisplay = (value: string) => {
    if (value.length > 20) {
      return value.slice(0, 17) + '...';
    }
    return value;
  };

  return (
    <div className="display-screen rounded-xl p-5 md:p-6 mb-5 relative overflow-hidden">
      {/* Scanline effect */}
      <div className="scanline absolute inset-0" />
      
      {/* Status indicators */}
      <div className="flex justify-between items-center mb-3 text-sm text-muted-foreground">
        <div className="flex gap-3">
          <span className={cn(
            'px-2 py-1 rounded',
            isRadians ? 'bg-primary/20 text-primary glow-subtle' : 'bg-muted'
          )}>
            {isRadians ? 'RAD' : 'DEG'}
          </span>
          {memory !== 0 && (
            <span className="px-2 py-1 rounded bg-memory/50 text-purple-300">
              M: {memory.toFixed(2)}
            </span>
          )}
        </div>
        {error && (
          <span className="text-destructive animate-pulse">{error}</span>
        )}
      </div>

      {/* Main display */}
      <div className="min-h-[100px] flex flex-col justify-end items-end">
        {/* Expression/Main value */}
        <div 
          className={cn(
            'font-display text-4xl md:text-5xl tracking-wider glow-text transition-all',
            error && 'text-destructive'
          )}
        >
          {formatDisplay(expression || '0')}
        </div>
        
        {/* Preview */}
        {preview && !error && (
          <div className="text-xl text-muted-foreground mt-2 font-mono animate-fade-in">
            = {formatDisplay(preview)}
          </div>
        )}
      </div>
    </div>
  );
}