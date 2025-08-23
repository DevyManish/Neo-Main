"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const Hero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["amazing", "agentic", "developer"], []);
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="gap-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              Read our features <MoveRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular text-white">
              <span className="text-cyan-300">This is something</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-white"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/80 max-w-2xl text-center">
              Supercharge your development workflow with intelligent assistance.
              Let AI handle the routine tasks while you focus on creative
              problem-solving.
            </p>
          </div>

          <div className="flex flex-row gap-3">
            <Link href="/">
              <Button
                size="lg"
                className="gap-4 bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                variant="outline"
              >
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
            </Link>

            {user ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gap-4 bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300"
                >
                  Get Started <MoveRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/register">
                <Button
                  size="lg"
                  className="gap-4 bg-cyan-500 hover:bg-cyan-600 text-white transition-all duration-300"
                >
                  Sign up here <MoveRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
