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
  const { account, signer, isLoadingAccount } = useContext(AppContext);
  const [contract, setContract] = useState();
  const [tickets, setTickets] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [credits, setCredits] = useState(0);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [hasValidTicket, setHasValidTicket] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [challengesCompleted, setChallengesCompleted] = useState([]);

  const allowedRoutes = ['/', '/tickets'];

  useEffect(() => {
    if (!isLoadingAccount && !account) {
      if (isOwner) return;

      if (!allowedRoutes.includes(router.pathname)) {
        router.push('/');
      }
    } else if (!isLoading) {
      if (isOwner) return;

      if (!hasValidTicket) router.push('/tickets');
      else if (allowedRoutes.includes(router.pathname))
        router.push('/challenges');
    }
  }, [
    isOwner,
    account,
    hasValidTicket,
    isLoading,
    router.pathname,
    isLoadingAccount,
  ]);

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
    else setHasValidTicket(false);
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
      setActivities(await getActivities());
      setChallengesCompleted(await getChallengesCompleted());

      setActiveChallenges(
        await contract.getActiveActivities(ACTIVITY_TYPE.CHALLENGE)
      );

      const theOwner = await contract.owner();
      setIsOwner(theOwner.toLowerCase() === account.toLowerCase());
      setIsLoading(false);
    } catch (error) {
      console.log('error :>> ', error);
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

        checkValidTicket(await contract.getMyTickets());
        setCredits(await contract.getCredits());
        router.push('/challenges');
      }
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Buy Ticket Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else {
        notify({
          title: 'Buy Ticket Error',
          msg: 'Just one ticket per person',
          type: 'error',
        });
      }
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

      setTickets(await contract.getTickets());
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Add Ticket Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else {
        notify({
          title: 'Add Ticket Error',
          msg: 'Check logs',
          type: 'error',
        });
        console.log('error adding ticket', error);
      }
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
        title: 'Add Activity Successfully',
        msg: 'Activity is available to be buyed by the customers',
        type: 'info',
      });

      setActivities(await getActivities());
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
      setCredits(await contract.getCredits());

      notify({
        title: 'Challenge Completed Successfully',
        msg: 'Congratulations, you have winned XX credits. Go with the next challenge',
        type: 'info',
      });

      setChallengesCompleted(await getChallengesCompleted());
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Challenge Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else {
        notify({
          title: 'Challenge Error',
          msg: 'Somthing wrong happened',
          type: 'error',
        });
        console.log('error completing challenge', error);
      }
    }
  };

  const getActivities = async () => {
    try {
      return await contract.getActivities();
    } catch (error) {
      notify({
        title: 'Getting Activities Error',
        msg: 'Something wrong happening with the restaurant',
        type: 'error',
      });
    }
  };

  const getChallengesCompleted = async () => {
    try {
      const cc = await contract.getChallengesCompleted();
      return cc.map((c) => parseInt(c.toString()));
    } catch (error) {
      notify({
        title: 'Getting Activity Player Error',
        msg: 'Something wrong happening with the restaurant',
        type: 'error',
      });
    }
  };

  const getMenuRestaurant = async (restaurantIndex) => {
    try {
      return await contract.getMenuRestaurant(restaurantIndex);
    } catch (error) {
      notify({
        title: 'Menu Restaurant Error',
        msg: 'Something wrong happening with the restaurant',
        type: 'error',
      });
    }
  };

  const getIdsMenuRestaurant = async (restaurantIndex) => {
    try {
      const cc = await contract.getIdsMenuRestaurant(restaurantIndex);
      return cc.map((c) => parseInt(c.toString()));
    } catch (error) {
      notify({
        title: 'Menu Restaurant Error',
        msg: 'Something wrong happening with the restaurant',
        type: 'error',
      });
    }
  };

  const getIdsProductsStore = async (attractionIndex) => {
    try {
      const cc = await contract.getIdsProductsStore(attractionIndex);
      return cc.map((c) => parseInt(c.toString()));
    } catch (error) {
      notify({
        title: 'Store Products Error',
        msg: 'Something wrong happening with the restaurant',
        type: 'error',
      });
    }
  };

  const addRestaurant = async (name) => {
    try {
      const tx1 = await contract.addRestaurant(name);

      notify({
        title: 'Add Restaurant in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });
      await tx1.wait();

      notify({
        title: 'Add Restaurant Confirmed',
        msg: 'The restaurant was created successfully',
        type: 'info',
      });
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Add Restaurant Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error completing challenge', error);
    }
  };

  const setMenuRestaurant = async (restaurantIndex, menu) => {
    try {
      const tx1 = await contract.setMenuRestaurant(restaurantIndex, menu);

      notify({
        title: 'Add Menu Restaurant in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });
      await tx1.wait();

      notify({
        title: 'Add Menu Restaurant Confirmed',
        msg: 'The restaurant was created successfully',
        type: 'info',
      });
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Add Menu Restaurant Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error completing challenge', error);
    }
  };

  const addStore = async (name) => {
    try {
      const tx1 = await contract.addStore(name);

      notify({
        title: 'Add Store in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });
      await tx1.wait();

      notify({
        title: 'Add Store Confirmed',
        msg: 'The restaurant was created successfully',
        type: 'info',
      });
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Add Store Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error completing challenge', error);
    }
  };

  const setStoreProducts = async (attractionIndex, menu) => {
    try {
      const tx1 = await contract.setProductsStore(attractionIndex, menu);

      notify({
        title: 'Add Product to the Store in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });
      await tx1.wait();

      notify({
        title: 'Add Product to the Store Confirmed',
        msg: 'The restaurant was created successfully',
        type: 'info',
      });
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Add Product to the Store Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error completing challenge', error);
    }
  };

  const buyMeals = async (restaurantIndex, meals) => {
    try {
      const tx1 = await contract.buyMeals(restaurantIndex, meals);

      notify({
        title: 'Buy Meals in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });
      await tx1.wait();

      notify({
        title: 'Buy Meals Confirmed',
        msg: 'The restaurant was created successfully',
        type: 'info',
      });

      setCredits(await contract.getCredits());
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Buy Meals Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else {
        notify({
          title: 'Buy Meals Error',
          msg: 'Check logs',
          type: 'error',
        });
        console.log('error completing challenge', error);
      }
    }
  };

  const buyProducts = async (restaurantIndex, meals) => {
    try {
      const tx1 = await contract.buyProducts(restaurantIndex, meals);

      notify({
        title: 'Buy Products in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });
      await tx1.wait();

      notify({
        title: 'Buy Products Confirmed',
        msg: 'The restaurant was created successfully',
        type: 'info',
      });

      setCredits(await contract.getCredits());
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Buy Products Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else {
        notify({
          title: 'Buy Products Error',
          msg: 'Check logs',
          type: 'error',
        });
        console.log('error completing challenge', error);
      }
    }
  };

  const entranceAttraction = async (attractionIndex) => {
    try {
      const tx1 = await contract.entranceAttraction(attractionIndex);

      notify({
        title: 'Entering Attraction in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });
      await tx1.wait();

      notify({
        title: 'Entering Attraction Confirmed',
        msg: 'You have entered to the attraction successfully',
        type: 'info',
      });

      setCredits(await contract.getCredits());
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Entering Attraction Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error completing challenge', error);
    }
  };

  const exitAttraction = async (attractionIndex) => {
    try {
      const tx1 = await contract.exitAttraction(attractionIndex);

      notify({
        title: 'Exit Attraction in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });
      await tx1.wait();

      notify({
        title: 'Exit Attraction Confirmed',
        msg: 'You went out from the attraction successfully',
        type: 'info',
      });

      setCredits(await contract.getCredits());
    } catch (error) {
      if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
        notify({
          title: 'Exit Attraction Error',
          msg: 'Operation was cancelled by the user, please try again',
          type: 'error',
        });
      } else console.log('error completing challenge', error);
    }
  };

  const getEntranceCount = async (attractionIndex) => {
    try {
      const counter = await contract.getEntranceCount(attractionIndex);
      return parseInt(counter);
    } catch (error) {
      notify({
        title: 'Get Entrance Count Error',
        msg: 'Something wrong happening with the entrance count',
        type: 'error',
      });
    }
  };

  const getExitCount = async (attractionIndex) => {
    try {
      const counter = await contract.getExitCount(attractionIndex);
      return parseInt(counter);
    } catch (error) {
      notify({
        title: 'Get Exit Count Error',
        msg: 'Something wrong happening with the exit count',
        type: 'error',
      });
    }
  };

  const withdraw = async () => {
    try {
      const tx1 = await contract.withdraw();

      notify({
        title: 'Withdraw in Progress',
        msg: 'The confirmation is on the way',
        type: 'info',
      });
      await tx1.wait();

      notify({
        title: 'Withdraw Confirmed',
        msg: 'Money successfully withdrawed',
        type: 'info',
      });
    } catch (error) {
      notify({
        title: 'Withdraw Error',
        msg: 'Something wrong happening with the exit count',
        type: 'error',
      });
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
        myTickets,
        hasValidTicket,
        isLoading,

        activeChallenges,
        completeChallenge,

        challengesCompleted,
        getChallengesCompleted,

        activities,
        getActivities,
        buyMeals,
        buyProducts,

        getMenuRestaurant,
        addRestaurant,
        setMenuRestaurant,

        getIdsMenuRestaurant,
        getIdsProductsStore,

        addStore,
        setStoreProducts,

        entranceAttraction,
        exitAttraction,
        getEntranceCount,
        getExitCount,

        withdraw,
      }}
    >
      {children}
    </TreasureTrailsContext.Provider>
  );
};
