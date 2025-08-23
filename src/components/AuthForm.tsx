"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Github } from "lucide-react";
import Link from "next/link";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "authenticated") return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <Card className="w-full max-w-md shadow-lg rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {mode === "login" ? "Log In" : "Sign Up"}
          </h2>

          <div className="flex gap-4 mb-4">
            <Button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              variant="outline"
              className="flex-1 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" /> Google
            </Button>
            <Button
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
              variant="outline"
              className="flex-1 flex items-center gap-2"
            >
              <Github className="w-5 h-5" /> GitHub
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                href={mode === "login" ? "/register" : "/login"}
                className="text-blue-500 hover:underline"
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
