/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function LiquidGlassBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden bg-[#05000A] select-none pointer-events-none">
      {/* Background Atmospheric Glows from Immersive UI theme */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full"></div>

      {/* Dynamic Grid Overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.5) 1px, transparent 0),
            linear-gradient(to right, rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px',
        }}
      />

      {/* Floating Shifting Gradients (Liquid Metal/Glass Look) */}
      <div className="absolute inset-0 w-full h-full filter blur-[120px] sm:blur-[160px] opacity-40 mix-blend-screen">
        {/* Violet Purple Orb */}
        <motion.div
          animate={{
            x: [0, 150, -100, 200, 0],
            y: [0, -120, 180, -200, 0],
            scale: [1, 1.25, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 opacity-60"
        />

        {/* Electric Blue Orb */}
        <motion.div
          animate={{
            x: [0, -180, 200, -100, 0],
            y: [0, 150, -120, 180, 0],
            scale: [1, 0.85, 1.2, 0.95, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 opacity-50"
        />

        {/* Hot Magenta/Teal Accents */}
        <motion.div
          animate={{
            x: [0, 100, -150, 50, 0],
            y: [0, 200, -80, -150, 0],
            scale: [0.8, 1.1, 0.85, 1.05, 0.8],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-gradient-to-tr from-cyan-600 to-purple-500 opacity-40"
        />
      </div>

      {/* Cybernetic Accent Lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-[16%] left-0 w-[400px] h-px bg-gradient-to-r from-purple-500/10 to-transparent" />
      <div className="absolute bottom-[30%] right-0 w-[400px] h-px bg-gradient-to-l from-cyan-500/10 to-transparent" />
    </div>
  );
}
