import React from "react";

const GlobalBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Light Theme Background */}
      <div
        className="fixed inset-0 z-[-1] dark:hidden bg-[#fff5f5] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(254, 202, 202, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 228, 230, 0.35) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(252, 165, 165, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Dark Theme Background */}
      <div className="fixed inset-0 z-[-1] hidden dark:block bg-[#020617] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(239,68,68,0.4), transparent)`,
          }}
        />
      </div>

      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default GlobalBackground;
