import React, { useState, useEffect } from 'react';
import { Activity, Dumbbell, Calendar, Target, Flame, TrendingUp, Plus, X, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    workoutsThisWeek: 4,
    caloriesBurned: 2450,
    activeGoals: 3,
    streakDays: 14,
  });

  const [workouts, setWorkouts] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const [newWorkout, setNewWorkout] = useState({
    workoutType: 'Chest & Back Hypertrophy',
    durationMinutes: 45,
    caloriesBurned: 400,
    notes: '',
  });

  // Fetch dashboard data
  const fetchData = async () => {
    try {
      const [statsRes, workoutsRes, classesRes] = await Promise.all([
        api.getDashboardStats().catch(() => null),
        api.getWorkouts().catch(() => null),
        api.getClasses().catch(() => null),
      ]);

      if (statsRes && statsRes.success) {
        setStats({
          workoutsThisWeek: statsRes.data.workoutsThisWeek || 0,
          caloriesBurned: statsRes.data.caloriesBurned || 0,
          activeGoals: 3,
          streakDays: statsRes.data.streakDays || 14,
        });
      }

      if (workoutsRes && workoutsRes.success && workoutsRes.data) {
        setWorkouts(workoutsRes.data);
      }

      if (classesRes && classesRes.success && classesRes.data) {
        setClasses(classesRes.data);
      }
    } catch (err) {
      console.warn('Dashboard fetch notice:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogWorkout = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback('');

    try {
      const res = await api.logWorkout(newWorkout);
      if (res.success) {
        setFeedback('Workout logged successfully!');
        setNewWorkout({
          workoutType: 'Chest & Back Hypertrophy',
          durationMinutes: 45,
          caloriesBurned: 400,
          notes: '',
        });
        await fetchData();
        setTimeout(() => {
          setIsModalOpen(false);
          setFeedback('');
        }, 800);
      }
    } catch (err) {
      setFeedback('Failed to log workout: ' + (err.message || 'Error'));
    } finally {
      setSubmitting(false);
    }
  };

  const statCards = [
    { label: 'Workouts Logged', value: stats.workoutsThisWeek, icon: Dumbbell, color: 'text-gymGreen' },
    { label: 'Calories Burned', value: stats.caloriesBurned.toLocaleString(), icon: Flame, color: 'text-gymYellow' },
    { label: 'Active Goals', value: stats.activeGoals, icon: Target, color: 'text-blue-400' },
    { label: 'Streak Days', value: stats.streakDays, icon: Activity, color: 'text-red-400' },
  ];

  return (
    <div className="relative text-white min-h-screen bg-gymDark pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#090a0d] to-gymDark pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-gymGreen/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
              Welcome Back, <span className="text-gymGreen">{user?.name ? user.name.split(' ')[0] : 'Athlete'}</span>
            </h1>
            <p className="text-gray-400 text-sm">
              Here is your live workout activity and performance overview.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 md:mt-0 bg-gymYellow hover:bg-yellow-400 text-gymDark font-black px-6 py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-xl flex items-center gap-2 transform hover:scale-105"
          >
            <Plus className="h-4 w-4" /> Log New Workout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <TrendingUp className="h-4 w-4 text-gray-500" />
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activity Area: Recent Workouts */}
          <div className="lg:col-span-2 glass-dark p-6 sm:p-8 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-black uppercase tracking-wide text-white">Logged Workouts</h3>
                <p className="text-xs text-gray-400 mt-1">Stored in MySQL via Sequelize ORM</p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gymGreen bg-gymGreen/10 border border-gymGreen/20 px-3 py-1.5 rounded-full">
                {workouts.length} Recorded
              </span>
            </div>

            {workouts.length > 0 ? (
              <div className="space-y-3">
                {workouts.map((w) => (
                  <div
                    key={w.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-gymGreen/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-gymGreen/10 text-gymGreen">
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{w.workoutType}</h4>
                        {w.notes && <p className="text-xs text-gray-400 mt-0.5">{w.notes}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {w.durationMinutes} mins
                      </span>
                      <span className="text-gymYellow flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5" /> {w.caloriesBurned} kcal
                      </span>
                      <span className="text-gray-500">
                        {new Date(w.workoutDate || w.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-56 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-xl bg-black/20 text-center p-6">
                <Dumbbell className="h-8 w-8 text-gray-500 mb-2" />
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">No workouts logged yet</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-3 text-xs font-bold text-gymGreen hover:text-emerald-400 uppercase tracking-widest"
                >
                  + Click here to log your first workout
                </button>
              </div>
            )}
          </div>

          {/* Upcoming Classes Column */}
          <div className="glass-dark p-6 sm:p-8 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-gymGreen" />
              <h3 className="text-xl font-black uppercase tracking-wide text-white">Gym Classes</h3>
            </div>

            <div className="space-y-4">
              {classes.slice(0, 4).map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gymGreen/30 transition-colors group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-white group-hover:text-gymGreen transition-colors text-sm">
                      {cls.title}
                    </h4>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white/10 text-gray-300 px-2 py-0.5 rounded">
                      {cls.level}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                    <span>{cls.scheduleTime}</span>
                    <span className="font-semibold text-gymGreen">{cls.instructor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Log Workout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-dark border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gymYellow text-gymDark font-black">
                <Dumbbell className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-white tracking-wide">Log New Workout</h3>
                <p className="text-xs text-gray-400">Save exercise session to MySQL database</p>
              </div>
            </div>

            {feedback && (
              <div className="mb-4 p-3 rounded-xl bg-gymGreen/10 border border-gymGreen/30 text-gymGreen text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>{feedback}</span>
              </div>
            )}

            <form onSubmit={handleLogWorkout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                  Workout Type / Focus
                </label>
                <input
                  type="text"
                  value={newWorkout.workoutType}
                  onChange={(e) => setNewWorkout({ ...newWorkout, workoutType: e.target.value })}
                  placeholder="e.g. Legs & Calves, HIIT Cardio, Push Day"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gymGreen"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newWorkout.durationMinutes}
                    onChange={(e) => setNewWorkout({ ...newWorkout, durationMinutes: Number(e.target.value) })}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gymGreen"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                    Calories Burned
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newWorkout.caloriesBurned}
                    onChange={(e) => setNewWorkout({ ...newWorkout, caloriesBurned: Number(e.target.value) })}
                    required
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gymGreen"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                  Notes / Sets / Weight
                </label>
                <textarea
                  rows="2"
                  value={newWorkout.notes}
                  onChange={(e) => setNewWorkout({ ...newWorkout, notes: e.target.value })}
                  placeholder="e.g. Squats 4x10 @ 100kg, feeling energized"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gymGreen"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 bg-gymYellow hover:bg-yellow-400 text-gymDark font-black py-3.5 px-6 rounded-xl uppercase tracking-widest text-xs transition-all shadow-xl disabled:opacity-50"
              >
                {submitting ? 'Saving to Database...' : 'Save Workout'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
