import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  onClick: () => void;
}

const VideoCard = ({ title, thumbnail, onClick }: VideoCardProps) => {
  return (
    <div className="video-card group" onClick={onClick}>
      <div className="aspect-[9/16] relative overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg backdrop-blur-sm">
            <Play className="w-6 h-6 text-primary-foreground ml-1" />
          </div>
        </div>
      </div>
      <div className="p-4 bg-card">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default VideoCard;
