
import React, { useState, useCallback } from 'react';
import type { WasteClassification } from './types';
import { analyzeWasteImage } from './services/geminiService';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import AnalysisResult from './components/AnalysisResult';
import Section from './components/Section';
import Footer from './components/Footer';
import { CameraIcon, SmartClassificationIcon, LeafIcon } from './constants';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/50 text-center transition-transform transform hover:-translate-y-2">
    <div className="flex justify-center items-center mb-4">
      <div className="bg-green-100 p-4 rounded-full">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{children}</p>
  </div>
);

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<WasteClassification | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setImageFile(file);
    setAnalysisResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setImageBase64(base64String);
      setMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleClearSelection = useCallback(() => {
    setImageFile(null);
    setImageBase64(null);
    setMimeType('');
    setAnalysisResult(null);
    setError(null);
  }, []);

  const handleAnalyzeClick = useCallback(async () => {
    if (!imageBase64) {
      setError("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeWasteImage(imageBase64, mimeType);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [imageBase64, mimeType]);

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href')?.substring(1);
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Header onNavLinkClick={handleSmoothScroll} />
      <main className="flex-grow container mx-auto px-4 pt-32 pb-8 md:pt-40 md:pb-12">
        
        {/* Hero Section */}
        <section className="text-center mb-24 md:mb-32">
            <div className="inline-block bg-green-200/50 text-green-800 text-sm font-medium mb-4 px-4 py-1 rounded-full">
              ♻️ AI-Powered Waste Classification
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
              Identify, Classify & Dispose
              <br />
              <span className="text-green-600">Waste Responsibly</span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-600">
              EcoScan uses cutting-edge AI technology to help you identify waste items, understand their recyclability, and learn the proper disposal methods – all while promoting sustainable living.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a href="#analyze" onClick={handleSmoothScroll} className="bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
                Try EcoScan Now
              </a>
              <a href="#about" onClick={handleSmoothScroll} className="bg-white text-slate-700 font-bold py-3 px-8 rounded-full shadow-md hover:bg-slate-100 border border-slate-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-200">
                Learn More
              </a>
            </div>
        </section>

        {/* Features Section */}
        <section className="mb-24 md:mb-32 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard icon={<CameraIcon className="w-8 h-8 text-green-600" />} title="Instant Recognition">
                Upload or capture an image of any waste item for immediate AI-powered identification.
              </FeatureCard>
              <FeatureCard icon={<SmartClassificationIcon className="w-8 h-8 text-green-600" />} title="Smart Classification">
                Get accurate categorization: recyclable, compostable, or non-recyclable with disposal guidelines.
              </FeatureCard>
              <FeatureCard icon={<LeafIcon className="w-8 h-8 text-green-600" />} title="Eco-Friendly Tips">
                Receive personalized sustainability tips to reduce waste and protect our environment.
              </FeatureCard>
            </div>
        </section>

        <div className="max-w-4xl mx-auto">
          {/* Main Function Section */}
          <div id="analyze" className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-slate-200 mb-16 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-2">Smart Waste Classifier</h2>
            <p className="text-center text-slate-500 mb-8">Upload or capture an image to identify and classify your waste item.</p>
            <FileUpload onFileSelect={handleFileSelect} selectedFile={imageFile} onClear={handleClearSelection} />
            <div className="text-center mt-6">
              <button
                onClick={handleAnalyzeClick}
                disabled={!imageFile || isLoading}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Waste'}
              </button>
            </div>
            <AnalysisResult result={analysisResult} isLoading={isLoading} error={error} />
          </div>

          {/* Other Sections */}
          <div className="space-y-4">
            <Section title="About EcoScan" id="about">
              <p>
                EcoScan was born out of a desire to tackle a common challenge: improper waste segregation. Many people are unaware of correct disposal methods, leading to environmental pollution. Our goal is to provide a simple, accessible tool that empowers everyone to make more informed decisions about waste management. By leveraging the power of AI, we aim to encourage responsible disposal habits and contribute to a more sustainable future.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
