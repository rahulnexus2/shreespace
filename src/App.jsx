import { useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import ContactModal from './components/sections/ContactModal';

// lazy load below-the-fold sections
const About        = lazy(() => import('./components/sections/About'));
const Services     = lazy(() => import('./components/sections/Services'));
const Projects     = lazy(() => import('./components/sections/Projects'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const Footer       = lazy(() => import('./components/sections/Footer'));

const App = () => {
  const [activeType, setActiveType] = useState(null);
  const openModal  = (type) => setActiveType(type);
  const closeModal = () => setActiveType(null);

  return (
    <ThemeProvider>

      <Helmet>
        <title>Navasha Tech | Digital Agency</title>
        <meta name="description" content="Navasha Tech is a full-service digital agency specializing in web development, UI/UX design, cloud solutions and DevOps." />
        <meta name="keywords" content="web development, UI/UX design, cloud, DevOps, digital agency, Navasha Tech" />
        <meta name="author" content="Navasha Tech" />
        <link rel="canonical" href="https://shreespace.vercel.app" />
        <meta property="og:title" content="Navasha Tech | Digital Agency" />
        <meta property="og:description" content="Building modern digital experiences that elevate brands and drive results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shreespace.vercel.app" />
        <meta property="og:image" content="https://shreespace.vercel.app/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Navasha Tech | Digital Agency" />
        <meta name="twitter:description" content="Building modern digital experiences that elevate brands and drive results." />
        <meta name="twitter:image" content="https://shreespace.vercel.app/og-image.png" />
      </Helmet>

     <Navbar
      onContactClick={() => openModal('Query')}
      onFeedbackClick={() => openModal('Feedback')}
      />

      <main>
        <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load hero.</p>}>
          <Hero onContactClick={() => openModal('Query')} />
        </ErrorBoundary>

        
        <Suspense fallback={null}>
          <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load services.</p>}>
            <Services />
          </ErrorBoundary>
        </Suspense>


        <Suspense fallback={null}>
          <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load projects.</p>}>
            <Projects />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={null}>
          <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load testimonials.</p>}>
            <Testimonials onTestimonialClick={() => openModal('Testimonial')} />
          </ErrorBoundary>
        </Suspense>

        <Suspense fallback={null}>
          <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load about.</p>}>
            <About />
          </ErrorBoundary>
        </Suspense>


        
      </main>

      <Suspense fallback={null}>
        <ErrorBoundary fallback={<p className="text-center py-8 text-neutral-400">Could not load footer.</p>}>
          <Footer onFeedbackClick={() => openModal('Feedback')}  onContactClick={() => openModal('Query')} />
        </ErrorBoundary>
      </Suspense>
    <ErrorBoundary fallback={<p className="text-center py-8 text-neutral-400">Could not load Contactmodal.</p>}>
          
      <ContactModal isOpen={!!activeType} onClose={closeModal} type={activeType} />
       </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;