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
          <div className="flex flex-col gap-3 md:w-96">
            <>
              <button
                onClick={() => addTicket('General Entrance', 0.01, 1, 50)}
              >
                ADD Ticket General Entrance
              </button>
              <button
                onClick={() => addTicket('Silver Entrance', 0.02, 1, 110)}
              >
                ADD Ticket Silver Entrance
              </button>

              <button onClick={() => addTicket('Gold Entrance', 0.025, 1, 130)}>
                ADD Ticket Gold Entrance
              </button>

              <button
                onClick={() => addTicket('Platimun Entrance', 0.03, 1, 250)}
              >
                ADD Ticket Platimun Entrance
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Go Crazy',
                    'Start running inside the park until one of our guards stops you and shows you the code to scan.',
                    20,
                    0,
                    date.setDate(date.getHours() + 24),
                    ACTIVITY_TYPE.CHALLENGE
                  )
                }
              >
                ADD Challenge Go Crazy
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Where is Goofy?',
                    'Goofy has a hidden code on his back. go and scan it',
                    15,
                    0,
                    date.setDate(date.getHours() + 24),
                    ACTIVITY_TYPE.CHALLENGE
                  )
                }
              >
                ADD Challenge Where is Goofy?
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Scan the castle',
                    'You must search the interior walls of the castle for the hidden code',
                    15,
                    0,
                    date.setDate(date.getHours() + 24),
                    ACTIVITY_TYPE.CHALLENGE
                  )
                }
              >
                ADD Challenge Scan the castle
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Photo with Mickey',
                    'Take a photo with Mickey Mouse, upload it to social networks and scan the code that he has saved.',
                    15,
                    0,
                    date.setDate(date.getHours() + 24),
                    ACTIVITY_TYPE.CHALLENGE
                  )
                }
              >
                ADD Challenge Photo with Mickey
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Under the Sea',
                    'Look for the Little Mermaid and she will give you a riddle. If you manage to guess it, she will give you her secret code.',
                    200,
                    0,
                    date.setDate(date.getHours() + 24),
                    ACTIVITY_TYPE.CHALLENGE
                  )
                }
              >
                ADD Challenge Under the Sea
              </button>

              <button onClick={() => addRestaurant('Sunshine Seasons')}>
                ADD Restaurant Sunshine Seasons
              </button>
              <button onClick={() => addRestaurant('Garden Grill Restaurant')}>
                ADD Restaurant Garden Grill Restaurant
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'Harvest-inspired Garden Salad',
                    'Deliciously fresh garden salad with an array of roasted vegetables tossed in Litehouse® Organic Lemon Herb Vinaigrette.',
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
                    'Barbecue-roasted Chicken',
                    'Barbecue-roasted chicken refers to a dish where chicken is roasted or grilled using a barbecue sauce as a marinade or basting sauce for added flavor.',
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
                    'Macaroni & Cheese',
                    'Mac and Cheese is a classic American dish that consists of elbow macaroni pasta baked in a creamy cheese sauce. ',
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
                    'Southern-style Spoon Bread',
                    'Southern-style spoon bread is a type of cornmeal-based dish that originated in the Southern United States.',
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
                    'Grilled Beef with Chimichurri',
                    'Grilled beef with chimichurri is a dish that consists of grilled or broiled beef steak served with a sauce called chimichurri.',
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
                    'Coca-Cola 0.5lt',
                    'Half liter glass of Coca-Cola with ice',
                    0,
                    5,
                    0,
                    ACTIVITY_TYPE.MEAL
                  )
                }
              >
                ADD Meal 6
              </button>

              <button onClick={() => setMenuRestaurant(0, [5, 6, 7, 9])}>
                ADD Menu to Restaurant 1
              </button>
              <button onClick={() => setMenuRestaurant(1, [8, 9, 10])}>
                ADD Menu to Restaurant 2
              </button>

              <button onClick={() => addStore('Castle Store')}>
                ADD Store Castle Store
              </button>
              <button onClick={() => addStore('Shrek Gifts')}>
                ADD Store Shrek Gifts
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Marty McFly Keychain',
                    'The Marty McFly keychain is a fun and practical accessory for fans of the classic "Back to the Future" movie franchise. Made from high-quality materials, this keychain is durable and built to last. Its unique design, inspired by Marty McFly.',
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
                  addActivity(
                    'BTTF Cup',
                    'The BTTF (Back to the Future) cup is a must-have for fans of the classic movie franchise. Made from high-quality materials, this cup is durable and built to last, making it a great choice for everyday use. Its unique design, featuring elements from the film, makes it a great conversation starter and a fun addition to any collection. ',
                    0,
                    10,
                    0,
                    ACTIVITY_TYPE.PRODUCT
                  )
                }
              >
                ADD Product 2
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'BTTF Car Replica',
                    'The BTTF (Back to the Future) car replica is a highly detailed and accurate model of the iconic time-traveling vehicle, the DeLorean DMC-12, as seen in the classic movie franchise.',
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
                    'A Mickey Mouse cup is a fun and stylish accessory for fans of the world-famous Disney character. Made from high-quality materials, this cup is durable and built to last, making it a great choice for everyday use. Its unique design, featuring Mickey Mouse, makes it a great conversation starter and a must-have for any Disney fan.',
                    0,
                    10,
                    0,
                    ACTIVITY_TYPE.PRODUCT
                  )
                }
              >
                ADD Product 4
              </button>

              <button onClick={() => setStoreProducts(0, [11, 12, 13])}>
                ADD Products to Store 1
              </button>
              <button onClick={() => setStoreProducts(1, [14, 13])}>
                ADD Products to Store 2
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'Mega Rollercoaster',
                    "It's a thrilling and exhilarating ride that can bring excitement and fun to visitors of all ages. The high-speed drops, tight turns, and intense loops of this type of rollercoaster are sure to get your heart racing and provide an adrenaline rush.",
                    55,
                    20,
                    0,
                    ACTIVITY_TYPE.ATTRACTION
                  )
                }
              >
                ADD Attraction Mega Rollercoaster
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Haunted House',
                    'A Haunted House is a thrilling and immersive attraction that is perfect for fans of all things spooky. With its dark and creepy atmosphere, live actors, and jump scares, a Haunted House is a unique and exciting way to experience fear and excitement.',
                    45,
                    10,
                    0,
                    ACTIVITY_TYPE.ATTRACTION
                  )
                }
              >
                ADD Attraction Haunted House
              </button>

              <button
                onClick={() =>
                  addActivity(
                    'Ferris wheel',
                    'Ferris wheel provides a fun and leisurely way to take in breathtaking views. With its slow and gentle pace, this ride is great for families with children, couples on a date, or anyone looking for a relaxing experience.',
                    35,
                    10,
                    0,
                    ACTIVITY_TYPE.ATTRACTION
                  )
                }
              >
                ADD Attraction Ferris wheel
              </button>
              <button
                onClick={() =>
                  addActivity(
                    'Dark ride',
                    'A Dark Ride combines elements of ride technology, storytelling, and special effects to create an immersive and exciting experience. ',
                    25,
                    5,
                    0,
                    ACTIVITY_TYPE.ATTRACTION
                  )
                }
              >
                ADD Attraction Dark ride
              </button>
              <button onClick={() => withdraw()}>Withdraw</button>
            </>
          </div>
        </div>
      )}
      <div className="m-4">
        <Input type="text" value={value} onChange={onChange} />
      </div>
      <div className="flex justify-center text-center ">
        <QR value={value} />
      </div>
    </div>
  );
}
