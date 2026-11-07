import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Target, Users, Zap, Shield, ChevronRight, Activity } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Target,
      title: 'Personal Training',
      desc: 'Work 1-on-1 with elite coaches to hit your strength, mobility, and weight goals fast.',
    },
    {
      icon: Activity,
      title: 'Fitness Programs',
      desc: 'Expertly designed training blocks for powerlifting, bodybuilding, athletic speed, and general wellness.',
    },
    {
      icon: Users,
      title: 'Group Classes',
      desc: 'High-energy, coach-led group sessions ranging from HIIT and yoga to Olympic lifting and spin.',
    },
    {
      icon: Shield,
      title: 'Nutrition Strategy',
      desc: 'Customized macro calculation, meal plans, and body composition analytics built for performance.',
    },
  ];

  return (
    <div className="relative text-white min-h-screen bg-gymDark">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-start overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('/gym_hero_bg.png')` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gymDark via-gymDark/70 to-transparent z-10" />
        
        {/* Accent green lights background */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gymGreen/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-20">
          <div className="max-w-2xl space-y-6">
            
            {/* Tagline */}
            <div className="flex items-center gap-2 text-gymGreen font-extrabold tracking-widest text-xs uppercase">
              <span className="h-[2px] w-8 bg-gymGreen inline-block"></span>
              Fitness & Gym
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-white">
              Discover <span className="text-white">Gympro</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Your Path To
              </span> <br />
              Health and Wellness
            </h1>

            {/* Sub-text */}
            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-lg">
              Unlock your body's full potential with top-tier trainers, professional equipment, and a world-class training atmosphere.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => navigate('/essential')}
                className="bg-gymYellow hover:bg-yellow-400 text-gymDark font-black px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 transform hover:scale-105 shadow-xl glow-yellow"
              >
                Join Us Today
              </button>
              <button
                onClick={() => navigate('/about')}
                className="border-2 border-gymYellow text-gymYellow hover:bg-gymYellow hover:text-gymDark font-black px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
              >
                About Us <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Quick stats panel */}
      <div className="bg-[#090a0d] border-y border-white/5 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-black text-gymGreen glow-text-yellow">15K+</p>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Active Members</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-black text-gymGreen glow-text-yellow">50+</p>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Certified Coaches</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-black text-gymGreen glow-text-yellow">120+</p>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Modern Equipment</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-black text-gymGreen glow-text-yellow">98%</p>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-gymDark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <h2 className="text-gymGreen font-extrabold tracking-widest text-xs uppercase">Why GYMPRO</h2>
            <h3 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">Push Your Limits</h3>
            <p className="text-gray-400 text-sm">We provide an all-inclusive space for health improvement, functional power, and competitive performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((item, idx) => (
              <div 
                key={idx} 
                className="glass p-8 rounded-2xl border border-white/5 hover:border-gymGreen/30 transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="bg-gymGreen/10 p-4 rounded-xl text-gymGreen inline-block mb-6 group-hover:bg-gymGreen group-hover:text-gymDark transition-all duration-300">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Quick BMI Callout */}
      <div className="bg-gradient-to-r from-gymDark via-gymCard to-gymDark py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-4 max-w-xl">
              <div className="inline-block bg-gymGreen/10 text-gymGreen font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                Interactive Tool
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Calculate Your BMI Instantly</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Body Mass Index is a key parameter to categorize your health. Calculate yours in seconds and let our system customize your GYMPRO training guidelines.
              </p>
            </div>
            <div>
              <button 
                onClick={() => navigate('/bmi')}
                className="bg-gymYellow hover:bg-yellow-400 text-gymDark font-bold px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 transform hover:scale-105 shadow-xl glow-yellow"
              >
                Open BMI Calculator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
