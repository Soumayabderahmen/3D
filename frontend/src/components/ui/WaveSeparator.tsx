const WaveSeparator = ({ flip = false, className = "" }: { flip?: boolean; className?: string }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}>
    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
      <path
        d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

export default WaveSeparator;
