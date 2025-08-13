import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  PanelBottom,
  Package,
  Home,
  ShoppingBag,
  User,
  Receipt,
  Settings,
  Search,
  Calendar,
  Inbox,
} from "lucide-react";

import logo from "@/assets/logoPreto.png"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"


export function Header() {
  return (
    <div className="flex w-full bg-muted/40 ">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r  sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-5 mt-10 ">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className=" flex h-10 w-10 shrink-0 items-center justify-center 
                text-muted-foreground transition-colors hover:text-foreground">
                <Home className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Geral</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className=" flex h-10 w-10 shrink-0 items-center justify-center 
                text-muted-foreground transition-colors hover:text-foreground">
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Vendas</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className=" flex h-10 w-10 shrink-0 items-center justify-center 
                text-muted-foreground transition-colors hover:text-foreground">
                <User className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Clientes</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className=" flex h-10 w-10 shrink-0 items-center justify-center 
                text-muted-foreground transition-colors hover:text-foreground">
                <Receipt className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Titulos</TooltipContent>
          </Tooltip>
        </nav>
      </aside>

      <div className="w-full sm:hidden flex flex-col sm:py-4 sm:pl-14">
        <header
          className="w-full sticky top-0 z-30 flex h-14 items-center px-4 border-b gap-4 sm:static
        sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelBottom className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="sm:max-w-x">
              <nav className="grid gap-8 text-lg font-b p-5 text-black ">
                <Link
                  href="#"
                  className=""
                >
                  <img src={logo.src} alt="" className="w-auto h-12" />
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5  hover:text-foregroun"
                >
                  <Home className="h-5 w-5 transition-all  " />
                  Geral
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5  hover:text-foreground "
                >
                  <ShoppingBag className="h-5 w-5 transition-all" />
                  Vendas
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5  hover:text-foreground"
                >
                  <User className="h-5 w-5 transition-all" />
                  Clientes
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5  hover:text-foreground"
                >
                  <Receipt className="h-5 w-5 transition-all" />
                  Titulos
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <h2 className=" text-black">Menu</h2>
        </header>
      </div>
    </div>
  );
}
