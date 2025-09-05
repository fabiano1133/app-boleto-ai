import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AlreadyAccountButton = () => {
  return (
    <Button variant={"alreadyAccount"} asChild>
      <Link href="/dashboard">Já possuo uma conta</Link>
    </Button>
  );
};
