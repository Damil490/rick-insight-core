import { PlayCircle, Users, TrendingUp, Calendar } from "lucide-react";

export type TabType = "briefings" | "experience" | "economic" | "calendar";

interface DashboardSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const navItems: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "briefings", label: "Deal Briefings", icon: PlayCircle },
  { id: "experience", label: "Relevant Experience", icon: Users },
  { id: "economic", label: "Economic Perspective", icon: TrendingUp },
  { id: "calendar", label: "Next Conversation", icon: Calendar },
];

const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <h2 className="text-sm font-semibold text-sidebar-foreground tracking-wide uppercase opacity-60">
          Navigation
        </h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`sidebar-nav-item w-full ${
                isActive ? "sidebar-nav-item-active" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          Private Environment
        </p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
