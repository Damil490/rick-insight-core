import rickPhoto from "@/assets/rick-photo.jpeg";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-8 py-5">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-foreground">
            Prepared for: {userName}
          </h1>
          <p className="text-sm text-muted-foreground">
            This environment reflects your context and may be updated with relevant clarifications.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
            <img
              src={rickPhoto}
              alt="Rick"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
