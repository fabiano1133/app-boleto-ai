"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type DigitalAccountSummaryCardProps = {
  title: string;
  description: string;
  ammount: number;
};

export const DigitalAccountSummaryCard = ({
  title,
  description,
  ammount,
}: DigitalAccountSummaryCardProps) => {
  return (
    <Card className="h-[312px] w-[300px] max-w-sm bg-white shadow-sm border-muted hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base text-foreground">{title}</CardTitle>
          {true && (
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </div>
        <div className={`h-6 w-6`}>{"icon"}</div>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-green-600">{ammount}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{"Inluir Informações"}</p>
        {true && "component"}
      </CardFooter>
    </Card>
  );
};
