import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, Activity, History, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [history, setHistory] = useState([]);
  const [saving, setSaving] = useState(false);

  // Load history from MySQL
  const loadHistory = async () => {
    try {
      const res = await api.getBmiHistory();
      if (res.success && res.data) {
        setHistory(res.data);
      }
    } catch (err) {
      console.warn('Could not load BMI history from backend:', err.message);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const calculateBMI = async (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      let cat = 'Obese';
      if (bmiValue < 18.5) cat = 'Underweight';
      else if (bmiValue >= 18.5 && bmiValue <= 24.9) cat = 'Normal weight';
      else if (bmiValue >= 25 && bmiValue <= 29.9) cat = 'Overweight';
      setCategory(cat);

      // Save to MySQL backend
      setSaving(true);
      try {
        await api.saveBmiRecord({ height: Number(height), weight: Number(weight) });
        await loadHistory();
      } catch (err) {
        console.warn('Error saving BMI record:', err.message);
      } finally {
        setSaving(false);
      }
    }
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setCategory('');
  };

  const getStatusColor = () => {
    if (category === 'Underweight') return 'text-blue-400 border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.3)]';
    if (category === 'Normal weight') return 'text-gymGreen border-gymGreen shadow-[0_0_15px_rgba(10,185,129,0.3)]';
    if (category === 'Overweight') return 'text-gymYellow border-gymYellow shadow-[0_0_15px_rgba(238,251,3,0.3)]';
    if (category === 'Obese') return 'text-red-500 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]';
    return 'text-white border-white/10';
  };

  return (
    <div className="relative text-white min-h-screen bg-gymDark flex flex-col items-center pt-28 pb-16 px-4">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gymGreen/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gymYellow/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10 my-8">
        {/* Left Side: Info */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-gymGreen">
            <Activity className="h-4 w-4" /> Assessment Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
            Check Your <br /><span className="text-gymYellow glow-text-yellow">Body Mass</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            Understanding your BMI is the first step towards a healthier you. Calculations are automatically recorded to your MySQL profile database.
          </p>

          <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">BMI Categories</h3>
            <ul className="space-y-3 text-xs text-gray-400 font-semibold tracking-wide">
              <li className="flex justify-between items-center"><span className="text-blue-400 font-bold">Underweight</span> <span>&lt; 18.5</span></li>
              <li className="flex justify-between items-center"><span className="text-gymGreen font-bold">Normal Weight</span> <span>18.5 - 24.9</span></li>
              <li className="flex justify-between items-center"><span className="text-gymYellow font-bold">Overweight</span> <span>25 - 29.9</span></li>
              <li className="flex justify-between items-center"><span className="text-red-500 font-bold">Obese</span> <span>30 or greater</span></li>
            </ul>
          </div>
        </div>

        {/* Right Side: Calculator Form */}
        <div className="glass-dark p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={calculateBMI} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 175"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white font-bold placeholder:font-normal focus:outline-none focus:border-gymGreen focus:ring-1 focus:ring-gymGreen transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 70"
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white font-bold placeholder:font-normal focus:outline-none focus:border-gymGreen focus:ring-1 focus:ring-gymGreen transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gymGreen hover:bg-emerald-400 text-gymDark font-black px-6 py-4 rounded-xl uppercase tracking-widest text-sm transition-all duration-300 shadow-xl flex justify-center items-center gap-2"
            >
              <Calculator className="h-5 w-5" /> {saving ? 'Saving...' : 'Calculate & Record'}
            </button>
          </form>

          {bmi && (
            <div className="mt-8 pt-8 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`text-center p-6 rounded-2xl border-2 transition-all duration-500 bg-black/40 ${getStatusColor()}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Your BMI is</p>
                <div className="text-5xl font-black mb-2">{bmi}</div>
                <div className="text-sm font-bold uppercase tracking-wider">{category}</div>
              </div>
              <button
                onClick={reset}
                className="mt-4 w-full text-center text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold flex justify-center items-center gap-1 transition-colors"
              >
                <RotateCcw className="h-3 w-3" /> Reset Calculator
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BMI Calculation History from MySQL */}
      {history.length > 0 && (
        <div className="max-w-5xl w-full mt-10 relative z-10">
          <div className="glass-dark p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <History className="h-5 w-5 text-gymGreen" />
              <h3 className="text-xl font-black uppercase text-white tracking-wide">Saved BMI History</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Height</th>
                    <th className="pb-3">Weight</th>
                    <th className="pb-3">BMI Score</th>
                    <th className="pb-3">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {history.map((rec) => (
                    <tr key={rec.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 text-gray-400">
                        {new Date(rec.recordedAt || rec.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-white">{rec.heightCm} cm</td>
                      <td className="py-3 text-white">{rec.weightKg} kg</td>
                      <td className="py-3 font-bold text-gymGreen">{rec.bmi}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-black bg-white/5 border border-white/10">
                          {rec.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
