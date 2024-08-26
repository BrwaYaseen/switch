import Link from "next/link";
import Actions from "./actions";
import { Logo } from "./logo";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 w-full h-20 z-[48] bg-[#252731] px-2
          lg:px-4 flex justify-between items-center shadow-sm"
    >
      <Link href="/">
        <div className="flex items-center gap-x-4 hover:opacity-75 transition">
          <div className=" bg-white rounded-full p-1 mr-10 shrink-0 lg:mr-0 lg:shrink">
            <Image src="/switch.png" alt="Logo" height="30" width="30" />
          </div>
          <div className={cn("", font.className)}>
            <p className=" text-xl font-semibold">Switch</p>
            <p className=" text-sm text-muted-foreground hidden lg:block">
              Creator Dashboard
            </p>
          </div>
        </div>
      </Link>
      <Actions />
    </nav>
  );
};

export default Navbar;
