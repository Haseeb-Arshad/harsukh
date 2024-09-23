// components/Developer.js
import Image from 'next/image';
import styles from '@/styles/home/developer.module.css';

const Developer = () => {
    const devText1 = "Almaymaar, a leading real estate developer based in Islamabad, is renowned for its unwavering commitment to creating high-quality, innovative residential and commercial projects. Among their notable achievements is Aiwa City Attock, a project that has set new benchmarks in the real estate sector. Currently, Almaymaar is developing their signature project, Harsukh Residencies, which embodies their dedication to luxurious living and architectural excellence."
    const devText2 = "Almaymaar's projects consistently reflect a deep understanding of homeowners' desires, ensuring that each development not only meets but anticipates the needs of future residents. With Harsukh Residencies, Almaymaar aims to redefine luxury living, integrating modern design with the serene beauty of nature."

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.emptyDiv}></div>
                <div className={styles.title}>
                    <div className={styles.titleText}>
                        Developer
                    </div>
                </div>
                <div className={styles.logoDiv}>
                    <Image className={styles.logo} src="https://cdn.theharsukh.com/images/ContactUs/Almaymaar.png" alt="Harsukh Residencies" width={190} height={45} />
                </div>
                <div className={styles.description}>
                    <div className={styles.desc}>{devText1}</div>
                    <div className={styles.desc}>{devText2}</div>
                </div>
            </div>
            {/* <div className={styles.content}>
                <div className={styles.emptyDiv}></div>
                <div className={styles.title}>
                    <div className={styles.titleText}>
                        Architect
                    </div>
                </div>
                <div className={styles.logoDiv}>
                    <Image className={styles.logo} src="https://res.cloudinary.com/dykglphpa/image/upload/v1726839449/harsukh/k9glegpujsehrkikfczn.png" alt="Harsukh Residencies" width={160} height={65} />
                </div>
                <div className={styles.description}>
                    <div className={styles.desc}>
                        6 Figures Architectural Firm is renowned for their ability to craft spaces that tell a story. With a perfect balance of functionality and artistic expression, their designs are innovative, sustainable, and timeless. Their portfolio includes iconic projects, such as luxury high-rises and peaceful retreats, each reflecting their commitment to excellence. Every structure they create is a testament to their philosophy of blending architecture with the human spirit
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Developer;