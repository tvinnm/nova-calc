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
  default: 'bg-secondary text-secondary-foreground',
  operator: 'bg-secondary text-secondary-foreground font-semibold',
  function: 'bg-secondary text-secondary-foreground',
  memory: 'bg-secondary text-secondary-foreground',
  equals: 'bg-primary text-primary-foreground font-bold',
  clear: 'bg-destructive text-destructive-foreground',
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