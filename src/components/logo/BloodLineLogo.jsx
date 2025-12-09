import { BsDropletFill } from "react-icons/bs";
import { FaDroplet } from "react-icons/fa6";
import { TbActivityHeartbeat } from "react-icons/tb";

export default function BloodLineLogo() {
  return (
    <div className="flex items-center gap-">
      <div className="relative">
        <BsDropletFill className="text-red-500 w-10 h-10 md:w-10 md:h-10 hover:" />
        <FaDroplet className="absolute -top-1 left-6 text-red-500 w-5 h-5 z-30" />
      </div>
      <div className="flex flex-col items-center">
        <div className="text-2xl md:text-3xl font-semibold tracking-tight font-poppins">
          <span className="text-red-500">Blood</span>
          <span className="font-normal">Line</span>
        </div>
        <div className="flex items-center text-xs md:text-sm font-semibold tracking-widest uppercase">
          <div className="w-5 h-0.5 mr-1 bg-linear-to-l from-red-500 to-transparent" />
          SAVE
          <span>
            <TbActivityHeartbeat size={18} className="text-red-500" />
          </span>
          LIVES
          <div className="w-5 h-0.5 ml-1 bg-linear-to-r from-red-500 to-transparent" />
        </div>
      </div>
    </div>
  );
}
