"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; image: string; name: string; role: string }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 sm:p-10 rounded-3xl border border-[#D4D4D4]/70 dark:border-gray-800 shadow-md shadow-gray-200/30 dark:shadow-black/20 max-w-[320px] w-full bg-[#FAFAFA]/80 dark:bg-[#111111]/80 backdrop-blur-md" key={i}>
                  <div className="text-[15px] sm:text-base text-[#2D2D2D] dark:text-gray-300 font-light leading-relaxed">{text}</div>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="h-10 w-10 relative overflow-hidden rounded-full shadow-sm bg-gray-200 shrink-0">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="40px"
                        quality={50}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold tracking-tight leading-5 text-[#2D2D2D] dark:text-white text-sm">{name}</div>
                      <div className="leading-5 tracking-tight text-[#8E8E8E] dark:text-gray-400 text-[13px]">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
