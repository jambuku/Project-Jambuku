export function WaveTop() {
  return (
    <div className="relative -mt-[1px] leading-[0]">
      <svg viewBox="0 0 1440 90" className="block w-full" aria-hidden>
        <path fill="white" d="M0,64L80,58.7C160,53,320,43,480,58.7C640,75,800,117,960,128C1120,139,1280,117,1360,106.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"/>
      </svg>
    </div>
  );
}

export function DiagonalTop() {
  return (
    <div className="relative -mt-[1px]">
      <svg viewBox="0 0 1440 80" className="block w-full" aria-hidden>
        <polygon points="0,80 1440,0 1440,80 0,80" fill="white" />
      </svg>
    </div>
  );
}
