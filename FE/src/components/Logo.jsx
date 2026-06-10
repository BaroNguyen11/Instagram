// components/BaoGramLogo.jsx
const BaoGramLogo = ({ size = 40, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="baogramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      {/* Chat bubble */}
      <path
        d="
          M60 182
          C42 160, 38 126, 50 95
          C64 57, 102 34, 143 37
          C188 40, 222 74, 220 120
          C218 166, 181 200, 136 202
          C112 203, 92 197, 76 186
          L48 196
          L60 182
        "
        stroke="url(#baogramGradient)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Camera */}
      <rect
        x="84"
        y="82"
        width="88"
        height="88"
        rx="24"
        stroke="url(#baogramGradient)"
        strokeWidth="12"
      />

      <circle
        cx="128"
        cy="126"
        r="22"
        stroke="url(#baogramGradient)"
        strokeWidth="12"
      />

      <circle
        cx="157"
        cy="98"
        r="7"
        fill="url(#baogramGradient)"
      />
    </svg>
  );
};

export default BaoGramLogo;