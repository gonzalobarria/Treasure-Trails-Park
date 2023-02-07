import { useContext, useState } from 'react';
import Input from '@/components/utils/Input';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import { ACTIVITY_TYPE } from '@/utils/enums';
import QR from '@/components/utils/QR';

export default function Home() {
  const {
    isOwner,
    addTicket,
    addRestaurant,
    addStore,
    addActivity,
    setMenuRestaurant,
    setStoreProducts,
    withdraw,
  } = useContext(TreasureTrailsContext);
  const [value, setValue] = useState('');

  let date = new Date();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="pb-10">
      {isOwner && (
        <div className="glass">
          <div className="flex flex-col gap-3">
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
              <button
                onClick={() =>
                  addActivity(
                    'Challenge 5',
                    'Escanea el castillo 5',
                    200,
                    0,
                    date.setHours(date.getHours() + 4),
                    ACTIVITY_TYPE.CHALLENGE
                  )
                }
              >
                ADD Challenge 5
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

              <button onClick={() => addStore('Comida Peruano')}>
                ADD Store 1
              </button>
              <button onClick={() => addStore('Comida Chilena')}>
                ADD Store 2
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Marty McFly Keychain',
                    '',
                    0,
                    20,
                    0,
                    ACTIVITY_TYPE.PRODUCT
                  )
                }
              >
                ADD Product 1
              </button>

              <button
                onClick={() =>
                  addActivity('BTTF Cup', '', 0, 10, 0, ACTIVITY_TYPE.PRODUCT)
                }
              >
                ADD Product 2
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'BTTF Car Replica',
                    '',
                    0,
                    50,
                    0,
                    ACTIVITY_TYPE.PRODUCT
                  )
                }
              >
                ADD Product 3
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Mickey Mouse Cup',
                    '',
                    0,
                    10,
                    0,
                    ACTIVITY_TYPE.PRODUCT
                  )
                }
              >
                ADD Product 4
              </button>

              <button onClick={() => setStoreProducts(0, [10, 11, 12])}>
                ADD Products to Store 1
              </button>
              <button onClick={() => setStoreProducts(1, [13, 12])}>
                ADD Products to Store 2
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'Mega Rollercoaster',
                    '',
                    55,
                    20,
                    0,
                    ACTIVITY_TYPE.ATTRACTION
                  )
                }
              >
                ADD Attraction 1
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Haunted House',
                    '',
                    45,
                    10,
                    0,
                    ACTIVITY_TYPE.ATTRACTION
                  )
                }
              >
                ADD Attraction 2
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'Ferris wheel',
                    '',
                    35,
                    10,
                    0,
                    ACTIVITY_TYPE.ATTRACTION
                  )
                }
              >
                ADD Attraction 3
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Dark ride',
                    '',
                    25,
                    5,
                    0,
                    ACTIVITY_TYPE.ATTRACTION
                  )
                }
              >
                ADD Attraction 4
              </button>
              <button onClick={() => withdraw()}>Withdraw</button>
            </>
          </div>
        </div>
      )}
      <div className="m-4">
        <Input type="text" value={value} onChange={onChange} />
      </div>
      <div className="w-full p-20 bg-white ">
        <QR value={value} />
      </div>
    </div>
  );
}
