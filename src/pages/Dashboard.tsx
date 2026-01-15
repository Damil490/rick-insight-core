import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserContext } from "@/lib/storage";
import DashboardSidebar, { TabType } from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DealBriefingsTab from "@/components/dashboard/tabs/DealBriefingsTab";
import ExperienceTab from "@/components/dashboard/tabs/ExperienceTab";
import EconomicTab from "@/components/dashboard/tabs/EconomicTab";
import CalendarTab from "@/components/dashboard/tabs/CalendarTab";

const tabTitles: Record<TabType, string> = {
  briefings: "Deal Briefings",
  experience: "Relevant Experience",
  economic: "Economic Perspective",
  calendar: "Next Conversation",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("briefings");
  const userContext = getUserContext();

  useEffect(() => {
    if (!userContext) {
      navigate("/", { replace: true });
    }
  }, [userContext, navigate]);

  if (!userContext) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case "briefings":
        return <DealBriefingsTab />;
      case "experience":
        return <ExperienceTab />;
      case "economic":
        return <EconomicTab />;
      case "calendar":
        return <CalendarTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader userName={userContext.fullName} />
        
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {tabTitles[activeTab]}
            </h2>
          </div>
          
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
