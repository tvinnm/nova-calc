import { useState, useCallback } from 'react';

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export interface CalculatorState {
  display: string;
  expression: string;
  preview: string;
  memory: number;
  history: HistoryEntry[];
  error: string | null;
  isRadians: boolean;
}

const initialState: CalculatorState = {
  display: '0',
  expression: '',
  preview: '',
  memory: 0,
  history: [],
  error: null,
  isRadians: true,
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  const evaluateExpression = useCallback((expr: string, isRad: boolean): string => {
    try {
      let processed = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, `(${Math.PI})`)
        .replace(/e(?![x])/g, `(${Math.E})`);

      // Handle scientific functions
      const funcs: Record<string, (x: number) => number> = {
        // Trigonometry (11-16)
        sin: (x) => (isRad ? Math.sin(x) : Math.sin(toRadians(x))),
        cos: (x) => (isRad ? Math.cos(x) : Math.cos(toRadians(x))),
        tan: (x) => (isRad ? Math.tan(x) : Math.tan(toRadians(x))),
        asin: (x) => (isRad ? Math.asin(x) : toDegrees(Math.asin(x))),
        acos: (x) => (isRad ? Math.acos(x) : toDegrees(Math.acos(x))),
        atan: (x) => (isRad ? Math.atan(x) : toDegrees(Math.atan(x))),
        sinh: Math.sinh,
        cosh: Math.cosh,
        tanh: Math.tanh,
        // Logarithms (9-10, 17)
        log: Math.log10,
        ln: Math.log,
        exp: Math.exp,
        // Powers & Roots (6-7)
        sq: (x) => x * x,
        sqrt: Math.sqrt,
        cbrt: Math.cbrt,
        // Additional (19)
        abs: Math.abs,
        floor: Math.floor,
        ceil: Math.ceil,
        round: Math.round,
        // Conversions (22-23)
        radToDeg: (x) => toDegrees(x),
        degToRad: (x) => toRadians(x),
        // Decimal conversions (24-25) - output as decimal representation
        decToBin: (x) => parseInt(Math.floor(x).toString(2)),
        binToDec: (x) => parseInt(x.toString(), 2) || 0,
      };

      // Replace function calls
      Object.entries(funcs).forEach(([name, fn]) => {
        const regex = new RegExp(`${name}\\(([^)]+)\\)`, 'g');
        processed = processed.replace(regex, (_, arg) => {
          const value = Function(`"use strict"; return (${arg})`)();
          return String(fn(value));
        });
      });

      // Handle n-th root: nroot(x,n) = x^(1/n)
      processed = processed.replace(/nroot\(([^,]+),([^)]+)\)/g, (_, x, n) => {
        const xVal = Function(`"use strict"; return (${x})`)();
        const nVal = Function(`"use strict"; return (${n})`)();
        return String(Math.pow(xVal, 1 / nVal));
      });

      // Handle log base b: logb(x,b)
      processed = processed.replace(/logb\(([^,]+),([^)]+)\)/g, (_, x, b) => {
        const xVal = Function(`"use strict"; return (${x})`)();
        const bVal = Function(`"use strict"; return (${b})`)();
        return String(Math.log(xVal) / Math.log(bVal));
      });

      // Handle linear equation solver: solveLinear(a,b) solves ax + b = 0 => x = -b/a
      processed = processed.replace(/solveLinear\(([^,]+),([^)]+)\)/g, (_, a, b) => {
        const aVal = Function(`"use strict"; return (${a})`)();
        const bVal = Function(`"use strict"; return (${b})`)();
        if (aVal === 0) return 'NaN';
        return String(-bVal / aVal);
      });

      // Handle quadratic equation solver: solveQuad(a,b,c) solves ax² + bx + c = 0
      processed = processed.replace(/solveQuad\(([^,]+),([^,]+),([^)]+)\)/g, (_, a, b, c) => {
        const aVal = Function(`"use strict"; return (${a})`)();
        const bVal = Function(`"use strict"; return (${b})`)();
        const cVal = Function(`"use strict"; return (${c})`)();
        const discriminant = bVal * bVal - 4 * aVal * cVal;
        if (discriminant < 0) return 'No real roots';
        if (discriminant === 0) return String(-bVal / (2 * aVal));
        const x1 = (-bVal + Math.sqrt(discriminant)) / (2 * aVal);
        const x2 = (-bVal - Math.sqrt(discriminant)) / (2 * aVal);
        return `${x1}, ${x2}`;
      });

      // Handle factorial
      processed = processed.replace(/(\d+)!/g, (_, num) => {
        let result = 1;
        for (let i = 2; i <= parseInt(num); i++) result *= i;
        return String(result);
      });

      // Handle power
      processed = processed.replace(/\^/g, '**');

      // Handle percentage
      processed = processed.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

      // Evaluate
      const result = Function(`"use strict"; return (${processed})`)();
      
      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error('Invalid result');
      }

      // Format result
      const formatted = Number(result.toPrecision(12));
      return formatted.toString();
    } catch {
      throw new Error('Syntax Error');
    }
  }, []);

  const updatePreview = useCallback((expr: string, isRad: boolean) => {
    if (!expr) return '';
    try {
      return evaluateExpression(expr, isRad);
    } catch {
      return '';
    }
  }, [evaluateExpression]);

  const inputDigit = useCallback((digit: string) => {
    setState((prev) => {
      const newDisplay = prev.display === '0' && digit !== '.' 
        ? digit 
        : prev.display + digit;
      const newExpr = prev.expression + digit;
      return {
        ...prev,
        display: newDisplay,
        expression: newExpr,
        preview: updatePreview(newExpr, prev.isRadians),
        error: null,
      };
    });
  }, [updatePreview]);

  const inputOperator = useCallback((op: string) => {
    setState((prev) => {
      const newExpr = prev.expression + op;
      return {
        ...prev,
        display: prev.display + op,
        expression: newExpr,
        preview: updatePreview(newExpr, prev.isRadians),
        error: null,
      };
    });
  }, [updatePreview]);

  const inputFunction = useCallback((func: string) => {
    setState((prev) => {
      const newExpr = prev.expression + func + '(';
      return {
        ...prev,
        display: prev.display === '0' ? func + '(' : prev.display + func + '(',
        expression: newExpr,
        preview: '',
        error: null,
      };
    });
  }, []);

  const inputConstant = useCallback((constant: string) => {
    setState((prev) => {
      const newExpr = prev.expression + constant;
      const newDisplay = prev.display === '0' ? constant : prev.display + constant;
      return {
        ...prev,
        display: newDisplay,
        expression: newExpr,
        preview: updatePreview(newExpr, prev.isRadians),
        error: null,
      };
    });
  }, [updatePreview]);

  const inputParenthesis = useCallback((paren: string) => {
    setState((prev) => {
      const newExpr = prev.expression + paren;
      const newDisplay = prev.display === '0' && paren === '(' ? paren : prev.display + paren;
      return {
        ...prev,
        display: newDisplay,
        expression: newExpr,
        preview: updatePreview(newExpr, prev.isRadians),
        error: null,
      };
    });
  }, [updatePreview]);

  const calculate = useCallback(() => {
    setState((prev) => {
      if (!prev.expression) return prev;
      
      try {
        const result = evaluateExpression(prev.expression, prev.isRadians);
        const entry: HistoryEntry = {
          id: Date.now().toString(),
          expression: prev.display,
          result,
          timestamp: new Date(),
        };
        
        return {
          ...prev,
          display: result,
          expression: result,
          preview: '',
          history: [entry, ...prev.history].slice(0, 50),
          error: null,
        };
      } catch (e) {
        return {
          ...prev,
          error: e instanceof Error ? e.message : 'Error',
          preview: '',
        };
      }
    });
  }, [evaluateExpression]);

  const clear = useCallback(() => {
    setState((prev) => ({
      ...prev,
      display: '0',
      expression: '',
      preview: '',
      error: null,
    }));
  }, []);

  const allClear = useCallback(() => {
    setState((prev) => ({
      ...initialState,
      history: prev.history,
      memory: prev.memory,
      isRadians: prev.isRadians,
    }));
  }, []);

  const backspace = useCallback(() => {
    setState((prev) => {
      if (prev.display.length <= 1) {
        return { ...prev, display: '0', expression: '', preview: '', error: null };
      }
      const newDisplay = prev.display.slice(0, -1);
      const newExpr = prev.expression.slice(0, -1);
      return {
        ...prev,
        display: newDisplay,
        expression: newExpr,
        preview: updatePreview(newExpr, prev.isRadians),
        error: null,
      };
    });
  }, [updatePreview]);

  const toggleSign = useCallback(() => {
    setState((prev) => {
      if (prev.display === '0') return prev;
      const newDisplay = prev.display.startsWith('-') 
        ? prev.display.slice(1) 
        : '-' + prev.display;
      return {
        ...prev,
        display: newDisplay,
        expression: newDisplay,
        preview: updatePreview(newDisplay, prev.isRadians),
      };
    });
  }, [updatePreview]);

  // Memory operations
  const memoryClear = useCallback(() => {
    setState((prev) => ({ ...prev, memory: 0 }));
  }, []);

  const memoryRecall = useCallback(() => {
    setState((prev) => {
      const memStr = prev.memory.toString();
      const newExpr = prev.expression + memStr;
      return {
        ...prev,
        display: prev.display === '0' ? memStr : prev.display + memStr,
        expression: newExpr,
        preview: updatePreview(newExpr, prev.isRadians),
      };
    });
  }, [updatePreview]);

  const memoryAdd = useCallback(() => {
    setState((prev) => {
      try {
        const current = evaluateExpression(prev.expression || prev.display, prev.isRadians);
        return { ...prev, memory: prev.memory + parseFloat(current) };
      } catch {
        return prev;
      }
    });
  }, [evaluateExpression]);

  const memorySubtract = useCallback(() => {
    setState((prev) => {
      try {
        const current = evaluateExpression(prev.expression || prev.display, prev.isRadians);
        return { ...prev, memory: prev.memory - parseFloat(current) };
      } catch {
        return prev;
      }
    });
  }, [evaluateExpression]);

  const toggleAngleMode = useCallback(() => {
    setState((prev) => ({ ...prev, isRadians: !prev.isRadians }));
  }, []);

  const clearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, history: [] }));
  }, []);

  const loadFromHistory = useCallback((entry: HistoryEntry) => {
    setState((prev) => ({
      ...prev,
      display: entry.result,
      expression: entry.result,
      preview: '',
      error: null,
    }));
  }, []);

  return {
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
  };
}