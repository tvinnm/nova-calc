import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export type ButtonVariant = 'default' | 'operator' | 'function' | 'memory' | 'equals' | 'clear';

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
  pressed?: boolean;
  span?: 1 | 2;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-button hover:bg-button-hover text-foreground border-primary/30 hover:border-primary',
  operator: 'bg-operator hover:bg-operator-hover text-primary font-semibold border-primary/50 hover:border-primary',
  function: 'bg-function hover:bg-function-hover text-secondary-foreground border-primary/30 hover:border-primary',
  memory: 'bg-memory hover:bg-memory-hover text-primary/80 border-primary/30 hover:border-primary',
  equals: 'bg-primary/20 hover:bg-primary/30 text-primary font-bold border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)]',
  clear: 'bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/50 hover:border-destructive',
};

export const CalculatorButton = forwardRef<HTMLButtonElement, CalculatorButtonProps>(
  ({ children, onClick, variant = 'default', className, pressed, span = 1 }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'calc-button h-14 md:h-16 font-mono text-xl md:text-2xl',
          'border-2',
          'focus:outline-none focus:ring-1 focus:ring-primary',
          'transition-all duration-100',
          variantStyles[variant],
          pressed && 'pressed animate-key-press',
          span === 2 && 'col-span-2',
          className
        )}
      >
        {children}
      </button>
    );
  }
);

CalculatorButton.displayName = 'CalculatorButton';