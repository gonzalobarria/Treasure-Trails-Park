import { useContext, useEffect, useState } from 'react';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import moment from 'moment';
import Modal from '@/components/utils/Modal';
import { ACTIVITY_TYPE } from '@/utils/enums';

export default function ActiveChallenges() {
  const {
    activeChallenges,
    completeChallenge,
    challengesCompleted,
    activities,
  } = useContext(TreasureTrailsContext);
  const [activityIndex, setActivityIndex] = useState('');
  const [openCamera, setOpenCamera] = useState(false);

  useEffect(() => {
    if (activityIndex !== '') {
      const theChallenge = activities.find(
        (t, i) =>
          i === parseInt(activityIndex) &&
          t.activityType === ACTIVITY_TYPE.CHALLENGE
      );

      if (theChallenge) completeChallenge(activityIndex);

      setActivityIndex('');
      setOpenCamera(false);
    }
  }, [activityIndex, activities]);

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
            <h1>Challenges</h1>
          </div>
          {activeChallenges.length === 0 ? (
            <div className="">
              <h3>There are no challenges in this moment</h3>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
                {activities.map((t, i) => {
                  const expired = moment().isAfter(
                    moment(parseInt(t.expiresAt.toString()))
                  );

                  if (t.isActive && t.activityType === ACTIVITY_TYPE.CHALLENGE)
                    return (
                      <div
                        key={t.name}
                        className="w-full px-5 py-4 rounded-lg bg-white/70"
                      >
                        <div className="grid content-between h-full">
                          <div className="pb-3">
                            <h2 className="font-bold">{t.name}</h2>
                            <p className="pb-2 font-semibold">
                              {t.earnCredits.toString()} Credits
                            </p>

                            <div className="flex flex-row justify-between pb-2">
                              <p className="text-lg">
                                {t.description.toString()}
                              </p>
                            </div>
                          </div>
                          <div className="relative flex justify-between w-full pt-5 text-right">
                            <div className="absolute bottom-0">
                              Expires{' '}
                              {moment(parseInt(t.expiresAt.toString())).from(
                                moment()
                              )}
                            </div>
                            <div className="w-full">
                              {!expired &&
                                (!challengesCompleted.includes(i) ? (
                                  <button
                                    className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
                                    onClick={() => setOpenCamera(true)}
                                  >
                                    Do it!
                                  </button>
                                ) : (
                                  <h3 className="font-bold">Done!</h3>
                                ))}
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
