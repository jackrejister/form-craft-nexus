
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, HelpCircle, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const Header = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  const isMobile = useMobile();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 transition-all ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="flex flex-1 items-center gap-4">
        {isMobile && toggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        )}

        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="rounded bg-primary p-1">
              <Layers className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">FormCraft</span>
          </div>
        </Link>

        <div className="relative ml-auto flex-1 md:grow-0 md:w-64 lg:w-96">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search forms..."
            className="pl-8 md:w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary" />
        </Button>

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full overflow-hidden"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

// Add missing imports
import { Menu, Layers, Search, LogOut } from "lucide-react";
