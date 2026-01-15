import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import VideoCard from "../VideoCard";
import VideoModal from "../VideoModal";

const GOOGLE_DRIVE_VIDEO_ID = "1X1ajTMAmXO-xKZXqU1jlgtcK_rybZT4O";

const videos = [
  { id: "1", title: "How Richard Evaluates Opportunities" },
  { id: "2", title: "What Usually Matters at This Stage" },
  { id: "3", title: "What Typically Happens Next" },
  { id: "4", title: "Timing vs Waiting: How Decisions Stall" },
];

const DealBriefingsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    return videos.filter((v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search clarifications"
          className="input-field pl-12"
        />
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
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
