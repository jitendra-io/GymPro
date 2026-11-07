import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Dumbbell, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await login({ email, password });
      if (res.success) {
        setSuccessMsg('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/essential');
        }, 800);
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Could not connect to backend server. Make sure it is running on port 5005.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('jiten@gympro.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="relative min-h-screen bg-gymDark flex items-center justify-center px-4 pt-24 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gymGreen/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gymYellow/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Card */}
        <div className="glass-dark border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex bg-gymGreen p-3 rounded-2xl text-gymDark mb-4 glow-yellow">
              <Dumbbell className="h-8 w-8 transform -rotate-45" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white">
              Welcome <span className="text-gymGreen">Back</span>
            </h1>
            <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-semibold">
              Sign in to access your workout stats
            </p>
          </div>

          {/* Quick Demo Credentials Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-gymGreen/30 text-gymGreen py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              ⚡ Fill Demo Account (jiten@gympro.com)
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-gymGreen/10 border border-gymGreen/30 text-gymGreen text-xs font-semibold flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@gympro.com"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-gymGreen focus:ring-1 focus:ring-gymGreen transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 text-sm font-semibold focus:outline-none focus:border-gymGreen focus:ring-1 focus:ring-gymGreen transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gymYellow hover:bg-yellow-400 text-gymDark font-black py-4 px-6 rounded-xl uppercase tracking-widest text-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                'Signing In...'
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-400 font-semibold">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-gymGreen hover:text-emerald-400 font-bold uppercase tracking-wider ml-1">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

