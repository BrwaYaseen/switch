import { cn } from "@/lib/utils";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";

const font = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center">
      <div className="bg-white rounded-full p-1">
        <Image src="/switch.png" alt="logo" height="60" width="60" />
      </div>
      <div className="flex flex-col items-center">
        <p className={cn("text-xl font-bold", font.className)}>Switch</p>
      </div>
    </div>
  );
};
