import Head from 'next/head';
import Banner from '../components/banner';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Card from '../components/card';
// import useTrackLocation from './hooks/use-track-location';
// import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from '../lib/coffee-store.js';

// const { handleTrackLocation, latLong, locationErrorMsg } = useTrackLocation();
export default function Home(props) {
  // console.log("props", props);
  // console.log({ latLong, locationErrorMsg });

  const handleOnBannerBtnClick = () => {
    // handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText='View Store Nearby'
          handleOnCLick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            alt='hero image'
            width={700}
            height={400}
          />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Amman Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    data={coffeeStore}
                    href={'coffee-store/' + coffeeStore.id}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const coffeeStores = await fetchCoffeeStores();
    return {
      props: {
        coffeeStores,
      },
    };
  } catch (err) {}
}
