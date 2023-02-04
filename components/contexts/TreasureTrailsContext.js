import { ethers, utils } from 'ethers';

import { createContext, useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { treasureTrailsABI } from '@/components/abi/tresureABI';
import { ACTIVITY_TYPE } from '@/utils/enums';
import { notify } from '../utils/Toaster';
import { useRouter } from 'next/router';

export const TreasureTrailsContext = createContext();

export const TreasureTrailsProvider = ({ children }) => {
  const router = useRouter();
  const { account, signer } = useContext(AppContext);
  const [contract, setContract] = useState();
  const [tickets, setTickets] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [credits, setCredits] = useState(0);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [hasValidTicket, setHasValidTicket] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (signer && !contract) settingContract();
    contract && settingBasics();
  }, [signer, contract]);

  const checkValidTicket = (mTick) => {
    const validTicket = mTick.find((t) => {
      const expiresTS = parseInt(t.expiresAt.toString() + '000');

      return expiresTS > new Date().getTime();
    });

    if (validTicket) setHasValidTicket(true);
  };

  const settingContract = () => {
    const myTreasureTrailsXP = new ethers.Contract(
      process.env.NEXT_PUBLIC_TREASURE_CONTRACT_ADDRESS,
      treasureTrailsABI,
      signer
    );
    setContract(myTreasureTrailsXP);
  };

  const settingBasics = async () => {
    try {
      const mTick = await contract.getMyTickets();
      checkValidTicket(mTick);
      setMyTickets(mTick);

      setTickets(await contract.getTickets());
      setCredits(await contract.getCredits());

      setActiveChallenges(
        await contract.getActiveActivities(ACTIVITY_TYPE.CHALLENGE)
      );

      const theOwner = await contract.owner();
      setIsOwner(theOwner.toLowerCase() === account.toLowerCase());
      setIsLoading(false);
    } catch (error) {
      notify({
        title: 'Error at the begining',
        msg: 'Something wrong just happening',
        type: 'error',
      });
    }
  };

  const buyTicket = async (ticketId) => {
    try {
      const ticket = tickets[ticketId];

      if (!ticket.isActive) {
        notify({
          title: 'Ticket not available',
          msg: "Ticket isn't active",
          type: 'error',
        });
      } else {
        const tx1 = await contract?.buyTicket(ticketId, {
          value: ticket.price,
        });
        notify({
          title: 'Buy Ticket in Progress',
          msg: 'The confirmation is on the way',
          type: 'info',
        });

        await tx1.wait();

        notify({
          title: 'Buy Ticket Successfully',
          msg: 'Welcome to the park',
          type: 'info',
        });

        router.push('/active-challenges');
      }
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Buy Ticket Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error buying ticket', error);
    }
  };

  const addTicket = async (name, price, durationInDays, initialCredits) => {
    try {
      const tx1 = await contract?.addTicket(
        name,
        utils.parseEther(price.toString()),
        durationInDays,
        initialCredits
      );

      notify({
        title: 'Add Ticket in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });

      await tx1.wait();

      notify({
        title: 'Add Ticket Successfully',
        msg: 'Ticket is available to be buyed by the customers',
        type: 'info',
      });
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Add Ticket Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error adding ticket', error);
    }
  };

  const addActivity = async (
    name,
    description,
    earnCredits,
    discountCredits,
    expiresAt,
    activityType
  ) => {
    try {
      const tx1 = await contract?.addActivity(
        name,
        description,
        earnCredits,
        discountCredits,
        expiresAt,
        activityType
      );
      notify({
        title: 'Add Activity in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });

      await tx1.wait();

      notify({
        title: 'Add Activity Created',
        msg: 'Waiting activation',
        type: 'info',
      });

      const activities = await contract.getActivities();
      const tx2 = await contract.toggleActivity(activities.length - 1, true);

      await tx2.wait();

      notify({
        title: 'Add Activity Successfully',
        msg: 'Activity is available to be buyed by the customers',
        type: 'info',
      });
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Add Activity Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error adding activity', error);
    }
  };

  const completeChallenge = async (activityIndex) => {
    try {
      const tx1 = await contract?.completeChallenge(activityIndex);
      await tx1.wait();

      notify({
        title: 'Challenge Completed Successfully',
        msg: 'Congratulations, you have winned XX credits. Go with the next challenge',
        type: 'info',
      });
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Challenge Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error completing challenge', error);
    }
  };

  return (
    <TreasureTrailsContext.Provider
      value={{
        isOwner,
        addActivity,
        addTicket,
        buyTicket,
        tickets,
        credits,
        activeChallenges,
        myTickets,
        hasValidTicket,
        isLoading,
        completeChallenge,
      }}
    >
      {children}
    </TreasureTrailsContext.Provider>
  );
};
