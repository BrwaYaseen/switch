import { cn } from "@/lib/utils";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className=" bg-white rounded-full p-1 mr-10 shrink-0 lg:mr-0 lg:shrink">
          <Image src="/switch.png" alt="Logo" height="30" width="30" />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className=" text-xl font-semibold">Switch</p>
          <p className=" text-xs text-muted-foreground ">Stream it</p>
        </div>
      </div>
    </Link>
  );
};
