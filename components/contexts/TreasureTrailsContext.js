import { ethers, utils } from 'ethers';
// import { ethers } from 'hardhat';

import { createContext, useContext, useEffect, useState } from 'react';
// import { treasureTrailsABI } from '@/components/abi/tresureABI';
// import { AppContext } from './AppContext';

export const TreasureTrailsContext = createContext();
const treasureTrailsAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const TreasureTrailsProvider = ({ children }) => {
  // const { signer } = useContext(AppContext);
  // const [escrows, setEscrows] = useState([]);
  // const [arbiter, setArbiter] = useState('');
  // const [beneficiary, setBeneficiary] = useState('');
  // const [amount, setAmount] = useState('');
  // const [idItem, setIdItem] = useState();
  // const [items, setItems] = useState([]);
  // const [filteredContracts, setFilteredContracts] = useState([]);
  // const [contract, setContract] = useState(null);

  // useEffect(() => {
  //   const settingContract = async () => {
  //     await ethers.getContractAt(treasureTrailsABI, treasureTrailsAddress);
  //     const treasureTrailsContract = await ethers.getContractAt(
  //       TreasureTrailsXP.abi,
  //       treasureTrailsAddress
  //     );
  //   };
  //   settingContract();
  // }, []);

  // const getTickets = async () => {
  //   const tickets = await contract.getTickets();

  //   console.log(tickets);
  //   return tickets;
  // };

  // const settingContract = (item) => {
  //   const { owner, price, id } = item;
  //   setBeneficiary(owner);
  //   setAmount(price);
  //   setIdItem(id);
  // };

  // const deploy = async (signer) => {
  //   const factory = new ethers.ContractFactory(
  //     TreasureTrailsXP.abi,
  //     TreasureTrailsXP.bytecode,
  //     signer
  //   );
  //   return factory.deploy();
  // };

  // const clearForm = () => {
  //   setArbiter('0x0');
  //   setBeneficiary('');
  //   setAmount('');
  // };

  // const newContract = async () => {
  //   if (!arbiter || !beneficiary || !amount) return;

  //   const value = utils.parseEther(amount.toString());
  //   let escrowContract;

  //   try {
  //     escrowContract = await deploy(signer, arbiter, beneficiary, value);
  //     clearForm();

  //     const escrow = {
  //       address: escrowContract.address,
  //       arbiter,
  //       beneficiary,
  //       idItem,
  //       value: amount,
  //       status: CONTRACT_STATUS.WAITING,
  //       handleApprove: async () => {
  //         escrowContract.on('Approved', () => {
  //           notify({
  //             title: 'Contract Approved',
  //             msg: 'The operation was sended successfully',
  //             type: 'info',
  //           });
  //         });

  //         // const isApproved =
  //         await approve(escrowContract, signer);

  //         // if (!isApproved) return;

  //         removeObjectWithAtt(escrows, 'address', escrow.address);
  //         escrow.status = CONTRACT_STATUS.APPROVED;
  //         setEscrows([escrow, ...escrows]);
  //       },
  //       handleReject: async () => {
  //         escrowContract.on('Rejected', () => {
  //           notify({
  //             title: 'Contract Rejected',
  //             msg: 'The operation was sended successfully',
  //             type: 'info',
  //           });
  //         });

  //         // const isRejected =
  //         await reject(escrowContract, signer);
  //         removeObjectWithAtt(escrows, 'address', escrow.address);
  //         escrow.status = CONTRACT_STATUS.REJECTED;
  //         setEscrows([escrow, ...escrows]);
  //       },
  //     };

  //     setEscrows([...escrows, escrow]);
  //   } catch (error) {
  //     if (error.code === 'ACTION_REJECTED' || error.code === 4001) {
  //       notify({
  //         title: 'Contract Creation Cancelled',
  //         msg: 'The operation was cancelled by the user',
  //         type: 'error',
  //       });
  //     } else console.log('error creating contract', error);
  //   }
  // };

  return (
    <TreasureTrailsContext.Provider
      value={
        {
          // settingContract,
          // beneficiary,
          // amount,
          // setArbiter,
          // arbiter,
          // escrows,
          // // newContract,
          // clearForm,
          // setItems,
          // items,
          // filteredContracts,
          // setFilteredContracts,
          // getTickets,
        }
      }
    >
      {children}
    </TreasureTrailsContext.Provider>
  );
};
