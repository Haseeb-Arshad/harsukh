import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '@/styles/home/faq.module.css';

const AnimatedText = ({ text, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className={`${className} ${styles.animatedText} ${inView ? styles.isInview : ''}`}>
      <span className={styles.textInner}>{text}</span>
    </div>
  );
};

const AccordionItem = ({ question, answer, isOpen, onClick, index, scrollContainerRef }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Keeps the animation from re-triggering, set to false if re-animation on scroll is desired
    threshold: 0.1,    // How much of the item should be visible before triggering
    root: scrollContainerRef ? scrollContainerRef.current : null, // Set the scrollable container as the root
    rootMargin: "0px 0px -50px 0px", // Adjust margin to trigger animation a bit earlier or later
  });
  
  return (
    <div 
      ref={ref} 
      className={`${styles.accordionItem} ${isOpen ? styles.open : ''} ${inView ? styles.inView : ''}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <button 
        className={styles.accordionButton} 
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className={styles.questionText}>{question}</span>
        <span className={`${styles.accordionIcon} ${isOpen ? styles.minus : styles.plus}`}></span>
      </button>
      <div 
        className={styles.accordionContent}
        style={{ maxHeight: isOpen ? '5000px' : '0' }} // Extremely large max-height for open state
      >
        <div className={styles.accordionAnswer}>
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const scrollContainerRef = React.useRef(null);
  const [openItem, setOpenItem] = useState(0); // First item open by default
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);

  const toggleAccordion = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is Harsukh?",
      answer: "Harsukh Residencies is a high-rise residential project designed to give a luxurious and tranquil living experience, making it a combination of modern living within nature, making it an investment like no other."
    },
    {
      question: "Where is Harsukh located?",
      answer: "Harsukh Residencies is located on Kuza Gali, Ayubia of the Galiyat region in Abbottabad District, just after Nathiagali and before Ayubia. The place is known for its serene environment, offering a perfect retreat from the busy city life."
    },
    {
      question: "Who is behind Harsukh?",
      answer: "The project is developed by Almaymaar, a reputable real estate developer known for quality-driven projects that integrate innovative designs and sustainable living."
    },
    {
      question: "What is the expected completion date?",
      answer: "The project is actively under construction and expected to be delivered by 2028, with units available for possession within four years of booking."
    },
    {
      question: "What amenities does Harsukh offer?",
      answer: "Harsukh Residencies provides a range of modern amenities, including a fully equipped gym, hot water thermal pools, landscaped gardens, a community lounge, on-site restaurants, and a skywalk bridge offering panoramic mountain views."
    },
    {
      question: "What is the total area, and what types of units are available?",
      answer: "The project spans a total of 6 kanals of land, and the residency is a Ground + 9 Floors building, which includes a variety of unit types."
    },
    {
      question: "What are unit sizes and layouts?",
      answer: "Units range from 309 sq ft to 1663 sq ft, comprising studio, 1-bed, 2-bed, 3-bed Apartments and Penthouses, with various layouts designed to accommodate single residents, couples, and families."
    },
    {
      question: "How far is the project from nearby cities?",
      answer: "Harsukh Residencies is approximately 70 km or a 1.5-hour drive from the zero-point Islamabad and only a 10-minute drive from Nathia Gali, offering a peaceful location that is within a manageable distance from the main city."
    },
    {
      question: "Is the project approved by relevant authorities?",
      answer: "Yes, Harsukh Residencies is approved by the GDA (Galiyat Development Authority), Forestry, Environmental, and Wildlife departments."
    },
    {
      question: "What is the payment plan, and are installments available?",
      answer: "Harsukh Residencies offers a flexible payment plan with an initial down payment of 15% and an easy 4-year installment plan, designed to make purchasing accessible to a wide range of buyers."
    },
    {
      question: "Are there any discounts or promotions?",
      answer: "Yes, the project offers limited-time discounts and promotions on select units, providing prospective buyers with an opportunity to purchase at a reduced rate."
    },
    {
      question: "What is the ROI on an investment in Harsukh?",
      answer: "The ROI is promised to be more than 25% per annum at our project, which is very eye-catching for the investors."
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <AnimatedText 
          text="Frequently Asked Questions" 
          className={styles.sectionTitle} 
        />
        <div className={styles.accordionContainer} ref={scrollContainerRef}>
          <div className={styles.accordion}>
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openItem === index}
                onClick={() => toggleAccordion(index)}
                index={index}
                scrollContainerRef={scrollContainerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
