import 'normalize.css'
import './App.css'
import './index.css'
import Header from './layout/Header';
import Footer from './layout/Footer';
import Rounting from './routes/Routing';
import { useState, useEffect, useCallback } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300'>
      <ScrollToTop />
      <Header />
      <main className='flex flex-col justify-center nunito-sans-regular pt-16 md:pt-24'>
        <div className='ContainerPrimary relative'>
          <Rounting />
        </div>
      </main>
      <Footer />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-30 w-12 h-12 rounded-2xl
                    bg-primary-500 text-white shadow-lg shadow-primary-500/30
                    flex items-center justify-center
                    hover:bg-primary-600 hover:shadow-xl hover:-translate-y-1
                    transition-all duration-400
                    ${showScrollTop
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
                    }`}
        aria-label="Volver arriba"
      >
        <FiArrowUp className="w-5 h-5" />
      </button>
    </div>
  )
}

export default App
