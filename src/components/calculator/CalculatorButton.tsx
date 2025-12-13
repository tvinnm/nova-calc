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
  default: 'bg-button hover:bg-button-hover text-foreground',
  operator: 'bg-operator hover:bg-operator-hover text-primary font-semibold',
  function: 'bg-function hover:bg-function-hover text-secondary-foreground text-sm',
  memory: 'bg-memory hover:bg-memory-hover text-purple-300 text-sm',
  equals: 'bg-primary hover:bg-primary/90 text-primary-foreground font-bold',
  clear: 'bg-destructive/20 hover:bg-destructive/30 text-destructive',
};

export const CalculatorButton = forwardRef<HTMLButtonElement, CalculatorButtonProps>(
  ({ children, onClick, variant = 'default', className, pressed, span = 1 }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          'calc-button rounded-lg h-14 font-mono text-lg',
          'border border-glass-border/30',
          'focus:outline-none focus:ring-2 focus:ring-primary/50',
          'transition-all duration-150',
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