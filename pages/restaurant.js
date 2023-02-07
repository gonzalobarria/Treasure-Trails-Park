import { useContext, useEffect, useState } from 'react';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import Items from '@/components/main/Items';

export default function Restaurant() {
  const { getIdsMenuRestaurant, isLoading, buyMeals, restaurants } = useContext(
    TreasureTrailsContext
  );
  const [activityIndex, setActivityIndex] = useState('');
  const [openCamera, setOpenCamera] = useState(false);
  const [menuIdRestaurant, setMenuIdRestaurant] = useState([]);
  const [restaurantIndex, setRestaurantIndex] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setMenuIdRestaurant(await getIdsMenuRestaurant(activityIndex));
      setRestaurantIndex(activityIndex);
    };

    if (!isLoading && menuIdRestaurant?.length === 0 && activityIndex !== '') {
      fetchData();

      setActivityIndex('');
      setOpenCamera(false);
    }
  }, [menuIdRestaurant, isLoading, activityIndex]);

  const payForIt = async (menuAdded) => {
    try {
      await buyMeals(restaurantIndex, menuAdded);
    } catch (error) {}
  };

  return (
    <Items
      title="Restaurant"
      arrayItems={menuIdRestaurant}
      openCamera={openCamera}
      setOpenCamera={setOpenCamera}
      action={payForIt}
      setActivityIndex={setActivityIndex}
      items={restaurants}
    />
  );
}
