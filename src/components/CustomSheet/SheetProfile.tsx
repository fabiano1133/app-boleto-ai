import { LogOut, Mail, Phone, CircleUserRound, DollarSign } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { signout } from "@/app/auth/sign-in/action";
import { JwtPayload } from "@/api/auth/ultils";

interface SheetProfileProps {
  user?: JwtPayload | null;
}

export default function SheetProfile({ user }: SheetProfileProps) {
  return (
    <Sheet>
      <SheetTrigger
        className="cursor-pointer"
        aria-label="Abrir perfil do usuário"
      >
        <CircleUserRound className="size-8 text-green-400 stroke-1" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            Olá {user?.name}
          </SheetTitle>
          <SheetDescription>
            Gerencie sua conta ou saia da plataforma.
          </SheetDescription>
        </SheetHeader>
        <div className="flex p-5">
          <div className="mt-6 space-y-2 text-sm">
            <p className="font-medium">
              <Mail className="text-blue-950" />
            </p>
            <p className="text-muted-foreground">{user?.email}</p>

            <p className="font-medium mt-4">
              <Phone className="text-blue-950" />
            </p>
            <p className="text-muted-foreground">{user?.mobilePhone}</p>

            <p className="font-medium mt-4">
              <DollarSign className="text-blue-950" />
            </p>
            <p className="text-muted-foreground">
              {!user?.isSubscriber ? "Free" : "Premium"}
            </p>
          </div>
        </div>
        <SheetFooter className="flex-row">
          <Button
            variant="destructive"
            onClick={signout}
            className="w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
