import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasUserContext, saveUserContext } from "@/lib/storage";

const GOOGLE_DRIVE_VIDEO_ID = "1X1ajTMAmXO-xKZXqU1jlgtcK_rybZT4O";

const Context = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    situation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (hasUserContext()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.situation.trim()) {
      newErrors.situation = "Please share your current situation";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      saveUserContext(formData);
      navigate("/dashboard");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Construct the embed URL with autoplay parameters
  const videoEmbedUrl = `https://drive.google.com/file/d/${GOOGLE_DRIVE_VIDEO_ID}/preview`;

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-lg mx-auto space-y-10 animate-fade-in">
        {/* Video Section */}
        <div className="aspect-[9/16] max-h-[400px] mx-auto w-auto rounded-xl overflow-hidden shadow-video bg-video-card relative">
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-video-card">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <iframe
            src={videoEmbedUrl}
            className="w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title="Introduction Video"
            onLoad={() => setVideoLoaded(true)}
          />
        </div>
        
        <p className="text-center text-xs text-muted-foreground">
          Click the video to play
        </p>

        {/* Form Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Context for Personalization
            </h2>
            <p className="text-sm text-muted-foreground">
              Used only to tailor what you see next.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="input-field"
                placeholder="Your full name"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="input-field"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Your current situation or intent
              </label>
              <textarea
                value={formData.situation}
                onChange={(e) => handleChange("situation", e.target.value)}
                className="input-field min-h-[100px] resize-none"
                placeholder="Briefly describe what brings you here..."
              />
              {errors.situation && (
                <p className="text-sm text-destructive">{errors.situation}</p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full mt-6">
              Continue to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Context;
