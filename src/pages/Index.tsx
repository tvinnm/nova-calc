import { ScientificCalculator } from '@/components/calculator/ScientificCalculator';

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-primary glow-text tracking-widest mb-2">
            CASIO FX-CYBER
          </h1>
          <p className="text-muted-foreground text-sm tracking-wide">
            Scientific Calculator • High-Tech Edition
          </p>
        </header>

        <ScientificCalculator />

        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>Use keyboard for quick input • Press Enter to calculate</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;