"use client";

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { X } from 'lucide-react';


// SVG Filter Component for Liquid Glass background refractions
const GlassFilter: React.FC = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

// MediaItemType defines the structure of a media item
interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
    details?: string;
    link?: string;
}
// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null); // Reference for video element
    const [isInView, setIsInView] = useState(false); // To track if video is in the viewport
    const [isBuffering, setIsBuffering] = useState(true);  // To track if video is buffering

    // Intersection Observer to detect if video is in view and play/pause accordingly
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting); // Set isInView to true if the video is in view
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current); // Start observing the video element
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current); // Clean up observer when component unmounts
            }
        };
    }, []);
    // Handle video play/pause based on whether the video is in view or not
    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return; // Don't play if video is not in view or component is unmounted

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play(); // Play the video if it's ready
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve; // Wait until the video can start playing
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    // Render either a video or image based on item.type

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <Image
            src={item.url}
            alt={item.title}
            className={`${className} object-cover cursor-pointer`}
            onClick={onClick}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={60}
        />
    );
};



// GalleryModal component displays the selected media item in a modal
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[]; // List of media items to display in the modal
}
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });  // Track the position of the dockable panel
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    // Parallax & Fade effects
    const { scrollY } = useScroll({ container: scrollContainerRef });
    const imageY = useTransform(scrollY, [0, 400], [0, 250]);
    const imageOpacity = useTransform(scrollY, [0, 200], [1, 0]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null; // Return null if the modal is not open

    return (
        <>
            <GlassFilter />
            {/* Main Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3, ease: "easeIn" } }}
                transition={{
                    duration: 0.45,
                    ease: [0.23, 1, 0.32, 1]
                }}
                className="fixed inset-0 w-full min-h-screen sm:h-[90vh] md:h-[600px] backdrop-blur-lg 
                          rounded-none sm:rounded-lg md:rounded-xl overflow-hidden z-10"
                style={{ 
                    willChange: 'transform, opacity', 
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                }}

            >
                {/* Main Content */}
                <div className="h-full flex flex-col">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center bg-transparent">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full max-w-[95%] sm:max-w-[85%] md:max-w-3xl 
                                         h-auto max-h-[85vh] rounded-3xl flex flex-col"
                                style={{
                                    boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
                                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
                                    willChange: 'transform, opacity'
                                }}
                                initial={{ y: 20, scale: 0.97, opacity: 0 }}
                                animate={{
                                    y: 0,
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        duration: 0.5,
                                        ease: [0.23, 1, 0.32, 1]
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 15,
                                    scale: 0.98,
                                    transition: { duration: 0.25, ease: "easeOut" }
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Liquid Glass Background Layers */}
                                <div
                                    className="absolute inset-0 z-0 rounded-3xl"
                                    style={{
                                        backdropFilter: "blur(0px)",
                                        filter: "url(#glass-distortion)",
                                        isolation: "isolate",
                                    }}
                                />
                                <div
                                    className="absolute inset-0 z-0 rounded-3xl"
                                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                                />
                                <div
                                    className="absolute inset-0 z-10 rounded-3xl pointer-events-none"
                                    style={{
                                        boxShadow: "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
                                    }}
                                />

                                {/* Scrollable Container */}
                                <div 
                                    className="relative w-full h-full overflow-y-auto overflow-x-hidden z-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                                    ref={scrollContainerRef}
                                    onScroll={(e) => {
                                        const target = e.currentTarget;
                                        if (target.scrollHeight > target.clientHeight && target.scrollHeight - target.scrollTop <= target.clientHeight + 1) {
                                            onClose();
                                        }
                                    }}
                                >
                                    <motion.div 
                                        className="relative w-full aspect-[16/9] shrink-0 z-0 origin-top"
                                        style={{ y: imageY, opacity: imageOpacity }}
                                    >
                                        <MediaItem item={selectedItem} className="w-full h-full object-contain" onClick={onClose} />
                                    </motion.div>
                                    <div 
                                        className="relative p-6 sm:p-8 md:p-10 bg-transparent z-10 min-h-[50vh] flex flex-col"
                                    >
                                        <h3 className="text-gray-900 dark:text-white text-2xl sm:text-3xl font-bold mb-4">
                                            {selectedItem.title}
                                        </h3>
                                        <div className="text-gray-800 dark:text-gray-200 text-base sm:text-lg whitespace-pre-line leading-relaxed mb-8 flex-1">
                                            {selectedItem.details || selectedItem.desc}
                                        </div>
                                        {selectedItem.link && selectedItem.link !== '#' && (
                                            <div>
                                                <a 
                                                    href={selectedItem.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block px-8 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white font-semibold rounded-xl transition-all shadow-md hover:scale-105"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    View GitHub Project
                                                </a>
                                            </div>
                                        )}
                                        
                                        {/* Spacer to require intentional over-scrolling to close */}
                                        <div className="h-[45vh] w-full flex items-end justify-center pb-8 opacity-40">
                                            <span className="text-sm tracking-widest uppercase font-semibold">Keep scrolling to close</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Dock */}
                <motion.div
                    className="absolute z-50 top-2 sm:top-2.5 md:top-3 right-12 sm:right-14 md:right-16"
                >
                    <div className="relative rounded-full p-1 sm:p-1.5 flex flex-row items-center shadow-md">
                        {/* Liquid Glass Background Layers */}
                        <div
                            className="absolute inset-0 z-0 rounded-full"
                            style={{
                                backdropFilter: "blur(0px)",
                                filter: "url(#glass-distortion)",
                                isolation: "isolate",
                            }}
                        />
                        <div
                            className="absolute inset-0 z-0 rounded-full"
                            style={{ background: "rgba(255, 255, 255, 0.05)" }}
                        />
                        <div
                            className="absolute inset-0 z-10 rounded-full pointer-events-none"
                            style={{
                                boxShadow: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.4), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.4)",
                            }}
                        />

                        <div className="relative z-20 flex flex-row items-center -space-x-2 px-2">
                            {mediaItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedItem(item);
                                    }}
                                    style={{
                                        zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                    }}
                                    className={`
                                        relative group
                                        w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 
                                        rounded-full overflow-hidden 
                                        cursor-pointer hover:z-20
                                        ${selectedItem.id === item.id
                                            ? 'ring-2 ring-white/90 shadow-lg'
                                            : 'hover:ring-2 hover:ring-white/40'}
                                    `}
                                    initial={{ rotate: index % 2 === 0 ? -10 : 10 }}
                                    animate={{
                                        scale: selectedItem.id === item.id ? 1.25 : 1,
                                        rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -10 : 10,
                                        y: selectedItem.id === item.id ? -2 : 0,
                                    }}
                                    whileHover={{
                                        scale: 1.3,
                                        rotate: 0,
                                        y: -4,
                                        transition: { type: "spring", stiffness: 400, damping: 25 }
                                    }}
                                >
                                    <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                    className="absolute top-2 sm:top-2.5 md:top-3 right-2 sm:right-2.5 md:right-3 
                              p-2 sm:p-2.5 rounded-full flex items-center justify-center
                              text-gray-900 dark:text-white backdrop-blur-md shadow-md z-50"
                    style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        boxShadow: "inset 1px 1px 1px 0 rgba(255, 255, 255, 0.4), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.4)",
                    }}
                    onClick={onClose}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className='w-3 h-3 sm:w-4 sm:h-4' />
                </motion.button>
            </motion.div>
        </>
    );
};



interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div className="container mx-auto px-4 py-2 max-w-5xl">
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                className={`relative overflow-hidden rounded-xl cursor-move ${item.span}`}
                                style={{ willChange: 'transform' }}
                                onClick={() => !isDragging && setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                            delay: index * 0.05
                                        }
                                    }
                                }}
                                whileHover={{ scale: 1.02 }}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={1}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={(e, info) => {
                                    setIsDragging(false);
                                    const moveDistance = info.offset.x + info.offset.y;
                                    if (Math.abs(moveDistance) > 50) {
                                        const newItems = [...items];
                                        const draggedItem = newItems[index];
                                        const targetIndex = moveDistance > 0 ?
                                            Math.min(index + 1, items.length - 1) :
                                            Math.max(index - 0, 0); // fixed bounds issue safely mapped from prompt
                                        newItems.splice(index, 1);
                                        newItems.splice(targetIndex, 0, draggedItem);
                                        setItems(newItems);
                                    }
                                }}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full"
                                    onClick={() => !isDragging && setSelectedItem(item)}
                                />
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 opacity-0 hover:opacity-100 transition-opacity duration-200"
                                >
                                    <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;
