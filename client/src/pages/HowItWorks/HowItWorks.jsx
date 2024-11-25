import styles from './HowItWorks.module.sass';

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
    </>
  );
}

export default HowItWorks;
