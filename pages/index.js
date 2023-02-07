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
        if (hasValidTicket) router.push('/challenges');
        else router.push('/tickets');
      } else router.push('/admin');
    }
  }, [isOwner, account, hasValidTicket, isLoading]);

  return (
    <div className="">
      {!account && (
        <div className="flex flex-col items-center justify-center max-w-3xl px-8 py-16 m-3 transition duration-300 ease-in-out delay-150 md:p-20 glass">
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
