import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'signup' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP state (6 digits)
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [isResending, setIsResending] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const inputRefs = useRef([]);

  useEffect(() => {
    setMode(initialMode);
    setStep('credentials');
    setOtp(['', '', '', '', '', '']);
  }, [initialMode, isOpen]);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleOAuthLogin = (provider) => {
    // Simulated smooth OAuth handshake
    const dummyUser = {
      name: provider === 'Google' ? 'Alex Rivera' : 'alex-rivera-dev',
      email: provider === 'Google' ? 'alex.rivera@gmail.com' : 'alex@github.user',
      provider: provider.toLowerCase()
    };
    onAuthSuccess(dummyUser, true); // true = first time signup
  };

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    if (mode === 'signup') {
      // Trigger Email OTP Verification step
      setStep('otp');
      setTimer(45);
      setOtpError('');
    } else {
      // Login directly
      onAuthSuccess({
        name: email.split('@')[0],
        email: email,
        provider: 'email'
      }, false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = otp.join('');
    if (code.length < 6) {
      setOtpError('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onAuthSuccess({
        name: email.split('@')[0],
        email: email,
        provider: 'email'
      }, true); // First-time user needs to update basic details for resume
    }, 700);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setTimer(45);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }, 600);
  };

  const handleQuickFillOtp = () => {
    setOtp(['8', '4', '2', '9', '1', '0']);
    setOtpError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-extrabold text-sm">
            ▲
          </div>
          <span className="font-bold text-sm tracking-tight text-white">OmniApply AI</span>
        </div>

        {step === 'credentials' ? (
          <>
            {/* Modal Title */}
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {mode === 'signup' ? 'Create your account' : 'Welcome back'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {mode === 'signup' 
                  ? 'Start automating your tech applications today.' 
                  : 'Enter your credentials to access your dashboard.'}
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => handleOAuthLogin('Google')}
                className="w-full py-2.5 px-4 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-850 hover:border-zinc-700 text-sm font-semibold text-white transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"/>
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => handleOAuthLogin('GitHub')}
                className="w-full py-2.5 px-4 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-850 hover:border-zinc-700 text-sm font-semibold text-white transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <span className="relative px-3 bg-zinc-950 text-xs font-mono text-zinc-500 uppercase">
                or with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu or name@mail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
              >
                {mode === 'signup' ? 'Continue with OTP Verification' : 'Log In to Dashboard'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Login / Signup */}
            <div className="mt-6 text-center text-xs text-zinc-400">
              {mode === 'signup' ? (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="font-semibold text-white hover:underline underline-offset-4"
                  >
                    Log In
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="font-semibold text-white hover:underline underline-offset-4"
                  >
                    Sign Up Free
                  </button>
                </p>
              )}
            </div>
          </>
        ) : (
          /* OTP Verification Step */
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Verify Your Email
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                We've sent a 6-digit confirmation code to <span className="text-white font-mono">{email}</span>
              </p>
            </div>

            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-mono font-bold bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                />
              ))}
            </div>

            {otpError && (
              <p className="text-xs text-red-400 text-center font-medium">
                {otpError}
              </p>
            )}

            {/* Quick Demo Helper */}
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
                Test OTP Mode:
              </span>
              <button
                type="button"
                onClick={handleQuickFillOtp}
                className="font-mono text-xs font-semibold text-white underline hover:text-zinc-200"
              >
                Autofill 842910
              </button>
            </div>

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="w-full py-3 px-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Verifying Security Token...
                </>
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-900">
              <button
                type="button"
                onClick={() => setStep('credentials')}
                className="hover:text-white transition-colors"
              >
                &larr; Change email
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={timer > 0 || isResending}
                className="text-zinc-300 hover:text-white font-medium disabled:text-zinc-600 transition-colors"
              >
                {timer > 0 ? `Resend code in ${timer}s` : 'Resend Code'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
