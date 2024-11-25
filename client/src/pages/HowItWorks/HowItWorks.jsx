import styles from './HowItWorks.module.sass';
import lighting from './icons/g1.svg';
import pc from './icons/g1.svg';
import lamp from './icons/g2.svg';

function HowItWorks () {
  return (
    <>
      <section className={styles.howItWorksSection}>
        <div className={styles.howItWorksText}>
          <p className={styles.blueTextLikeBtn}>World's #1 Naming Platform</p>
          <h1 className={styles.mainTitle}>How Does Atom Work?</h1>
          <p className={styles.howDoesAtomDescrp}>
            Atom helps you come up with a great name for your business by
            combining the power of crowdsourcing with sophisticated technology
            and Agency-level validation services.
          </p>
        </div>

        <div className={styles.atomVideoContainer}>
          <iframe
            src='https://iframe.mediadelivery.net/embed/239474/327efcdd-b1a2-4891-b274-974787ae8362?autoplay=false&loop=false&muted=false&preload=true&responsive=true'
            allow='accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;'
            allowFullScreen
            className={styles.atomVideo}
          ></iframe>
        </div>
      </section>

      <section className={styles.waysToUseAtomSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.blueTextLikeBtn}>Our Services</p>
          <h2 className={styles.sectionTitle}>3 Ways To Use Atom</h2>
          <p className={styles.sectionSubtitle}>
            Atom offers 3 ways to get you a perfect name for your business.
          </p>
        </div>

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <img src={lighting} alt='Launch a Contest' />
            </div>
            <h3 className={styles.cardTitle}>Launch a Contest</h3>
            <p className={styles.cardDescription}>
              Work with hundreds of creative experts to get custom name
              suggestions for your business or brand. All names are auto-checked
              for URL availability.
            </p>
            <button className={styles.cardButton}>Launch a Contest →</button>
          </div>

          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <img src={pc} alt='Explore Names For Sale' />
            </div>
            <h3 className={styles.cardTitle}>Explore Names For Sale</h3>
            <p className={styles.cardDescription}>
              Our branding team has curated thousands of pre-made names that you
              can purchase instantly. All names include a matching URL and a
              complimentary Logo Design.
            </p>
            <button className={styles.cardButton}>
              Explore Names For Sale →
            </button>
          </div>

          <div className={styles.card}>
            <div className={styles.iconContainer}>
              <img src={lamp} alt='Agency-level Managed Contests' />
            </div>
            <h3 className={styles.cardTitle}>Agency-level Managed Contests</h3>
            <p className={styles.cardDescription}>
              Our Managed contests combine the power of crowdsourcing with the
              rich experience of our branding consultants. Get a complete
              agency-level experience at a fraction of Agency costs.
            </p>
            <button className={styles.cardButton}>Learn More →</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HowItWorks;
