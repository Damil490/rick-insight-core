const CALENDLY_URL = "https://calendly.com/rick-132/free-consultation-1?utm_source=schedule_from_linkedin&month=2026-01";

const CalendarTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        If and when it makes sense to continue, availability is below.
      </p>
      
      <div className="card-premium overflow-hidden" style={{ height: "700px" }}>
        <iframe
          src={CALENDLY_URL}
          className="w-full h-full border-0"
          title="Schedule a conversation"
        />
      </div>
    </div>
  );
};

export default CalendarTab;
