"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import UserButton from "@/components/UserButton";
import { Button } from "@/components/ui/button";

export default function Page() {
  const session = useSession();
  const user = session.data?.user;

  return <div>{user && <div>{user.name}</div>}</div>;
}

function SignInButton() {
  return <Button onClick={() => signIn()}>Sign in</Button>;
}
