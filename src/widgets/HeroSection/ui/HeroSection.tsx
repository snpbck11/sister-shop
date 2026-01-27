"use client";

import { ROUTES } from "@/shared/config/routes";
import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="w-full bg-background p-5 lg:px-12.5 lg:py-7.5 overflow-hidden">
      <div className="shadow-[0_2rem_5rem_-2.5rem_rgba(0,0,0,0.25),0_0.3rem_0.5rem_-0.4rem_rgba(0,0,0,0.4)] dark:shadow-[0_2rem_5rem_-2.5rem_rgba(255,255,255,0.15),0_0.3rem_0.5rem_-0.4rem_rgba(255,255,255,0.2)] md:shadow-none md:dark:shadow-none lg:overflow-hidden">
        <div className="relative bg-[linear-gradient(to_top,#000000a6,#36363633)]">
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_top,#040404a6,#36363633)] z-10"></div>
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              scale: { duration: 0.7, ease: "linear" },
              opacity: { duration: 2, ease: "linear" },
            }}
            className="w-full h-full aspect-4/5 sm:aspect-square md:aspect-auto">
            <Image
              src="/chokers.png"
              alt="Фото на главной"
              width={1600}
              height={600}
              priority
              className="w-full h-full object-contain hidden md:block"
            />
            <Image
              src="/parnie.png"
              alt="Фото на главной"
              width={550}
              height={680}
              priority
              className="w-full h-full object-cover md:hidden"
            />
          </motion.div>
        </div>

        <div
          className={cn(
            "md:absolute md:top-[20%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-20%]",
            "lg:top-[30%] lg:translate-y-[-30%]",
            "2xl:top-[50%] 2xl:translate-y-[-50%]",
            "text-center w-full md:max-w-md z-20 px-4 py-2 md:py-0",
          )}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-foreground md:text-white md:drop-shadow-lg tracking-wide uppercase ">
            Не соглашайтесь на посредственность
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="mt-4 mb-5 text-2xl tracking-widest text-foreground md:text-white md:drop-shadow-lg uppercase drop-shadow-lg">
            Откройте для себя уникальные чокеры, которые подчеркнут вашу индивидуальность и стиль.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}>
            <ButtonLink
              href={ROUTES.collections.allDesigns}
              prefetch
              variant="white"
              text="Купить сейчас"
              className="hidden md:inline-block"
            />
            <ButtonLink
              href={ROUTES.collections.allDesigns}
              prefetch
              variant="primary"
              text="Купить сейчас"
              className="md:hidden"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
