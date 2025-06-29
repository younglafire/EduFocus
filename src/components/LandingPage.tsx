import React from 'react';
import Hero from './Hero';
import Features from './Features';
import VideoDemo from './VideoDemo';
import SignupForm from './SignupForm';
import Testimonials from './Testimonials';
import Footer from './Footer';
import StatsSection from './StatsSection';
import TrustedBy from './TrustedBy';

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustedBy />
      <StatsSection />
      <Features />
      <VideoDemo />
      <Testimonials />
      <SignupForm />
      <Footer />
    </>
  );
};

export default LandingPage;