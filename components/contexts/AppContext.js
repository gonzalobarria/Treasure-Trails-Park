import { createContext, useEffect, useState } from 'react';
import { getAccounts } from 'utils/utils';
import { notify } from '../utils/Toaster';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [disabled, setDisabled] = useState(false);
  const [isLoadingAccount, setIsLoadingAccount] = useState(true);

  useEffect(() => {
    if (!window.ethereum) return;

    checkIfWalletIsConnected();
    checkIfWalletChanged();
  });

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return;

    const { acc, provider } = await getAccounts('eth_accounts');

    if (!account && acc.length > 0) {
      setAccount(acc[0]);
      setSigner(provider.getSigner());
      setIsLoadingAccount(false);
      return;
    } else setIsLoadingAccount(false);
  };

  const checkIfWalletChanged = () => {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', async () => {
      const { acc, provider } = await getAccounts('eth_requestAccounts');

      setAccount(acc[0]);
      setSigner(provider.getSigner());
    });
  };

  const settingAccount = async () => {
    const { acc, provider } = await getAccounts('eth_requestAccounts');

    if (acc.length === 0) {
      notify({
        title: 'No Accounts found',
        msg: "You don't have any account available",
        type: 'error',
      });

      return;
    }

    return {
      acc: acc[0],
      sig: provider.getSigner(),
    };
  };

  const connectWallet = async () => {
    try {
      if (disabled) return;

      if (!window.ethereum) {
        notify({
          title: 'No Wallet installed',
          msg: 'You need to have a Wallet installed to buy something',
          type: 'error',
        });

        return;
      }

      setDisabled(true);

      const { acc, sig } = await settingAccount();

      if (acc) {
        setAccount(acc);
        setSigner(sig);
      }
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Wallet Connection Cancelled',
          msg: 'You must connect your wallet to interact',
          type: 'error',
        });
      } else console.log('error creating contract', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        account,
        setAccount,
        signer,
        connectWallet,
        isLoadingAccount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
