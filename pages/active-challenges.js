import { useContext, useEffect, useState } from 'react';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import Scan from '@/components/utils/Scan';

export default function ActiveChallenges() {
  const { activeChallenges, completeChallenge } = useContext(
    TreasureTrailsContext
  );
  const [activityIndex, setActivityIndex] = useState('');
  const [openCamera, setOpenCamera] = useState(false);

  useEffect(() => {
    if (activityIndex !== '') {
      const theChallenge = activeChallenges.find(
        (t, i) => i === parseInt(activityIndex)
      );
      console.log('theChallenge', theChallenge);
      if (theChallenge) completeChallenge(activityIndex);
      setActivityIndex('');
      setOpenCamera(false);
    }
  }, [activityIndex, activeChallenges]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Active Challenges</h1>
      {activeChallenges.length === 0 ? (
        <div className="">
          <h3>There are no challenges at the moment</h3>
        </div>
      ) : (
        <>
          {openCamera && (
            <Scan setId={setActivityIndex} setOpenCamera={setOpenCamera} />
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {activeChallenges.map((t, i) => {
              if (t.isActive)
                return (
                  <div
                    key={t.name}
                    className="w-full px-5 py-4 border border-green-200 rounded-lg "
                  >
                    <h4 className="text-center">{t.name}</h4>
                    <div className="flex flex-row justify-between px-1 border-b border-gray-200/50">
                      <div>Description:</div>
                      <div>{t.description.toString()}</div>
                    </div>
                    <div className="flex flex-row justify-between px-1 border-b border-gray-200/50">
                      <div>Credits to Win:</div>
                      <div>{t.earnCredits.toString()}</div>
                    </div>
                    <div className="flex flex-row justify-between px-1 border-b border-gray-200/50">
                      <div>Expires At:</div>
                      <div>{t.expiresAt.toString()}</div>
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
                        onClick={() => setOpenCamera(true)}
                      >
                        Complete Challenge
                      </button>
                    </div>
                  </div>
                );
            })}
          </div>
        </>
      )}
    </div>
  );
}
