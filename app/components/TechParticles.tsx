"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TechParticles = () => {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 20 + 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-indigo-500/40 blur-[1px]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.8, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
            
            {/* Horizontal Flow Lines */}
            <div className="absolute inset-x-0 top-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent animate-shimmer"></div>
            <div className="absolute inset-x-0 top-2/3 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-shimmer" style={{ animationDelay: '2s' }}></div>
        </div>
    );
};
