import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AlreadyAccountButton = () => {
  return (
    <Button variant={"alreadyAccount"} asChild>
      <Link href="/auth/sign-in">Já possuo uma conta</Link>
    </Button>
  );
};
