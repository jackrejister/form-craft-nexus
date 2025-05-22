
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Folder,
  Home,
  Settings,
  Users,
  FileText,
  Link,
  BarChart2,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={cn(
        "flex items-center py-2 px-3 rounded-md transition-colors group",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
      )}
    >
      <div className="flex items-center justify-center w-5 h-5 mr-3">{icon}</div>
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      {isCollapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-popover rounded-md text-xs invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 shadow-md">
          {label}
        </span>
      )}
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md text-primary-foreground font-bold">
              F
            </div>
            <h1 className="text-xl font-bold">FormCraft</h1>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center w-8 h-8 mx-auto bg-primary rounded-md text-primary-foreground font-bold">
            F
          </div>
        )}
      </div>

      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NavItem
          icon={<Home size={16} />}
          label="Dashboard"
          to="/"
          isCollapsed={collapsed}
        />
        <NavItem
          icon={<FileText size={16} />}
          label="Forms"
          to="/forms"
          isCollapsed={collapsed}
        />
        <NavItem
          icon={<Users size={16} />}
          label="Responses"
          to="/responses"
          isCollapsed={collapsed}
        />
        <NavItem
          icon={<Link size={16} />}
          label="Integrations"
          to="/integrations"
          isCollapsed={collapsed}
        />
        <NavItem
          icon={<BarChart2 size={16} />}
          label="Analytics"
          to="/analytics"
          isCollapsed={collapsed}
        />
        <NavItem
          icon={<Folder size={16} />}
          label="Templates"
          to="/templates"
          isCollapsed={collapsed}
        />
      </div>

      <div className="border-t border-border p-3">
        <NavItem
          icon={<Settings size={16} />}
          label="Settings"
          to="/settings"
          isCollapsed={collapsed}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full mt-2 flex items-center justify-center"
        >
          <PanelLeft size={16} className={collapsed ? "rotate-180" : ""} />
          {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
