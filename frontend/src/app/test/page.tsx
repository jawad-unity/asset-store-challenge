'use client';
import React, { useEffect, useRef, useState } from 'react';

const ScrollCarousel = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const sections = [
    {
      title: "Section One",
      description: "First section with engaging content that showcases our innovative approach to problem-solving",
      bgColor: "rgb(59, 130, 246)", // blue-500
      image: "https://picsum.photos/id/10/600/400" // Nature landscape
    },
    {
      title: "Section Two",
      description: "Second section with more details about our groundbreaking solutions and technologies",
      bgColor: "rgb(168, 85, 247)", // purple-500
      image: "https://picsum.photos/id/20/600/400" // Technology
    },
    {
      title: "Section Three",
      description: "Third section showcasing features that make our platform unique and powerful",
      bgColor: "rgb(34, 197, 94)", // green-500
      image: "https://picsum.photos/id/30/600/400" // Abstract
    },
    {
      title: "Section Four",
      description: "Fourth section with innovative solutions that drive real-world results",
      bgColor: "rgb(244, 63, 94)", // rose-500
      image: "https://picsum.photos/id/40/600/400" // City
    },
    {
      title: "Section Five",
      description: "Fifth section exploring possibilities and future innovations in our field",
      bgColor: "rgb(245, 158, 11)", // amber-500
      image: "https://picsum.photos/id/50/600/400" // Business
    }
  ];

  useEffect(() => {
    const observers = sections.map((_, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        {
          threshold: 0.6,
          rootMargin: "-10% 0px"
        }
      );
    });

    sectionsRef.current.forEach((section, index) => {
      if (section) {
        observers[index].observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          observers[index].unobserve(section);
        }
      });
    };
  }, []);

  const scrollToSection = (index: number) => {
    sectionsRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen overflow-y-auto">
      {/* Fixed background that changes color */}
      <div 
        className="fixed inset-0 transition-colors duration-1000 ease-in-out"
        style={{ backgroundColor: sections[activeSection].bgColor }}
      />
      
      {/* Navigation Dots */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-4">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110
                ${activeSection === index 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'}`}
              aria-label={`Navigate to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Fixed content container with split layout */}
      <div className="fixed inset-0 flex items-center justify-between px-20 pointer-events-none">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-between px-20
              transition-opacity duration-1000 ease-in-out
              ${activeSection === index ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Text content on the left */}
            <div className="w-1/2 text-white">
              <h2 className="text-5xl font-bold mb-6">
                {section.title}
              </h2>
              <p className="text-xl max-w-xl">
                {section.description}
              </p>
            </div>
            
            {/* Image on the right */}
            <div className="w-1/2 flex justify-center items-center">
              <img 
                src={section.image} 
                alt={`Illustration for ${section.title}`}
                className="max-w-lg max-h-lg object-contain rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Invisible scroll sections for triggering transitions */}
      <div className="relative">
        {sections.map((_, index) => (
          <div
            key={index}
            ref={(el) => { sectionsRef.current[index] = el; }}
            className="h-screen w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollCarousel;