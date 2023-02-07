import { QRCode } from 'react-qrcode-logo';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/components/contexts/AppContext';
import ConnectWallet from '@/components/web3/ConnectWallet';
import Scan from '@/components/utils/Scan';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import Link from 'next/link';
import { ACTIVITY_TYPE } from '@/utils/enums';

export default function Home() {
  const {
    tickets,
    isOwner,
    addTicket,
    addRestaurant,
    addActivity,
    setMenuRestaurant,
  } = useContext(TreasureTrailsContext);
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
    <div className="pb-10">
      <div className="glass">
        {openCamera && <Scan setId={setData} />}
        <p>Get started by editing&nbsp;</p>
        <div className="flex flex-col gap-3">
          <div className="text-center">
            <Link href="/tickets">Tickets</Link>
          </div>
          <button onClick={() => buyTicket(2)}>BUY</button>
          <div className="text-center">
            <Link href="/challenges">Challenges</Link>
          </div>
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

              <button onClick={() => addTicket('Gold Entrance', 0.025, 1, 130)}>
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
              <button
                onClick={() =>
                  addActivity(
                    'Challenge 4',
                    'Escanea el castillo 4',
                    15,
                    0,
                    date.setHours(date.getHours() + 4),
                    ACTIVITY_TYPE.CHALLENGE
                  )
                }
              >
                ADD Challenge 4
              </button>

              <button onClick={() => addRestaurant('Comida Peruano')}>
                ADD Restaurant 1
              </button>
              <button onClick={() => addRestaurant('Comida Chilena')}>
                ADD Restaurant 2
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'Ceviche Peruano',
                    'Plato de pescado o mariscos crudos cortados en trozos y que lleva jugo de limón, cebolla picada, ají y sal.',
                    0,
                    20,
                    0,
                    ACTIVITY_TYPE.MEAL
                  )
                }
              >
                ADD Meal 1
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Lomo Saltado',
                    'El lomo saltado es un plato típico de la gastronomía del Perú consistente en carne de res, arroz cocido y papas fritas.',
                    0,
                    25,
                    0,
                    ACTIVITY_TYPE.MEAL
                  )
                }
              >
                ADD Meal 2
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'Pisco Sour',
                    'El pisco sour es un cóctel preparado con pisco y zumo de limón.',
                    0,
                    10,
                    0,
                    ACTIVITY_TYPE.MEAL
                  )
                }
              >
                ADD Meal 3
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Cazuela de Pollo',
                    'Elaborado con una presa de carne de vacuno, de pollo, de pavo, de ganso o de gallina de campo, más verduras variadas: zapallo, choclo, papa. A veces se le añade arroz, chuchoca u otras verduras.',
                    0,
                    10,
                    0,
                    ACTIVITY_TYPE.MEAL
                  )
                }
              >
                ADD Meal 4
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Chorrillana',
                    'Consiste en un plato de papas fritas en el que se mezclan distintos tipos de carne, vienesas y otros elementos como huevos o cebolla frita, se le agrega aliños y sal.',
                    0,
                    30,
                    0,
                    ACTIVITY_TYPE.MEAL
                  )
                }
              >
                ADD Meal 5
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'Coca-Cola 500cc',
                    'Vaso de medio litro de Coca-Cola con hielos.',
                    0,
                    5,
                    0,
                    ACTIVITY_TYPE.MEAL
                  )
                }
              >
                ADD Meal 6
              </button>

              <button onClick={() => setMenuRestaurant(0, [4, 5, 6, 8])}>
                ADD Menu Restaurant 1
              </button>
              <button onClick={() => setMenuRestaurant(1, [7, 8, 9])}>
                ADD Menu Restaurant 2
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
      <div className="w-full p-20 bg-white ">
        <QRCode
          value="1"
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
      </div>
    </div>
  );
}
