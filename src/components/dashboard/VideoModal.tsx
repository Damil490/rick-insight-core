import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoId: string;
}

const VideoModal = ({ isOpen, onClose, title, videoId }: VideoModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-sm animate-fade-in">
        <div className="bg-card rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-base font-medium text-foreground pr-8 line-clamp-1">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <div className="aspect-[9/16] bg-black">
            <iframe
              src={`https://drive.google.com/file/d/${videoId}/preview`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
