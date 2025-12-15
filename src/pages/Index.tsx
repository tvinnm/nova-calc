import { ScientificCalculator } from '@/components/calculator/ScientificCalculator';

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-8 px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-7xl grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          
          {/* Left side - Text content styled like C graphics */}
          <div className="text-left space-y-8 lg:pr-8">
            <div className="space-y-4">
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary leading-relaxed">
                Student Reference Program
              </h1>
              <h2 className="font-display text-xl md:text-2xl text-secondary-foreground">
                SCIENTIFIC CALCULATOR
              </h2>
              <p className="text-muted-foreground text-lg max-w-lg leading-relaxed font-mono mt-6">
                Advanced mathematical computation<br />
                program for precision calculations
              </p>
            </div>

            {/* Animated stars like original C code */}
            <div className="text-primary text-2xl font-mono tracking-widest">
              ★ ★ ★ ★ ★ ★ ★ ★ ★ ★
            </div>

            {/* Tips section styled like C graphics prompts */}
            <div className="space-y-4 pt-4">
              <div className="bg-card border-2 border-border p-4" style={{ boxShadow: '4px 4px 0 hsl(180 50% 25%)' }}>
                <h3 className="text-muted-foreground font-mono text-sm mb-2">Step 1:</h3>
                <p className="text-secondary-foreground text-base leading-relaxed font-mono">
                  Enter your choice for your<br />
                  desired operation (1-20)
                </p>
              </div>

              <div className="bg-card border-2 border-border p-4" style={{ boxShadow: '4px 4px 0 hsl(180 50% 25%)' }}>
                <h3 className="text-muted-foreground font-mono text-sm mb-2">Step 2:</h3>
                <p className="text-secondary-foreground text-base leading-relaxed font-mono">
                  Enter the values when prompted<br />
                  and view your result
                </p>
              </div>

              <div className="bg-card border-2 border-border p-4" style={{ boxShadow: '4px 4px 0 hsl(180 50% 25%)' }}>
                <h3 className="text-muted-foreground font-mono text-sm mb-2">Features:</h3>
                <p className="text-secondary-foreground text-base leading-relaxed font-mono">
                  Add, Sub, Mul, Div, %, Mod, Abs<br />
                  Sqrt, Sin, Cos, Tan, ln, log<br />
                  10^x, x^y, e^x, nPr, nCr, Hyp
                </p>
              </div>
            </div>

            {/* Footer credits like original */}
            <div className="flex justify-between text-sm font-mono pt-4">
              <div>
                <span className="text-muted-foreground">SUBMITTED TO:</span><br />
                <span className="text-primary">Open-Source Development</span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">SUBMITTED BY:</span><br />
                <span className="text-primary">RAJAT DEY</span>
              </div>
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
