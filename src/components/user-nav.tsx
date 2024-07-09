"use client";

import { logoutAction } from "@/actions/login/mutations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function UserNav() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="relative h-20 w-full rounded-sm bg-slate-300">
              <Avatar className="absolute bottom-[-10px] left-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            <div className="mt-4 flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">shadcn</p>
              <p className="text-xs leading-none text-muted-foreground">
                m@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Meu perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setShowDialog(true);
            }}
          >
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
        </DialogHeader>

        <DialogFooter className="mt-6 space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setShowDialog(false);
            }}
          >
            Cancelar
          </Button>
          <form
            action={async () => {
              await logoutAction();
            }}
          >
            <Button type="submit">Sair?</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
