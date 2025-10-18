import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
    const counterRef = useRef(null);
    const countersRef = useRef([]);

    useGSAP(() => {
        // Wait until layout/fonts are fully loaded before calculating ScrollTrigger positions
        if (document.readyState === "complete") {
            ScrollTrigger.refresh();
        } else {
            window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
        }

        // Loop through each counter card
        countersRef.current.forEach((counter, index) => {
            const numberElement = counter?.querySelector(".counter-number");
            if (!numberElement) return; // Prevent running if element not found

            const item = counterItems[index];

            // Initialize number text at 0 before animation starts
            gsap.set(numberElement, { innerText: 0 });

            // Create the GSAP animation for counting
            gsap.to(numberElement, {
                innerText: item.value,           // animate from 0 to target value
                duration: 2.5,                   // animation time in seconds
                ease: "power2.out",              // easing for smooth finish
                snap: { innerText: 1 },          // rounds to whole numbers
                scrollTrigger: {
                    trigger: counter,            // each card triggers its own animation
                    start: "top 85%",            // animation starts when card enters viewport
                    once: true,                  // play only once per scroll
                    // markers: true,             // uncomment for debugging trigger positions
                    invalidateOnRefresh: true,   // re-calculate on resize or layout changes
                },
                // Update the number text during animation (with suffix)
                onUpdate: () => {
                    const current = Math.round(Number(numberElement.innerText || 0));
                    numberElement.textContent = `${current}${item.suffix ? ` ${item.suffix}` : ""}`;
                },
                // Set the final number text after animation completes
                onComplete: () => {
                    numberElement.textContent = `${item.value}${item.suffix ? ` ${item.suffix}` : ""}`;
                },
            });
        });

        // Refresh ScrollTrigger after all animations are created to ensure accuracy
        requestAnimationFrame(() => ScrollTrigger.refresh());
    }, { scope: counterRef }); // Limit GSAP to this section only

    return (
        <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => el && (countersRef.current[index] = el)}
                        className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
                    >
                        <div className="counter-number text-white-50 text-5xl font-bold mb-2">
                            0 {item.suffix}
                        </div>
                        <div className="text-white-50 text-lg">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedCounter;
