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
      <main className='flex flex-col justify-center nunito-sans-regular pt-14 sm:pt-16 md:pt-20 lg:pt-24'>
        <div className='ContainerPrimary relative px-0'>
          <Rounting />
        </div>
      </main>
      <Footer />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30
                    w-10 h-10 sm:w-12 sm:h-12 rounded-2xl
                    bg-primary-500 text-white shadow-lg shadow-primary-500/30
                    flex items-center justify-center
                    hover:bg-primary-600 hover:shadow-xl hover:-translate-y-1
                    active:scale-90 transition-all duration-400
                    ${showScrollTop
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
                    }`}
        aria-label="Volver arriba"
      >
        <FiArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  )
}

export default App
