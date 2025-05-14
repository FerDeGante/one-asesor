import React, { useEffect, useState } from 'react';
import NavBarComponent from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <NavBarComponent scrolled={scrolled}/>
      <Home />
      <Footer />
    </>
  );
}

export default App;
