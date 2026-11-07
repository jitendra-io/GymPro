import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Flame, Heart, Dumbbell } from 'lucide-react';
import api from '../services/api';

const DEFAULT_CLASSES = [
  {
    id: 1,
    title: 'HIIT Extreme',
    instructor: 'Marcus Johnson',
    scheduleTime: 'Mon, Wed, Fri - 6:00 AM',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80',
    description: 'High-intensity interval training designed to push your cardiovascular limits and burn maximum calories.',
  },
  {
    id: 2,
    title: 'Powerlifting Base',
    instructor: 'Alex Mercer',
    scheduleTime: 'Tue, Thu - 5:30 PM',
    level: 'All Levels',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    description: 'Focus on the big three: squat, bench, and deadlift. Build raw strength with expert form coaching.',
  },
  {
    id: 3,
    title: 'Zen Yoga Flow',
    instructor: 'Sarah Chen',
    scheduleTime: 'Weekends - 8:00 AM',
    level: 'Beginner Friendly',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    description: 'Improve flexibility, balance, and core strength through guided flows and deep stretching.',
  },
  {
    id: 4,
    title: 'Endurance Cycling',
    instructor: 'Emily Davis',
    scheduleTime: 'Mon, Wed - 7:00 PM',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
    description: 'Rhythm-based indoor cycling that will challenge your endurance and build lower body power.',
  },
];

export default function Classes() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState(DEFAULT_CLASSES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClasses() {
      try {
        const res = await api.getClasses();
        if (res.success && res.data && res.data.length > 0) {
          setClasses(res.data);
        }
      } catch (err) {
        console.warn('Using local class data fallback:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadClasses();
  }, []);

  return (
    <div className="relative text-white min-h-screen bg-gymDark">
      {/* Header */}
      <div className="relative pt-32 pb-20 px-4 text-center border-b border-white/5 bg-[#090a0d]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gymGreen/5 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white relative z-10">
          Our <span className="text-gymGreen">Classes</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4 relative z-10 text-sm">
          From high-intensity intervals to focused strength building, find the perfect class to challenge yourself and crush your goals.
        </p>
      </div>

      {/* Class Grid */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-gymGreen/30 transition-all duration-300 group flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden bg-black/40">
                <img
                  src={cls.image || 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80'}
                  alt={cls.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-gymDark via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-gymYellow text-gymDark text-xs font-black px-2.5 py-1 uppercase rounded-md tracking-wider">
                  {cls.level}
                </div>
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gymGreen mb-2">
                    <Flame className="h-5 w-5" />
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">{cls.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {cls.description}
                  </p>
                </div>
                <div className="space-y-2 mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center text-xs text-gray-300 font-bold uppercase tracking-wider">
                    <span className="text-gray-500 w-24">Instructor:</span> {cls.instructor}
                  </div>
                  <div className="flex items-center text-xs text-gray-300 font-bold uppercase tracking-wider">
                    <span className="text-gray-500 w-24">Schedule:</span> {cls.scheduleTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/essential')}
            className="bg-gymGreen hover:bg-emerald-400 text-gymDark font-black px-8 py-4 uppercase tracking-widest text-sm transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Go To Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
