import { useContext, useEffect, useState } from 'react';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import Modal from '@/components/utils/Modal';
import { ACTIVITY_TYPE } from '@/utils/enums';
import QR from '@/components/utils/QR';

export default function Attractions() {
  const {
    activeChallenges,
    entranceAttraction,
    exitAttraction,
    activities,
    getEntranceCount,
    getExitCount,
  } = useContext(TreasureTrailsContext);
  const [activityIndex, setActivityIndex] = useState('');
  const [openCamera, setOpenCamera] = useState(false);
  const [entranceCount, setEntranceCount] = useState({});
  const [exitCount, setExitCount] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const enC = {
        [activityIndex]: await getEntranceCount(activityIndex),
      };
      const exC = {
        [activityIndex]: await getExitCount(activityIndex),
      };

      const theActivity = activities.find(
        (t, i) =>
          i === parseInt(activityIndex) &&
          t.activityType === ACTIVITY_TYPE.ATTRACTION
      );

      if (theActivity) {
        if (
          enC[activityIndex] === 0 ||
          enC[activityIndex] === exC[activityIndex]
        ) {
          await entranceAttraction(activityIndex);
          setEntranceCount({
            [activityIndex]: await getEntranceCount(activityIndex),
          });
        } else if (enC[activityIndex] > exC[activityIndex]) {
          await exitAttraction(activityIndex);
          setExitCount({
            [activityIndex]: await getExitCount(activityIndex),
          });
        }
      }
    };

    if (activityIndex !== '') {
      fetchData();

      setActivityIndex('');
      setOpenCamera(false);
    }
  }, [activityIndex, activeChallenges]);

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
            <h1>Attractions</h1>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
            {activities.map((t, i) => {
              if (t.isActive && t.activityType === ACTIVITY_TYPE.ATTRACTION)
                return (
                  <div
                    key={t.name}
                    className="w-full px-5 py-4 rounded-lg bg-white/70"
                  >
                    <div className="grid content-between h-full">
                      <div className="pb-3">
                        <h2 className="font-bold">{t.name}</h2>
                        <p className="font-semibold">
                          Pay: {t.discountCredits.toString()} Credits
                        </p>
                        <p className="pb-2 font-semibold">
                          Win: {t.earnCredits.toString()} Credits
                        </p>

                        <div className="flex flex-row justify-between pb-2">
                          <p className="text-lg">{t.description.toString()}</p>
                        </div>
                      </div>
                      <div className="">
                        <QR value={i} />
                      </div>
                      <button
                        className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
                        onClick={() => setOpenCamera(true)}
                      >
                        Do it!
                      </button>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      )}
    </>
  );
}
