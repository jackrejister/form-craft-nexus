
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
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative w-full cursor-pointer">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search forms..."
                  className="pl-8 md:w-full cursor-pointer"
                  readOnly
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Search Forms</DialogTitle>
                <DialogDescription>
                  Search for forms by title, description, or content
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Start typing to search..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Recent Searches</h4>
                  <ul className="space-y-1">
                    <li className="p-2 hover:bg-muted rounded-md cursor-pointer">
                      Customer Feedback Form
                    </li>
                    <li className="p-2 hover:bg-muted rounded-md cursor-pointer">
                      Event Registration
                    </li>
                    <li className="p-2 hover:bg-muted rounded-md cursor-pointer">
                      Contact Form
                    </li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>
                Your recent notifications and updates
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium">New Form Submission</h3>
                <p className="text-sm text-muted-foreground">
                  Customer Feedback Form has received a new submission
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  2 hours ago
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium">Form Shared</h3>
                <p className="text-sm text-muted-foreground">
                  Jane Smith shared a form with you: "Product Survey"
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Yesterday
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium">Integration Connected</h3>
                <p className="text-sm text-muted-foreground">
                  Your Google Sheets integration was connected successfully
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  3 days ago
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Help & Resources</DialogTitle>
              <DialogDescription>
                Get help with FormCraft features and functionality
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="border-b pb-4">
                <h3 className="font-medium">Documentation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Browse our comprehensive guides and tutorials
                </p>
                <Button variant="link" className="p-0 h-auto mt-1">
                  View Documentation
                </Button>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Watch step-by-step tutorials on form creation
                </p>
                <Button variant="link" className="p-0 h-auto mt-1">
                  Watch Videos
                </Button>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-medium">Contact Support</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Reach out to our support team for assistance
                </p>
                <Button variant="link" className="p-0 h-auto mt-1">
                  Get Support
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to="/profile">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/settings">
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
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
