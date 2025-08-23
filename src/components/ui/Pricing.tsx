import { Check, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Pricing = () => (
  <div className="w-full py-20 lg:py-40 relative z-10">
    <div className="container mx-auto px-6">
      <div className="flex text-center justify-center items-center gap-4 flex-col">
        <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
          Pricing
        </Badge>
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular text-white">
            Prices that make sense!
          </h2>
          <p className="text-lg leading-relaxed tracking-tight text-white/70 max-w-xl text-center">
            Managing a small team today is already tough.
          </p>
        </div>

        <div className="grid pt-20 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
          {/* Startup Plan */}
          <div
            className="w-full rounded-lg p-6 group hover:scale-105 transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-normal text-white mb-2">Startup</h3>
            </div>

            <div className="flex flex-col gap-8 justify-start">
              <div className="flex flex-row items-center gap-2 text-xl">
                <span className="text-4xl text-white font-semibold">$40</span>
                <span className="text-sm text-white/60">/ month</span>
              </div>

              <div className="flex flex-col gap-4 justify-start">
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-cyan-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-white">Fast and reliable</p>
                    <p className="text-white/60 text-sm">
                      We've made it fast and reliable.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-cyan-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-white">AI-powered assistance</p>
                    <p className="text-white/60 text-sm">
                      Smart automation for your workflow.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-cyan-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-white">24/7 Support</p>
                    <p className="text-white/60 text-sm">
                      Always here when you need us.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="gap-4 bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Sign up today <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Growth Plan - Featured */}
          <div
            className="w-full rounded-lg p-6 group hover:scale-105 transition-all duration-300 relative"
            style={{
              background: "rgba(0, 255, 255, 0.1)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(0, 255, 255, 0.3)",
              boxShadow: "0 8px 32px 0 rgba(0, 255, 255, 0.2)",
            }}
          >
            {/* Popular badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div
                className="px-4 py-1 rounded-full text-xs font-medium text-white"
                style={{
                  background: "rgba(0, 255, 255, 0.8)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Most Popular
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-normal text-white mb-2">Growth</h3>
            </div>

            <div className="flex flex-col gap-8 justify-start">
              <div className="flex flex-row items-center gap-2 text-xl">
                <span className="text-4xl text-white font-semibold">$80</span>
                <span className="text-sm text-white/60">/ month</span>
              </div>

              <div className="flex flex-col gap-4 justify-start">
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-cyan-300 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-white">Everything in Startup</p>
                    <p className="text-white/60 text-sm">
                      Plus advanced features.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-cyan-300 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-white">Advanced analytics</p>
                    <p className="text-white/60 text-sm">
                      Deep insights into your workflow.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-cyan-300 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-white">Team collaboration</p>
                    <p className="text-white/60 text-sm">
                      Work together seamlessly.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="gap-4 bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300">
                Sign up today <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div
            className="w-full rounded-lg p-6 group hover:scale-105 transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-normal text-white mb-2">
                Enterprise
              </h3>
            </div>

            <div className="flex flex-col gap-8 justify-start">
              <div className="flex flex-row items-center gap-2 text-xl">
                <span className="text-4xl text-white font-semibold">
                  Custom
                </span>
                <span className="text-sm text-white/60">pricing</span>
              </div>

              <div className="flex flex-col gap-4 justify-start">
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-cyan-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-white">Everything in Growth</p>
                    <p className="text-white/60 text-sm">
                      Plus enterprise features.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-cyan-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-white">Dedicated support</p>
                    <p className="text-white/60 text-sm">
                      Personal account manager.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <Check className="w-4 h-4 mt-2 text-cyan-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-white">Custom integrations</p>
                    <p className="text-white/60 text-sm">
                      Tailored to your needs.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="gap-4 bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                Book a meeting <PhoneCall className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
