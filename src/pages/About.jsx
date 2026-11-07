import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Users, Award, ChevronRight } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  const team = [
    {
      name: 'Alex Mercer',
      role: 'Head Strength Coach',
      exp: '10+ Years Exp',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
    },
    {
      name: 'Sarah Chen',
      role: 'Yoga & Mobility Instructor',
      exp: '8 Years Exp',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
    },
    {
      name: 'Marcus Johnson',
      role: 'HIIT & Conditioning',
      exp: '5 Years Exp',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
    },
  ];

  return (
    <div className="relative text-white min-h-screen bg-gymDark">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gymDark">
        <div className="absolute inset-0 bg-gymGreen/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gymGreen/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center pt-20">
          <div className="flex items-center justify-center gap-2 text-gymGreen font-extrabold tracking-widest text-xs uppercase mb-4">
            <span className="h-[2px] w-8 bg-gymGreen inline-block"></span>
            Who We Are
            <span className="h-[2px] w-8 bg-gymGreen inline-block"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
            About <span className="text-gymGreen">GYMPRO</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            We are more than just a gym. We are a community of individuals dedicated to pushing boundaries and achieving greatness.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-[#090a0d] border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight">
                Our <span className="text-gymGreen">Mission</span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm">
                At GYMPRO, our mission is to provide an elite training environment where everyone, from beginners to professional athletes, can reach their absolute peak. We believe in the power of discipline, community, and expert guidance.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="glass p-4 rounded-xl border border-white/5">
                  <Target className="h-6 w-6 text-gymGreen mb-2" />
                  <h4 className="font-bold text-white mb-1">Focus</h4>
                  <p className="text-xs text-gray-500">Unwavering dedication to your goals.</p>
                </div>
                <div className="glass p-4 rounded-xl border border-white/5">
                  <Users className="h-6 w-6 text-gymGreen mb-2" />
                  <h4 className="font-bold text-white mb-1">Community</h4>
                  <p className="text-xs text-gray-500">A tribe that sweats and grows together.</p>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-square rounded-2xl overflow-hidden glass p-2 border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" 
                  alt="Gym Equipment" 
                  className="w-full h-full object-cover rounded-xl filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gymYellow text-gymDark p-6 rounded-xl shadow-2xl font-black uppercase tracking-widest text-sm flex flex-col items-center justify-center glow-yellow transform rotate-3">
                <Award className="h-8 w-8 mb-2" />
                <span>Award Winning</span>
                <span className="text-xs font-bold text-gymDark/70 mt-1">Facility 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-gymDark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
            <h2 className="text-gymGreen font-extrabold tracking-widest text-xs uppercase">Expert Guidance</h2>
            <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-tight">Meet Our Coaches</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-gymGreen/30 transition-all duration-300 group">
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gymDark/20 group-hover:bg-transparent transition-all duration-300 z-10" />
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-black text-white mb-1 uppercase tracking-wide">{member.name}</h4>
                  <p className="text-gymGreen text-sm font-bold mb-3">{member.role}</p>
                  <div className="inline-block bg-white/5 px-3 py-1 rounded-full text-xs text-gray-400">
                    {member.exp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gymGreen text-gymDark py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Ready to Start Your Journey?
          </h2>
          <button
            onClick={() => navigate('/essential')}
            className="bg-gymDark text-white hover:bg-black font-black px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 shadow-xl inline-flex items-center gap-2 transform hover:scale-105"
          >
            Join GYMPRO Today <ChevronRight className="h-4 w-4 text-gymYellow" />
          </button>
        </div>
      </div>
    </div>
  );
}
