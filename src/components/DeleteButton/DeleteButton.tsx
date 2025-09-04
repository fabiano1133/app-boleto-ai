"use client";

import { Button } from "../ui/button";

export const DeleteButton = () => {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button
        variant={"destructive"}
        className="cursor-pointer"
        onClick={() => console.log("Excluir")}
      >
        Excluir
      </Button>
    </div>
  );
};
