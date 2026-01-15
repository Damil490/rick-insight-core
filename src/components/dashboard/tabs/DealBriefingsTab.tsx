import { useState, useMemo, useEffect } from "react";
import { Search, Bell, BellOff, X, Check } from "lucide-react";
import VideoCard from "../VideoCard";
import VideoModal from "../VideoModal";
import { getUserContext } from "@/lib/storage";

import thumbEvaluate from "@/assets/thumb-evaluate.jpg";
import thumbMatters from "@/assets/thumb-matters.jpg";
import thumbNext from "@/assets/thumb-next.jpg";
import thumbTiming from "@/assets/thumb-timing.jpg";

const GOOGLE_DRIVE_VIDEO_ID = "1X1ajTMAmXO-xKZXqU1jlgtcK_rybZT4O";

const videos = [
  { id: "1", title: "How Richard Evaluates Opportunities", thumbnail: thumbEvaluate },
  { id: "2", title: "What Usually Matters at This Stage", thumbnail: thumbMatters },
  { id: "3", title: "What Typically Happens Next", thumbnail: thumbNext },
  { id: "4", title: "Timing vs Waiting: How Decisions Stall", thumbnail: thumbTiming },
];

const NOTIFICATION_KEY = "video_notifications_enabled";

const DealBriefingsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem(NOTIFICATION_KEY) === "true";
  });
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const userContext = getUserContext();

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    return videos.filter((v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleNotificationToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem(NOTIFICATION_KEY, String(newValue));
    
    if (newValue) {
      setShowNotificationPopup(true);
    }
  };

  useEffect(() => {
    if (showNotificationPopup) {
      const timer = setTimeout(() => {
        setShowNotificationPopup(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showNotificationPopup]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Search and Notification Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clarifications"
            className="input-field pl-12"
          />
        </div>
        
        <button
          onClick={handleNotificationToggle}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
            notificationsEnabled
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {notificationsEnabled ? (
            <Bell className="w-4 h-4" />
          ) : (
            <BellOff className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">
            {notificationsEnabled ? "Notifications On" : "Inform me of new videos"}
          </span>
        </button>
      </div>

      {/* Notification Popup */}
      {showNotificationPopup && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-card border border-border rounded-xl shadow-card-hover p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  You're all set!
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  You'll be informed at <span className="font-medium">{userContext?.email}</span> whenever Richard Morgan uploads a new video tailored to your needs.
                </p>
              </div>
              <button
                onClick={() => setShowNotificationPopup(false)}
                className="p-1 rounded hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No videos match your search.</p>
        </div>
      )}

      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        title={selectedVideo?.title || ""}
        videoId={GOOGLE_DRIVE_VIDEO_ID}
      />
    </div>
  );
};

export default DealBriefingsTab;
