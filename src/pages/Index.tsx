import { ScientificCalculator } from '@/components/calculator/ScientificCalculator';

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden crt-effect">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none scanline z-50" />

      {/* Background grid pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-8 px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-7xl grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          
          {/* Left side - Text content */}
          <div className="text-left space-y-8 lg:pr-8">
            <div className="space-y-4">
              <div className="text-muted-foreground text-sm mb-2 font-mono">
                {'>'} SYSTEM READY_
              </div>
              <h1 className="font-display text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed glow-text">
                SCIENTIFIC<br />
                <span className="text-primary">CALCULATOR</span><br />
                v2.5
              </h1>
              <p className="text-muted-foreground text-xl md:text-2xl max-w-lg leading-relaxed font-mono mt-6">
                {'>'} Advanced mathematical<br />
                {'>'} computation terminal<br />
                {'>'} for precision work_
              </p>
            </div>

            {/* ASCII art divider */}
            <div className="text-primary/50 text-xs font-mono hidden lg:block">
              ════════════════════════════════════
            </div>

            {/* Tips section */}
            <div className="space-y-4 pt-4">
              <div className="space-y-1 border-l-2 border-primary/50 pl-4">
                <h3 className="text-primary font-mono text-lg">[TIP 01]</h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-mono">
                  Use keyboard for input.<br />
                  Numbers + operators + ENTER
                </p>
              </div>

              <div className="space-y-1 border-l-2 border-primary/50 pl-4">
                <h3 className="text-primary font-mono text-lg">[TIP 02]</h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-mono">
                  Toggle RAD/DEG mode for<br />
                  trigonometric functions
                </p>
              </div>

              <div className="space-y-1 border-l-2 border-primary/50 pl-4">
                <h3 className="text-primary font-mono text-lg">[TIP 03]</h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md font-mono">
                  Access calculation history<br />
                  via HISTORY button
                </p>
              </div>
            </div>

            {/* ASCII art footer */}
            <div className="text-primary/30 text-xs font-mono hidden lg:block pt-4">
              ╔══════════════════════════════════╗<br />
              ║  (C) 2024 CALC-TERM SYSTEMS      ║<br />
              ║  ALL RIGHTS RESERVED             ║<br />
              ╚══════════════════════════════════╝
            </div>
          </div>

          {/* Right side - Calculator */}
          <div className="flex justify-center lg:justify-end">
            <ScientificCalculator />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
