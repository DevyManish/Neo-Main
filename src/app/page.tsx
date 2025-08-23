import { Hero } from "@/components/hero";
import LightRays from "@/components/ui/lightrays";

export default function Home() {
  return (
    <>
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
      <Hero />
    </>
  );
}
