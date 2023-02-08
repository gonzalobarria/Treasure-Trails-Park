import { useContext } from 'react';
import { AppContext } from '@/components/contexts/AppContext';
import ConnectWallet from '@/components/web3/ConnectWallet';
import Image from 'next/image';
import logoBlanco from '@/public/images/logo-blanco-wide.png';

export default function Home() {
  const { account } = useContext(AppContext);

  return (
    <>
      {!account ? (
        <div className="flex flex-col items-center justify-center max-w-screen-lg gap-5 px-4 py-10 m-10 mx-3 text-center transition duration-300 ease-in-out delay-150 md:p-8 bg-white/50 rounded-xl backdrop-blur-md drop-shadow-lg">
          <div className="mt-3 md:mt-0">
            <Image src={logoBlanco} alt="Esta soy yo" />
          </div>

          <h1>Welcome to the most exciting adventure in your favorite park</h1>
          <h2>
            Have fun in the park and earn points with the best entertainment
          </h2>
          <div className="mt-10">
            <ConnectWallet />
          </div>
        </div>
      ) : null}
    </>
  );
}
