import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { QRCode } from 'react-qrcode-logo';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/components/contexts/AppContext';
import ConnectWallet from '@/components/web3/ConnectWallet';
import Scan from '@/components/utils/Scan';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import Link from 'next/link';
import { ACTIVITY_TYPE } from '@/utils/enums';

export default function Home() {
  const { account } = useContext(AppContext);
  const { tickets, isOwner, addTicket, getActiveChallenges, addActivity } =
    useContext(TreasureTrailsContext);
  const [openCamera, setOpenCamera] = useState(false);

  const [data, setData] = useState('');

  useEffect(() => {
    if (data !== '') {
      const theticket = tickets.find((t, i) => i === parseInt(data));
      console.log('theticket', theticket);
      if (theticket) buyTicket(data);
      setData('');
      setOpenCamera(false);
    }
  }, [data, tickets]);

  let date = new Date();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {!account && (
          <div className="flex items-center justify-center py-10">
            <ConnectWallet />
          </div>
        )}

        <div className={styles.description}>
          {openCamera && <Scan setId={setData} />}
          <p>Get started by editing&nbsp;</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => console.log(tickets)}>tickets</button>
            <button onClick={() => buyTicket(2)}>BUY</button>
            <Link href="/active-challenges">Challenges</Link>
            {isOwner && (
              <>
                <button
                  onClick={() => addTicket('General Entrance', 0.01, 1, 50)}
                >
                  ADD Ticket 1
                </button>
                <button
                  onClick={() => addTicket('Silver Entrance', 0.02, 1, 110)}
                >
                  ADD Ticket 2
                </button>

                <button
                  onClick={() => addTicket('Gold Entrance', 0.025, 1, 130)}
                >
                  ADD Ticket 3
                </button>

                <button
                  onClick={() => addTicket('Platimun Entrance', 0.03, 1, 250)}
                >
                  ADD Ticket 4
                </button>
                <button
                  onClick={() =>
                    addActivity(
                      'Challenge 1',
                      'Correr por el parque',
                      20,
                      0,
                      date.setHours(date.getHours() + 4),
                      ACTIVITY_TYPE.CHALLENGE
                    )
                  }
                >
                  ADD Challenge 1
                </button>
                <button
                  onClick={() =>
                    addActivity(
                      'Challenge 2',
                      'Descubre dónde está pluto',
                      15,
                      0,
                      date.setHours(date.getHours() + 4),
                      ACTIVITY_TYPE.CHALLENGE
                    )
                  }
                >
                  ADD Challenge 2
                </button>
                <button
                  onClick={() =>
                    addActivity(
                      'Challenge 3',
                      'Escanea el castillo',
                      15,
                      0,
                      date.setHours(date.getHours() + 4),
                      ACTIVITY_TYPE.CHALLENGE
                    )
                  }
                >
                  ADD Challenge 3
                </button>
              </>
            )}
            <button onClick={() => setOpenCamera(true)}>OPEN</button>
            <button
              onClick={() => {
                console.log('isOwner :>> ', isOwner);
              }}
            >
              owner
            </button>
          </div>
        </div>

        <QRCode
          value="2"
          logoImage="https://www.gonzalobarria.com/images/logo-gb.jpg"
          eyeRadius={[
            {
              // top/left eye
              outer: [10, 10, 0, 10],
              inner: [10, 10, 0, 10],
            },
            [10, 10, 10, 0], // top/right eye
            [10, 0, 10, 10], // bottom/left
          ]}
        />
      </main>
    </>
  );
}