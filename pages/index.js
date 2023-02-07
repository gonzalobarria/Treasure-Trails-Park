import { useContext } from 'react';
import { AppContext } from '@/components/contexts/AppContext';
import ConnectWallet from '@/components/web3/ConnectWallet';

export default function Home() {
  const { account } = useContext(AppContext);

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
