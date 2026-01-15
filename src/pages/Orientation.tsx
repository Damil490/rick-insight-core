import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { hasUserContext } from "@/lib/storage";

const Orientation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (hasUserContext()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleContinue = () => {
    navigate("/context");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 animate-fade-in">
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Private Deal Infrastructure
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Prepared after your conversation to clarify process, decisions, and next steps.
            </p>
          </div>
          
          <button
            onClick={handleContinue}
            className="btn-primary w-full mt-8"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orientation;
