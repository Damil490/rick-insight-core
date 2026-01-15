import { useState } from "react";

type ViewType = "seller" | "buyer";

const EconomicTab = () => {
  const [activeView, setActiveView] = useState<ViewType>("seller");
  const [dealSize, setDealSize] = useState("");
  const [timeline, setTimeline] = useState("");

  const estimatedCost = dealSize && timeline 
    ? Math.round(parseFloat(dealSize) * (parseFloat(timeline) / 12) * 0.08)
    : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sub-tabs */}
      <div className="flex gap-1 border-b border-border">
        <button
          onClick={() => setActiveView("seller")}
          className={`tab-button ${activeView === "seller" ? "tab-button-active" : ""}`}
        >
          Seller View
        </button>
        <button
          onClick={() => setActiveView("buyer")}
          className={`tab-button ${activeView === "buyer" ? "tab-button-active" : ""}`}
        >
          Buyer View
        </button>
      </div>

      {activeView === "seller" ? (
        <div className="max-w-xl space-y-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Estimated Deal Size ($)
              </label>
              <input
                type="number"
                value={dealSize}
                onChange={(e) => setDealSize(e.target.value)}
                className="input-field"
                placeholder="e.g., 500000"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Timeline (months)
              </label>
              <input
                type="number"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="input-field"
                placeholder="e.g., 6"
              />
            </div>
          </div>

          {estimatedCost !== null && (
            <div className="card-premium p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Estimated cost of delay</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  ${estimatedCost.toLocaleString()}
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">What changes with a structured process</p>
                <ul className="mt-3 space-y-2 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Reduced timeline uncertainty
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Clearer valuation expectations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Fewer failed negotiations
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-xl">
          <div className="card-premium p-6">
            <h3 className="text-base font-medium text-foreground mb-4">
              What a structured process provides
            </h3>
            <ul className="space-y-4 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Reduced uncertainty</p>
                  <p className="text-muted-foreground mt-0.5">
                    Clear milestones and expectations at each stage of the process.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Clearer steps</p>
                  <p className="text-muted-foreground mt-0.5">
                    Know exactly what documentation and decisions are needed when.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Fewer mistakes</p>
                  <p className="text-muted-foreground mt-0.5">
                    Avoid common pitfalls that delay or derail transactions.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Faster decisions</p>
                  <p className="text-muted-foreground mt-0.5">
                    Information organized to support timely, confident decisions.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EconomicTab;
