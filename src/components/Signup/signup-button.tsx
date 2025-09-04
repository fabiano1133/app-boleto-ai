import { Button } from "@/components/ui/button";

type LoginButtonProps = {
  disabled: boolean;
  children: React.ReactNode;
};

export default function SignupButton({ disabled, children }: LoginButtonProps) {
  return (
    <div className="">
      <Button
        className="w-full cursor-pointer"
        disabled={disabled}
        type="submit"
      >
        {children}
      </Button>
    </div>
  );
}
