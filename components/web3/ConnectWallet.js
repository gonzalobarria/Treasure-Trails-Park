import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export default function ConnectWallet() {
  const { connectWallet } = useContext(AppContext);

  return (
    <button
      type="button"
      className="text-white bg-gradient-to-br from-green-400 to-purple-600 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-xl px-8 py-3.5 text-center"
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  );
}
