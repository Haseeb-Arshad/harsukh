
  // const text = 'THE BEST OF BOTH WORLDS';
  // const words = text.split(' ');
  // const subtitle = "Luxury in the heart of Galyat";

  // Animation variants for the container, text, and button
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } }
  };

  const wordVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [.165,.84,.44,1] }
    }
  };

  const subtitleVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.3, duration: 1.2, ease: [.165,.84,.44,1] }
    }
  };