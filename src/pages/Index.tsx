import { ScientificCalculator } from '@/components/calculator/ScientificCalculator';
import { ParticleBackground } from '@/components/ParticleBackground';

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated particle background */}
      <ParticleBackground />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-glow-secondary/5 blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-8 px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-7xl grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">
          
          {/* Left side - Text content */}
          <div className="text-left space-y-8 lg:pr-8">
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                Calculate Your{' '}
                <span className="text-primary glow-text">Problem Easily.</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed">
                A powerful scientific calculator with advanced mathematical functions, 
                built for engineers, students, and professionals who demand precision.
              </p>
            </div>

            {/* Tips section */}
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <h3 className="text-primary font-display text-lg tracking-wide">Tips — 1</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Use keyboard shortcuts for faster calculations. Press numbers, operators, 
                  and Enter to compute results instantly without clicking.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-primary font-display text-lg tracking-wide">Tips — 2</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Toggle between RAD and DEG modes for trigonometric functions. 
                  Perfect for both pure math and engineering applications.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-primary font-display text-lg tracking-wide">Tips — 3</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Access your calculation history anytime. Click the history icon 
                  to search through past calculations and reuse results.
                </p>
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