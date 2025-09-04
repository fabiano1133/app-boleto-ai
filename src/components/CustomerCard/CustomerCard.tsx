import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Mail, Phone } from "lucide-react";

export interface CustomerCardProps {
  name: string;
  email: string;
  mobilePhone: string;
}

export const CustomerCard = ({
  name,
  email,
  mobilePhone,
}: CustomerCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-start gap-3">
          <User />
          {name}
        </CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-3 justify-start mb-2">
          <Mail />
          {email}
        </p>
        <p className="flex items-center gap-3 justify-start mb-2">
          <Phone />
          {mobilePhone}
        </p>
      </CardContent>
      <CardFooter>
        <CardAction>Nova Cobrança</CardAction>
      </CardFooter>
    </Card>
  );
};
