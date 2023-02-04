import { useContext, useEffect, useState } from 'react';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import moment from 'moment';
import Modal from '@/components/utils/Modal';

export default function ActiveChallenges() {
  const { getMenuRestaurant, getActivities } = useContext(
    TreasureTrailsContext
  );
  const [activityIndex, setActivityIndex] = useState('');
  const [openCamera, setOpenCamera] = useState(false);
  const [menuRestaurant, setMenuRestaurant] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setMenuRestaurant(await getMenuRestaurant(activityIndex));
    };
    const fetchData2 = async () => {
      setMenuRestaurant(await getMenuRestaurant(1));
    };
    // fetchData2();

    if (activityIndex !== '') {
      fetchData();

      setActivityIndex('');
      setOpenCamera(false);
    }
  }, [activityIndex]);

  return (
    <>
      {openCamera ? (
        <div className="w-full h-screen">
          <Modal
            setId={setActivityIndex}
            showModal={openCamera}
            toggleModal={() => setOpenCamera(false)}
          />
        </div>
      ) : (
        <div className="glass">
          <div className="pb-8 text-center">
            <h1>Restaurant</h1>
          </div>
          {menuRestaurant.length === 0 ? (
            <div className="text-center">
              <button
                className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
                onClick={() => setOpenCamera(true)}
              >
                Scan Menu
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
                {menuRestaurant.map((t, i) => {
                  if (t.isActive)
                    return (
                      <div
                        key={t.name}
                        className="w-full px-5 py-4 rounded-lg bg-white/70 "
                      >
                        <div className="grid content-between h-full">
                          <div className="pb-3">
                            <h2 className="font-bold">{t.name}</h2>

                            <div className="flex flex-row justify-between pb-2">
                              <p className="text-lg">
                                {t.description.toString()}
                              </p>
                            </div>
                          </div>
                          <div className="relative flex justify-between w-full pt-5 text-right">
                            <div className="absolute bottom-0"></div>
                            <div className="w-full">
                              <button
                                className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
                                onClick={() => setOpenCamera(true)}
                              >
                                Do it!
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
