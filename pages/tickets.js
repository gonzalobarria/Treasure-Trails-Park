import { useContext } from 'react';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import { utils } from 'ethers';

export default function Tickets() {
  const { tickets, buyTicket } = useContext(TreasureTrailsContext);

  return (
    <div className="glass">
      <div className="pb-8 text-center">
        <h1>Tickets</h1>
      </div>
      <div className="flex flex-col w-full">
        {tickets.length === 0 ? (
          <div className="">
            <h3>Sale ticket is close now</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 ">
            {tickets.map((t, i) => {
              if (t.isActive)
                return (
                  <div
                    key={t.name}
                    className="w-full px-5 py-4 rounded-lg bg-white/70"
                  >
                    <h4 className="text-center">{t.name}</h4>
                    <div className="flex flex-row justify-between px-1 border-b border-gray-200/50">
                      <div>Price:</div>
                      <div>{utils.formatEther(t.price)} eth</div>
                    </div>
                    <div className="flex flex-row justify-between px-1 border-b border-gray-200/50">
                      <div>Duration:</div>
                      <div>{t.durationInDays.toString()} day(s)</div>
                    </div>
                    <div className="flex flex-row justify-between px-1 border-b border-gray-200/50">
                      <div>Credits:</div>
                      <div>{t.initialCredits.toString()}</div>
                    </div>
                    <div className="pt-2 text-center">
                      <button
                        className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-md px-4 py-1.5 text-center"
                        onClick={() => buyTicket(i)}
                      >
                        Buy {t.name}
                      </button>
                    </div>
                  </div>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
