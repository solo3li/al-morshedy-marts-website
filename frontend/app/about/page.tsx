'use client';

import { useEffect, useState } from 'react';
import { Loader2, Info } from 'lucide-react';
import { fetchApi } from '../../src/utils/api';

export default function AboutPage() {
  const [aboutUsText, setAboutUsText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApi('/Settings/public');
      setAboutUsText(data.General_AboutUs || 'مرحباً بك في متجرنا. نسعى دائماً لتقديم الأفضل لعملائنا.');
    } catch (err) {
      console.error('Failed to load settings', err);
      setAboutUsText('عفواً، حدث خطأ أثناء تحميل البيانات.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">من نحن</h1>
        <p className="text-gray-500 text-lg">تعرف أكثر على قصتنا ورؤيتنا</p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-red-600" />
          </div>
        ) : (
          <div 
            className="prose prose-lg text-gray-700 max-w-none text-justify leading-relaxed"
            dangerouslySetInnerHTML={{ __html: aboutUsText.replace(/\n/g, '<br />') }}
          />
        )}
      </div>
    </div>
  );
}
