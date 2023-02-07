import { useContext, useEffect, useState } from 'react';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import Items from '@/components/main/Items';

export default function Store() {
  const { getIdsProductsStore, isLoading, buyProducts } = useContext(
    TreasureTrailsContext
  );
  const [activityIndex, setActivityIndex] = useState('');
  const [openCamera, setOpenCamera] = useState(false);
  const [storeIdProducts, setStoreIdProducts] = useState([]);
  const [storeIndex, setStoreIndex] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setStoreIdProducts(await getIdsProductsStore(activityIndex));
      setStoreIndex(activityIndex);
    };

    if (!isLoading && storeIdProducts?.length === 0 && activityIndex !== '') {
      fetchData();

      setActivityIndex('');
      setOpenCamera(false);
    }
  }, [storeIdProducts, isLoading, activityIndex]);

  const payForIt = async (productsAdded) => {
    try {
      await buyProducts(storeIndex, productsAdded);
    } catch (error) {}
  };

  return (
    <Items
      title="Store"
      arrayItems={storeIdProducts}
      openCamera={openCamera}
      setOpenCamera={setOpenCamera}
      action={payForIt}
      setActivityIndex={setActivityIndex}
    />
  );
}
