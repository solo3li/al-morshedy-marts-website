'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { fetchApi } from '../../src/utils/api';
import { useAuthStore } from '../../src/store/authStore';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  // Validation States
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // Check Name
  useEffect(() => {
    setIsNameValid(fullName.trim().length >= 3);
  }, [fullName]);

  // Check Email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  // Check Password
  useEffect(() => {
    setPasswordCriteria({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    });
  }, [password]);

  const passwordStrength = Object.values(passwordCriteria).filter(Boolean).length;
  const isFormValid = isNameValid && isEmailValid && passwordStrength === 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setError('');
    setIsLoading(true);

    try {
      const data = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ fullName, email, password }),
      });

      login(data.token, { email: data.email, fullName: data.fullName });
      router.push('/');
    } catch (err: any) {
      if (typeof err.message === 'string') {
        setError(err.message);
      } else if (Array.isArray(err.message)) {
        setError(err.message.map((e: any) => e.description).join(', '));
      } else {
        setError('حدث خطأ أثناء إنشاء الحساب');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 mb-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h1>
        <p className="text-gray-500">انضم إلينا الآن للتمتع بتجربة تسوق مميزة</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-start gap-2">
          <XCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 outline-none transition-colors ${fullName.length > 0 && !isNameValid ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'}`}
              placeholder="الاسم الكامل"
            />
            {fullName.length > 0 && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {isNameValid ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-400" />}
              </div>
            )}
          </div>
          {fullName.length > 0 && !isNameValid && (
             <p className="text-xs text-red-500 mt-1">يجب أن يتكون الاسم من 3 أحرف على الأقل</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 outline-none transition-colors ${email.length > 0 && !isEmailValid ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'}`}
              placeholder="example@email.com"
              dir="ltr"
            />
            {email.length > 0 && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {isEmailValid ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-400" />}
              </div>
            )}
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
          <div className="relative mb-2">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 outline-none transition-colors ${password.length > 0 && passwordStrength < 5 ? 'border-orange-300 focus:ring-orange-200' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'}`}
              placeholder="••••••••"
              dir="ltr"
            />
            {password.length > 0 && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {passwordStrength === 5 ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Lock className="w-5 h-5 text-orange-400" />}
              </div>
            )}
          </div>

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex gap-1 mb-2 h-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`flex-1 rounded-full ${i <= passwordStrength ? getStrengthColor() : 'bg-gray-200'}`}></div>
                ))}
              </div>
              <ul className="text-xs space-y-1 mt-3">
                <li className={`flex items-center gap-1 ${passwordCriteria.length ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordCriteria.length ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>}
                  6 أحرف على الأقل
                </li>
                <li className={`flex items-center gap-1 ${passwordCriteria.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordCriteria.uppercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>}
                  حرف كبير (A-Z)
                </li>
                <li className={`flex items-center gap-1 ${passwordCriteria.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordCriteria.lowercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>}
                  حرف صغير (a-z)
                </li>
                <li className={`flex items-center gap-1 ${passwordCriteria.number ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordCriteria.number ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>}
                  رقم (0-9)
                </li>
                <li className={`flex items-center gap-1 ${passwordCriteria.special ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordCriteria.special ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300"></div>}
                  رمز خاص (!@#$%)
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !isFormValid}
          className="w-full bg-rose-600 text-white py-2.5 rounded-lg hover:bg-rose-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          إنشاء الحساب
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 text-sm">
        لديك حساب بالفعل؟{' '}
        <Link href="/login" className="text-rose-600 font-medium hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
