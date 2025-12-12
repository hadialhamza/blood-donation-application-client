import { FaDroplet } from "react-icons/fa6";
import { TbActivityHeartbeat } from "react-icons/tb";

export default function BloodLineLogo() {
  return (
    <div className="group flex items-center gap-2 cursor-pointer">
      {/* Logo Icon */}
      <div className="relative">
        <div className="relative z-10 transition-transform duration-300 ease-spring group-hover:rotate-12 group-hover:scale-110">
          <FaDroplet className="w-9 h-9 text-red-600 drop-shadow-md" />
        </div>

        {/* Logo bg animation */}
        <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 absolute inset-0 bg-red-500/50 rounded-full animate-ping"></div>

        {/* Logo bg animation */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce opacity-80"></div>
      </div>

      {/* Logo Title */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none border-b-3 border-red-600 ">
            <span className="text-gradient">Blood</span>
            <span className="logo-title text-gray-900 dark:text-gray-200 font-bold drop-shadow-lg">
              Line
            </span>
          </h1>
        </div>

        {/* Logo Subtitle */}
        <div className="mt-1 text-[0.6rem] md:text-xs font-bold tracking-[0.2em] uppercase group-hover:text-red-500 transition-colors duration-300 text-gray-800 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <span className="logo-subtitle">• Save</span>
            <span>
              <TbActivityHeartbeat
                size={18}
                className="text-red-500 animate-heartbeat"
              />
            </span>
            <span className="logo-subtitle">Lives •</span>
          </div>
        </div>
      </div>
    </div>
  );
}
