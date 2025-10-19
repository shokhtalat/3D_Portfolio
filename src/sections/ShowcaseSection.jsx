import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
    const sectionRef = useRef(null);
    const rydeRef = useRef(null);
    const libraryRef = useRef(null);
    const ycDirectoryRef = useRef(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );

        // Animations for each app showcase
        const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                    },
                }
            );
        });
    }, []);

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <div className="w-full">
                <div className="showcaselayout">
                    <div ref={rydeRef} className="first-project-wrapper">
                        <div className="image-wrapper">
                            <img src="/images/image2.png" alt="Ryde App Interface" />
                        </div>
                        <div className="text-content">
                            <h2>
                                Two Wheelers — Making Motorcycle Buying Simple, Fast, and Reliable.
                            </h2>
                            <p className="text-white-50 md:text-xl">
                                A full-stack platform built with Next.js, GraphQL, and NestJS for a fast, reliable, and scalable experience.
                            </p>
                        </div>
                    </div>

                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" >
                            <div className="image-wrapper bg-[#FFEFDB]">
                                <img
                                    src="/images/imageS.png"
                                    alt="Stock App Interface"
                                />
                            </div>
                            <h2>A live stock tracking app featuring smart alerts, interactive charts, and AI-powered insights.</h2>
                        </div>

                        <div className="project" ref={ycDirectoryRef}>
                            <div className="image-wrapper bg-[#FFE7EB]">
                                <img src="/images/image0.png" alt="Organick" />
                            </div>
                            <h2>Organick online shop</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppShowcase;


