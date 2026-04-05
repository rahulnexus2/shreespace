import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import Testimonials from './components/sections/Testimonials';
import ContactModal from './components/sections/ContactModal';
import Footer from './components/sections/Footer';
import About from './components/sections/About';
const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal  = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <ThemeProvider>

      <Navbar onContactClick={openModal} />

      <main>
        
        <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load hero.</p>}>
          <Hero onContactClick={openModal} />
        </ErrorBoundary>
        <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load about.</p>}>
  <About />
</ErrorBoundary>

        <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load services.</p>}>
          <Services />
        </ErrorBoundary>

        <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load projects.</p>}>
          <Projects />
        </ErrorBoundary>

        <ErrorBoundary fallback={<p className="text-center py-16 text-neutral-400">Could not load testimonials.</p>}>
          <Testimonials />
        </ErrorBoundary>
      </main>

      <ErrorBoundary fallback={<p className="text-center py-8 text-neutral-400">Could not load footer.</p>}>
        <Footer onContactClick={openModal} />
      </ErrorBoundary>

      <ContactModal isOpen={modalOpen} onClose={closeModal} />

    </ThemeProvider>
  );
};

export default App;