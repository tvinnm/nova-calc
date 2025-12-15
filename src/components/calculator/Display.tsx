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
    <div className="display-screen p-5 md:p-6 mb-5 relative overflow-hidden">
      {/* Status circles like original C graphics */}
      <div className="absolute top-3 right-3 flex gap-2">
        <div className="status-circle" />
        <div className="status-circle" />
        <div className="status-circle" />
      </div>

      {/* Developer symbol like RD in original */}
      <div className="absolute top-3 left-3 text-primary font-bold text-sm font-display">
        RD
      </div>
      
      {/* Status indicators */}
      <div className="flex justify-start items-center mb-3 mt-6 gap-3 text-sm font-mono">
        <span className={cn(
          'px-2 py-1 bg-secondary text-secondary-foreground border border-border',
          isRadians && 'bg-primary text-primary-foreground'
        )}>
          {isRadians ? 'RAD' : 'DEG'}
        </span>
        {memory !== 0 && (
          <span className="px-2 py-1 bg-secondary text-secondary-foreground border border-border">
            M:{memory.toFixed(2)}
          </span>
        )}
        {error && (
          <span className="px-2 py-1 bg-destructive text-destructive-foreground animate-pulse">
            ERR
          </span>
        )}
      </div>

      {/* Main display - dark text on light gray */}
      <div className="min-h-[80px] flex flex-col justify-end items-end text-black">
        {/* Expression/Main value */}
        <div 
          className={cn(
            'font-mono text-3xl md:text-4xl tracking-wider transition-all',
            error && 'text-destructive'
          )}
        >
          {formatDisplay(expression || '0')}<span className="animate-pulse">_</span>
        </div>
        
        {/* Preview */}
        {preview && !error && (
          <div className="text-xl text-gray-600 mt-2 font-mono animate-fade-in">
            = {formatDisplay(preview)}
          </div>
        )}
      </div>
    </div>
  );
}