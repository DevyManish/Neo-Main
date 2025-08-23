import { Hero } from "@/components/hero";
import { Features } from "@/components/ui/features";
import LightRays from "@/components/ui/lightrays";
import { Pricing } from "@/components/ui/Pricing";

export default function Home() {
  return (
    <div className="flex flex-col ">
      {/* Background LightRays - positioned fixed behind everything */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />

      {/* Hero content - positioned relative above background */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <Pricing />
      </div>
    </div>
  );
}
