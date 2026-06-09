'use client';

import { useEffect, useState } from 'react';
import { Loader2, Phone, Mail, MapPin, MessageCircle, Send, Facebook, Instagram } from 'lucide-react';
import { fetchApi } from '../../src/utils/api';

export default function ContactPage() {
  const [settings, setSettings] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApi('/Settings/public');
      setSettings(data);
    } catch (err) {
      console.error('Failed to load settings', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">تواصل معنا</h1>
        <p className="text-gray-500 text-lg">نحن هنا للإجابة على جميع استفساراتك وتلبية طلباتك</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-red-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">معلومات الاتصال المباشر</h3>
            
            <div className="space-y-6">
              {settings.General_ContactPhone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">الهاتف المباشر</h4>
                    <a href={`tel:${settings.General_ContactPhone}`} className="text-gray-600 hover:text-red-600 font-medium text-lg" dir="ltr">
                      {settings.General_ContactPhone}
                    </a>
                  </div>
                </div>
              )}

              {settings.General_ContactEmail && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">البريد الإلكتروني</h4>
                    <a href={`mailto:${settings.General_ContactEmail}`} className="text-gray-600 hover:text-red-600 font-medium">
                      {settings.General_ContactEmail}
                    </a>
                  </div>
                </div>
              )}

              {settings.General_ContactAddress && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">العنوان</h4>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      {settings.General_ContactAddress}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Media Links Card */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 flex flex-col justify-center h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">تواصل معنا عبر منصات التواصل</h3>
            <p className="text-gray-600 mb-8">يمكنك مراسلتنا مباشرة عبر تطبيقات المراسلة المفضلة لديك للرد بشكل أسرع.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settings.General_SocialWhatsapp && (
                <a 
                  href={`https://wa.me/${settings.General_SocialWhatsapp.replace(/\+/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white border border-green-200 hover:border-green-500 hover:shadow-md transition-all p-4 rounded-xl flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-gray-800 group-hover:text-green-600">واتساب</span>
                </a>
              )}

              {settings.General_SocialMessenger && (
                <a 
                  href={settings.General_SocialMessenger} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white border border-blue-200 hover:border-blue-500 hover:shadow-md transition-all p-4 rounded-xl flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-gray-800 group-hover:text-blue-600">ماسنجر</span>
                </a>
              )}

              {settings.General_SocialFacebook && (
                <a 
                  href={settings.General_SocialFacebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white border border-indigo-200 hover:border-indigo-500 hover:shadow-md transition-all p-4 rounded-xl flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-gray-800 group-hover:text-indigo-600">فيسبوك</span>
                </a>
              )}

              {settings.General_SocialInstagram && (
                <a 
                  href={settings.General_SocialInstagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white border border-pink-200 hover:border-pink-500 hover:shadow-md transition-all p-4 rounded-xl flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-gray-800 group-hover:text-pink-600">انستجرام</span>
                </a>
              )}
            </div>
            
            {!settings.General_SocialWhatsapp && !settings.General_SocialMessenger && !settings.General_SocialFacebook && !settings.General_SocialInstagram && (
              <div className="text-center py-6 text-gray-400">
                لم يتم إضافة روابط التواصل الاجتماعي بعد
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
