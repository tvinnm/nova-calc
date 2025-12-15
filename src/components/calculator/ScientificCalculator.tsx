import { useState, useEffect, useCallback } from 'react';
import { History, ChevronDown, ChevronUp } from 'lucide-react';
import { useCalculator } from '@/hooks/useCalculator';
import { Display } from './Display';
import { CalculatorButton } from './CalculatorButton';
import { HistoryPanel } from './HistoryPanel';
import { cn } from '@/lib/utils';

export function ScientificCalculator() {
  const {
    state,
    inputDigit,
    inputOperator,
    inputFunction,
    inputConstant,
    inputParenthesis,
    calculate,
    clear,
    allClear,
    backspace,
    toggleSign,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    toggleAngleMode,
    clearHistory,
    loadFromHistory,
  } = useCalculator();

  const [showHistory, setShowHistory] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleButtonPress = useCallback((id: string, action: () => void) => {
    setPressedButton(id);
    action();
    setTimeout(() => setPressedButton(null), 150);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      setPressedKey(key);
      
      if (/^[0-9.]$/.test(key)) {
        inputDigit(key);
      } else if (key === '+' || key === '-') {
        inputOperator(key);
      } else if (key === '*') {
        inputOperator('×');
      } else if (key === '/') {
        e.preventDefault();
        inputOperator('÷');
      } else if (key === '^') {
        inputOperator('^');
      } else if (key === '(' || key === ')') {
        inputParenthesis(key);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key === 'Escape') {
        allClear();
      } else if (key === '%') {
        inputOperator('%');
      }
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [inputDigit, inputOperator, inputParenthesis, calculate, backspace, allClear]);

  // Basic Operations (1-4)
  const basicButtons = [
    { id: 'lparen', label: '(', action: () => inputParenthesis('(') },
    { id: 'rparen', label: ')', action: () => inputParenthesis(')') },
    { id: 'pi', label: 'π', action: () => inputConstant('π') },
    { id: 'e', label: 'e', action: () => inputConstant('e') },
  ];

  // Powers & Roots (5-8)
  const powerButtons = [
    { id: 'pow', label: 'xʸ', action: () => inputOperator('^') },
    { id: 'sq', label: 'x²', action: () => inputFunction('sq') },
    { id: 'sqrt', label: '√x', action: () => inputFunction('sqrt') },
    { id: 'nroot', label: 'ⁿ√x', action: () => inputFunction('nroot') },
  ];

  // Logarithms (9-10, 17-18)
  const logButtons = [
    { id: 'ln', label: 'ln', action: () => inputFunction('ln') },
    { id: 'exp', label: 'eˣ', action: () => inputFunction('exp') },
    { id: 'log10', label: 'log₁₀', action: () => inputFunction('log') },
    { id: 'logb', label: 'logₐ', action: () => inputFunction('logb') },
  ];

  // Trigonometry (11-16)
  const trigButtons = [
    { id: 'sin', label: 'sin', action: () => inputFunction('sin') },
    { id: 'cos', label: 'cos', action: () => inputFunction('cos') },
    { id: 'tan', label: 'tan', action: () => inputFunction('tan') },
    { id: 'asin', label: 'sin⁻¹', action: () => inputFunction('asin') },
    { id: 'acos', label: 'cos⁻¹', action: () => inputFunction('acos') },
    { id: 'atan', label: 'tan⁻¹', action: () => inputFunction('atan') },
  ];

  // Additional Functions (19)
  const extraButtons = [
    { id: 'abs', label: '|x|', action: () => inputFunction('abs') },
    { id: 'fact', label: 'x!', action: () => inputOperator('!') },
    { id: 'percent', label: '%', action: () => inputOperator('%') },
    { id: 'cbrt', label: '∛', action: () => inputFunction('cbrt') },
  ];

  // Conversions (22-25)
  const conversionButtons = [
    { id: 'radToDeg', label: 'r→d', action: () => inputFunction('radToDeg') },
    { id: 'degToRad', label: 'd→r', action: () => inputFunction('degToRad') },
    { id: 'decToBin', label: 'D→B', action: () => inputFunction('decToBin') },
    { id: 'binToDec', label: 'B→D', action: () => inputFunction('binToDec') },
  ];

  // Equation Solvers (20-21)
  const solverButtons = [
    { id: 'linear', label: 'ax+b=0', action: () => inputFunction('solveLinear') },
    { id: 'quadratic', label: 'ax²+bx+c', action: () => inputFunction('solveQuad') },
  ];

  return (
    <div className="w-full max-w-xl">
      {/* Header - styled like C graphics title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-muted-foreground text-sm font-mono mb-1">
            Student Reference Program
          </div>
          <h2 className="font-display text-xl md:text-2xl text-primary tracking-wider">
            SCIENTIFIC CALCULATOR
          </h2>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className={cn(
            'px-4 py-2 border-2 transition-all font-mono text-sm',
            'bg-secondary text-secondary-foreground border-border',
            showHistory && 'bg-primary text-primary-foreground'
          )}
        >
          HISTORY
        </button>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 glass-panel p-5 md:p-6 glow-border">
          <Display
            expression={state.display}
            preview={state.preview}
            error={state.error}
            memory={state.memory}
            isRadians={state.isRadians}
          />

          {/* Memory buttons */}
          <div className="grid grid-cols-5 gap-2 mb-2">
            <CalculatorButton
              variant="memory"
              onClick={() => handleButtonPress('mc', memoryClear)}
              pressed={pressedButton === 'mc'}
            >
              MC
            </CalculatorButton>
            <CalculatorButton
              variant="memory"
              onClick={() => handleButtonPress('mr', memoryRecall)}
              pressed={pressedButton === 'mr'}
            >
              MR
            </CalculatorButton>
            <CalculatorButton
              variant="memory"
              onClick={() => handleButtonPress('m+', memoryAdd)}
              pressed={pressedButton === 'm+'}
            >
              M+
            </CalculatorButton>
            <CalculatorButton
              variant="memory"
              onClick={() => handleButtonPress('m-', memorySubtract)}
              pressed={pressedButton === 'm-'}
            >
              M−
            </CalculatorButton>
            <CalculatorButton
              variant="function"
              onClick={toggleAngleMode}
              className="text-xs"
            >
              {state.isRadians ? 'RAD' : 'DEG'}
            </CalculatorButton>
          </div>

          {/* Basic & Constants */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            {basicButtons.map((btn) => (
              <CalculatorButton
                key={btn.id}
                variant="function"
                onClick={() => handleButtonPress(btn.id, btn.action)}
                pressed={pressedButton === btn.id}
              >
                {btn.label}
              </CalculatorButton>
            ))}
          </div>

          {/* Powers & Roots */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            {powerButtons.map((btn) => (
              <CalculatorButton
                key={btn.id}
                variant="function"
                onClick={() => handleButtonPress(btn.id, btn.action)}
                pressed={pressedButton === btn.id}
              >
                {btn.label}
              </CalculatorButton>
            ))}
          </div>

          {/* Logarithms */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            {logButtons.map((btn) => (
              <CalculatorButton
                key={btn.id}
                variant="function"
                onClick={() => handleButtonPress(btn.id, btn.action)}
                pressed={pressedButton === btn.id}
              >
                {btn.label}
              </CalculatorButton>
            ))}
          </div>

          {/* Trigonometry */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            {trigButtons.map((btn) => (
              <CalculatorButton
                key={btn.id}
                variant="function"
                onClick={() => handleButtonPress(btn.id, btn.action)}
                pressed={pressedButton === btn.id}
              >
                {btn.label}
              </CalculatorButton>
            ))}
          </div>

          {/* Advanced functions toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full py-2 mb-2 flex items-center justify-center gap-1 text-sm text-secondary-foreground bg-secondary hover:bg-button-hover transition-colors font-mono border-2 border-border"
          >
            {showAdvanced ? '▲ HIDE' : '▼ SHOW'} ADVANCED
          </button>

          {/* Advanced functions */}
          {showAdvanced && (
            <div className="space-y-2 mb-2 animate-fade-in">
              {/* Extra Functions */}
              <div className="grid grid-cols-4 gap-2">
                {extraButtons.map((btn) => (
                  <CalculatorButton
                    key={btn.id}
                    variant="function"
                    onClick={() => handleButtonPress(btn.id, btn.action)}
                    pressed={pressedButton === btn.id}
                  >
                    {btn.label}
                  </CalculatorButton>
                ))}
              </div>

              {/* Conversions */}
              <div className="grid grid-cols-4 gap-2">
                {conversionButtons.map((btn) => (
                  <CalculatorButton
                    key={btn.id}
                    variant="function"
                    onClick={() => handleButtonPress(btn.id, btn.action)}
                    pressed={pressedButton === btn.id}
                  >
                    {btn.label}
                  </CalculatorButton>
                ))}
              </div>

              {/* Equation Solvers */}
              <div className="grid grid-cols-2 gap-2">
                {solverButtons.map((btn) => (
                  <CalculatorButton
                    key={btn.id}
                    variant="function"
                    onClick={() => handleButtonPress(btn.id, btn.action)}
                    pressed={pressedButton === btn.id}
                  >
                    {btn.label}
                  </CalculatorButton>
                ))}
              </div>
            </div>
          )}

          {/* Main keypad */}
          <div className="grid grid-cols-4 gap-2">
            {/* Row 1 */}
            <CalculatorButton
              variant="clear"
              onClick={() => handleButtonPress('ac', allClear)}
              pressed={pressedButton === 'ac'}
            >
              AC
            </CalculatorButton>
            <CalculatorButton
              variant="clear"
              onClick={() => handleButtonPress('c', clear)}
              pressed={pressedButton === 'c'}
            >
              C
            </CalculatorButton>
            <CalculatorButton
              variant="function"
              onClick={() => handleButtonPress('del', backspace)}
              pressed={pressedButton === 'del'}
            >
              DEL
            </CalculatorButton>
            <CalculatorButton
              variant="operator"
              onClick={() => handleButtonPress('div', () => inputOperator('÷'))}
              pressed={pressedButton === 'div'}
            >
              ÷
            </CalculatorButton>

            {/* Row 2 */}
            {['7', '8', '9'].map((d) => (
              <CalculatorButton
                key={d}
                onClick={() => handleButtonPress(d, () => inputDigit(d))}
                pressed={pressedButton === d}
              >
                {d}
              </CalculatorButton>
            ))}
            <CalculatorButton
              variant="operator"
              onClick={() => handleButtonPress('mul', () => inputOperator('×'))}
              pressed={pressedButton === 'mul'}
            >
              ×
            </CalculatorButton>

            {/* Row 3 */}
            {['4', '5', '6'].map((d) => (
              <CalculatorButton
                key={d}
                onClick={() => handleButtonPress(d, () => inputDigit(d))}
                pressed={pressedButton === d}
              >
                {d}
              </CalculatorButton>
            ))}
            <CalculatorButton
              variant="operator"
              onClick={() => handleButtonPress('sub', () => inputOperator('-'))}
              pressed={pressedButton === 'sub'}
            >
              −
            </CalculatorButton>

            {/* Row 4 */}
            {['1', '2', '3'].map((d) => (
              <CalculatorButton
                key={d}
                onClick={() => handleButtonPress(d, () => inputDigit(d))}
                pressed={pressedButton === d}
              >
                {d}
              </CalculatorButton>
            ))}
            <CalculatorButton
              variant="operator"
              onClick={() => handleButtonPress('add', () => inputOperator('+'))}
              pressed={pressedButton === 'add'}
            >
              +
            </CalculatorButton>

            {/* Row 5 */}
            <CalculatorButton
              onClick={() => handleButtonPress('sign', toggleSign)}
              pressed={pressedButton === 'sign'}
            >
              ±
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleButtonPress('0', () => inputDigit('0'))}
              pressed={pressedButton === '0'}
            >
              0
            </CalculatorButton>
            <CalculatorButton
              onClick={() => handleButtonPress('.', () => inputDigit('.'))}
              pressed={pressedButton === '.'}
            >
              .
            </CalculatorButton>
            <CalculatorButton
              variant="equals"
              onClick={() => handleButtonPress('eq', calculate)}
              pressed={pressedButton === 'eq'}
            >
              =
            </CalculatorButton>
          </div>
        </div>

        {/* History panel */}
        {showHistory && (
          <div className="w-72 hidden md:block">
            <HistoryPanel
              history={state.history}
              onSelect={loadFromHistory}
              onClear={clearHistory}
              isOpen={showHistory}
              onClose={() => setShowHistory(false)}
            />
          </div>
        )}
      </div>

      {/* Mobile history panel */}
      {showHistory && (
        <div className="md:hidden mt-4">
          <HistoryPanel
            history={state.history}
            onSelect={loadFromHistory}
            onClear={clearHistory}
            isOpen={showHistory}
            onClose={() => setShowHistory(false)}
          />
        </div>
      )}
    </div>
  );
}