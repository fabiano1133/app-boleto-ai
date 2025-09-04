import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LoginPageButton = () => {
  return (
    <Button variant={"callToTest"} className="bg-blue-950" asChild>
      <Link href="/signup">Testar Grátis por 7 dias</Link>
    </Button>
  );
};
