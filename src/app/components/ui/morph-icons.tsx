"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  type AnimationPlaybackControls,
  type Transition,
} from "framer-motion";
import { cn } from "@/app/lib/utils";

/* ==========================================================================
   SHARED TRANSITIONS
   ========================================================================== */

export const defaultTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 25,
  mass: 0.8,
};

export const fluidTransition: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
  times: [0, 0.48, 1],
};

/* ==========================================================================
   BASE TYPES
   ========================================================================== */

export interface BaseMorphIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  children?: React.ReactNode;
}

export interface MorphStateIconProps extends Omit<
  BaseMorphIconProps,
  "children"
> {
  isActive: boolean;
  transition?: Transition;
}

export interface MorphActionIconProps extends Omit<
  BaseMorphIconProps,
  "children"
> {
  trigger: number;
  animationDuration?: number;
  isLoading?: boolean;
  onAnimationComplete?: () => void;
}

export type MorphIconProps = MorphStateIconProps;

/* ==========================================================================
   BASE SVG SHELL
   ========================================================================== */

export const MorphIcon = React.forwardRef<SVGSVGElement, BaseMorphIconProps>(
  ({ size = 20, className, children, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("overflow-visible shrink-0", className)}
        {...props}
      >
        {children}
      </svg>
    );
  },
);

MorphIcon.displayName = "MorphIcon";

/* ==========================================================================
   HAMBURGER <-> CROSS
   ========================================================================== */

export const AnimatedMenuIcon = React.forwardRef<SVGSVGElement, MorphIconProps>(
  ({ isActive, transition = fluidTransition, ...props }, ref) => {
    return (
      <MorphIcon ref={ref} {...props}>
        <motion.line
          initial={false}
          animate={{
            x1: isActive ? [4, 4, 5] : [5, 4, 4],
            y1: isActive ? [7, 12, 5] : [5, 12, 7],
            x2: isActive ? [20, 20, 19] : [19, 20, 20],
            y2: isActive ? [7, 12, 19] : [19, 12, 7],
          }}
          transition={transition}
        />

        <motion.line
          initial={false}
          animate={{
            x1: isActive ? [4, 4, 12] : [12, 4, 4],
            y1: [12, 12, 12],
            x2: isActive ? [20, 20, 12] : [12, 20, 20],
            y2: [12, 12, 12],
            opacity: isActive ? [1, 1, 0] : [0, 1, 1],
          }}
          transition={transition}
        />

        <motion.line
          initial={false}
          animate={{
            x1: isActive ? [4, 4, 5] : [5, 4, 4],
            y1: isActive ? [17, 12, 19] : [19, 12, 17],
            x2: isActive ? [20, 20, 19] : [19, 20, 20],
            y2: isActive ? [17, 12, 5] : [5, 12, 17],
          }}
          transition={transition}
        />
      </MorphIcon>
    );
  },
);

AnimatedMenuIcon.displayName = "AnimatedMenuIcon";

/* ==========================================================================
   PLAY <-> PAUSE
   ========================================================================== */

export const AnimatedPlayPauseIcon = React.forwardRef<
  SVGSVGElement,
  MorphIconProps
>(({ isActive, transition = defaultTransition, ...props }, ref) => {
  return (
    <MorphIcon ref={ref} {...props}>
      <motion.path
        initial={false}
        animate={{
          d: isActive
            ? "M6 5 L6 19 L11 19 L11 5 Z"
            : "M5 3 L19 12 L12 12 L5 7 Z",
        }}
        transition={transition}
      />

      <motion.path
        initial={false}
        animate={{
          d: isActive
            ? "M13 5 L13 19 L18 19 L18 5 Z"
            : "M5 17 L12 12 L19 12 L5 21 Z",
        }}
        transition={transition}
      />
    </MorphIcon>
  );
});

AnimatedPlayPauseIcon.displayName = "AnimatedPlayPauseIcon";

