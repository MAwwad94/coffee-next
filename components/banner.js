import styles from './banner.module.css';

const handleOnBannerBtnClick = () => {
  console.log('test');
  // handleTrackLocation();
};
const Banner = (props) => {
  console.log('props', props);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Conniosseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee shops!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnCLick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};
export default Banner;
