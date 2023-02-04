import { useContext, useEffect } from 'react';
import { AppContext } from '@/components/contexts/AppContext';
import ConnectWallet from '@/components/web3/ConnectWallet';
import { TreasureTrailsContext } from '@/components/contexts/TreasureTrailsContext';
import { Router, useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { account } = useContext(AppContext);
  const { isOwner, hasValidTicket, isLoading } = useContext(
    TreasureTrailsContext
  );

  useEffect(() => {
    if (!isLoading && account) {
      if (!isOwner) {
        if (hasValidTicket) router.push('/active-challenges');
        else router.push('/tickets');
      } else router.push('/admin');
    }
  }, [isOwner, account, hasValidTicket, isLoading]);

  return (
    <div className="fixed flex items-center justify-center w-full h-full bg-center bg-cover bg-park">
      {!account && (
        <div className="flex flex-col items-center justify-center transition ease-in-out delay-150 duration-300 max-w-3xl px-8 py-16 md:p-20 m-3 rounded-lg bg-white/75 dark:bg-[#312222]/75 drop-shadow-2xl ">
          <div className="flex flex-col gap-5 text-center mb-9">
            <h1>
              Welcome to the most exciting adventure in your favorite park
            </h1>
            <h2>
              Have fun in the park and earn points with the best entertainment
            </h2>
          </div>
          <ConnectWallet />
        </div>
      )}
    </div>
  );
}