/* ==========================================================================
   SEARCH -> SEARCH WHEEL -> SEARCH
   ========================================================================== */

const SEARCH_RAY_COUNT = 8;
const SEARCH_STOP_DURATION = 0.3;
const SEARCH_SPIN_DURATION = 2;

export const AnimatedSearchCloseIcon = React.forwardRef<
  SVGSVGElement,
  MorphActionIconProps
>(
  (
    {
      trigger,
      animationDuration = 1100,
      isLoading,
      onAnimationComplete,
      ...props
    },
    ref,
  ) => {
    const [isAnimating, setIsAnimating] = React.useState(false);

    const rotation = useMotionValue(0);

    const spinAnimationRef = React.useRef<AnimationPlaybackControls | null>(
      null,
    );

    const stopAnimationRef = React.useRef<AnimationPlaybackControls | null>(
      null,
    );

    const animationTimeoutRef = React.useRef<number | null>(null);

    const isAnimatingRef = React.useRef(false);
    const isStoppingRef = React.useRef(false);

    const onCompleteRef = React.useRef(onAnimationComplete);

    React.useEffect(() => {
      onCompleteRef.current = onAnimationComplete;
    }, [onAnimationComplete]);

    const clearTimers = React.useCallback(() => {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }
    }, []);

    const stopAnimation = React.useCallback(() => {
      if (!isAnimatingRef.current || isStoppingRef.current) {
        return;
      }

      isStoppingRef.current = true;

      clearTimers();

      spinAnimationRef.current?.stop();
      spinAnimationRef.current = null;

      stopAnimationRef.current?.stop();

      const currentRotation = rotation.get();
      const stopRotation = currentRotation + 35;

      stopAnimationRef.current = animate(rotation, stopRotation, {
        duration: SEARCH_STOP_DURATION,
        ease: [0.16, 1, 0.3, 1],
        onComplete: () => {
          stopAnimationRef.current = null;

          isAnimatingRef.current = false;
          isStoppingRef.current = false;

          setIsAnimating(false);

          onCompleteRef.current?.();
        },
      });
    }, [clearTimers, rotation]);

    const startAnimation = React.useCallback(() => {
      clearTimers();

      spinAnimationRef.current?.stop();
      stopAnimationRef.current?.stop();

      spinAnimationRef.current = null;
      stopAnimationRef.current = null;

      isStoppingRef.current = false;
      isAnimatingRef.current = true;

      setIsAnimating(true);

      const currentRotation = rotation.get();

      spinAnimationRef.current = animate(
        rotation,
        [currentRotation, currentRotation + 360],
        {
          duration: SEARCH_SPIN_DURATION,
          ease: "linear",
          repeat: Infinity,
        },
      );
    }, [clearTimers, rotation]);

    /* Start a new animation whenever trigger changes. */
    React.useEffect(() => {
      if (trigger === 0) {
        return;
      }

      startAnimation();

      /*
       * No isLoading prop:
       * automatically finish after animationDuration.
       */
      if (isLoading === undefined) {
        const stopDelay = Math.max(
          0,
          animationDuration - SEARCH_STOP_DURATION * 1000,
        );

        animationTimeoutRef.current = window.setTimeout(() => {
          stopAnimation();
        }, stopDelay);
      }

      return () => {
        clearTimers();
      };
    }, [
      trigger,
      animationDuration,
      startAnimation,
      stopAnimation,
      clearTimers,
    ]);

    /*
     * Controlled loading mode.
     *
     * true  -> keep spinning
     * false -> stop
     *
     * undefined -> automatic timer mode
     */
    React.useEffect(() => {
      if (isLoading === false && isAnimatingRef.current) {
        stopAnimation();
      }
    }, [isLoading, stopAnimation]);

    /* Cleanup when the icon unmounts. */
    React.useEffect(() => {
      return () => {
        clearTimers();

        spinAnimationRef.current?.stop();
        stopAnimationRef.current?.stop();
      };
    }, [clearTimers]);

    const rays = React.useMemo(() => {
      return Array.from({ length: SEARCH_RAY_COUNT }, (_, index) => {
        const angle = index * 45;
        const radians = (angle * Math.PI) / 180;

        return {
          x1: 12 + Math.cos(radians) * 7,
          y1: 12 + Math.sin(radians) * 7,
          x2: 12 + Math.cos(radians) * 10,
          y2: 12 + Math.sin(radians) * 10,
        };
      });
    }, []);

    return (
      <MorphIcon ref={ref} {...props}>
        {/* Search circle */}
        <motion.circle
          cx="12"
          cy="12"
          initial={false}
          animate={{
            r: isAnimating ? 6 : 8,
          }}
          transition={{
            duration: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Search handle */}
        <motion.line
          initial={false}
          animate={{
            x1: 17.65,
            y1: 17.65,
            x2: isAnimating ? 17.65 : 21,
            y2: isAnimating ? 17.65 : 21,
            opacity: isAnimating ? 0 : 1,
          }}
          transition={{
            duration: 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Search wheel */}
        <motion.g
          initial={false}
          style={{
            rotate: rotation,
            transformOrigin: "12px 12px",
          }}
        >
          {rays.map((ray, index) => (
            <motion.line
              key={index}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              initial={false}
              animate={{
                opacity: isAnimating ? 1 : 0,
                pathLength: isAnimating ? 1 : 0,
              }}
              transition={{
                opacity: {
                  duration: 0.15,
                },
                pathLength: {
                  duration: 0.18,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
            />
          ))}
        </motion.g>
      </MorphIcon>
    );
  },
);

AnimatedSearchCloseIcon.displayName = "AnimatedSearchCloseIcon";

/* ==========================================================================
   SUN <-> MOON
   ========================================================================== */

const SUN_MOON_DOT_POSITIONS = [
  { cx: 12, cy: 2.5 },
  { cx: 18.72, cy: 5.28 },
  { cx: 21.5, cy: 12 },
  { cx: 18.72, cy: 18.72 },
  { cx: 12, cy: 21.5 },
  { cx: 5.28, cy: 18.72 },
  { cx: 2.5, cy: 12 },
  { cx: 5.28, cy: 5.28 },
];

export const AnimatedSunMoonIcon = React.forwardRef<
  SVGSVGElement,
  MorphIconProps
>(
  (
    {
      isActive,
      transition = {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
      ...props
    },
    ref,
  ) => {
    const maskId = React.useId();

    return (
      <MorphIcon ref={ref} {...props}>
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="100%" height="100%" fill="white" />

            <motion.circle
              initial={false}
              animate={{
                cx: isActive ? 17 : 25,
                cy: isActive ? 7 : -5,
                r: isActive ? 6.5 : 0,
              }}
              transition={transition}
              fill="black"
            />
          </mask>
        </defs>

        <motion.circle
          cx="12"
          cy="12"
          initial={false}
          animate={{
            r: isActive ? 9 : 5,
          }}
          transition={transition}
          mask={`url(#${maskId})`}
          fill="currentColor"
        />

        <motion.g
          initial={false}
          animate={{
            rotate: isActive ? 75 : 0,
          }}
          transition={transition}
          style={{
            transformOrigin: "12px 12px",
          }}
        >
          {SUN_MOON_DOT_POSITIONS.map((dot, index) => (
            <motion.circle
              key={index}
              cx={dot.cx}
              cy={dot.cy}
              r="1"
              fill="currentColor"
              initial={false}
              animate={{
                scale: isActive ? 0 : 1,
                opacity: isActive ? 0 : 1,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                delay: isActive ? 0 : index * 0.04,
              }}
              style={{
                transformOrigin: `${dot.cx}px ${dot.cy}px`,
              }}
            />
          ))}
        </motion.g>
      </MorphIcon>
    );
  },
);

AnimatedSunMoonIcon.displayName = "AnimatedSunMoonIcon";
