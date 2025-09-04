"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TicketCardProps {
  title: string;
  description?: string;
  count: number;
  footerText?: string;
  icon: React.ReactNode;
  onActionClick?: boolean;
  actionLabel?: string;
  component?: React.ReactNode;
}

export const TicketCard = ({
  title,
  count,
  description,
  footerText,
  icon,
  onActionClick,
  component,
}: TicketCardProps) => {
  return (
    <Card className="h-[302px] w-[440px] max-w-sm bg-white shadow-sm border-muted hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base text-foreground">{title}</CardTitle>
          {description && (
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          )}
        </div>
        <div className={`h-6 w-6`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-green-600">{count}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{footerText}</p>
        {onActionClick && component}
      </CardFooter>
    </Card>
  );
};
