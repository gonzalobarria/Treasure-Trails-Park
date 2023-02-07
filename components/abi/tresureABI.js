export const treasureTrailsABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_parkName',
        type: 'string',
      },
      {
        internalType: 'int256',
        name: '_diffTZ',
        type: 'int256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'ApprovedBuy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'ChallengeStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'activityTypes',
    outputs: [
      {
        internalType: 'enum TreasureTrailsXPFactory.ActivityType',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_earnCredits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_discountCredits',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_expiresAt',
        type: 'uint256',
      },
      {
        internalType: 'enum TreasureTrailsXPFactory.ActivityType',
        name: '_activityType',
        type: 'uint8',
      },
    ],
    name: 'addActivity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
    name: 'addRestaurant',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
    ],
    name: 'addStore',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_durationInDays',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_initialCredits',
        type: 'uint256',
      },
    ],
    name: 'addTicket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_restaurantIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_items',
        type: 'uint256[]',
      },
    ],
    name: 'buyMeals',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_storeIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_items',
        type: 'uint256[]',
      },
    ],
    name: 'buyProducts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_ticketIndex',
        type: 'uint256',
      },
    ],
    name: 'buyTicket',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'canjeaToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_activityIndex',
        type: 'uint256',
      },
    ],
    name: 'completeChallenge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_activityIndex',
        type: 'uint256',
      },
    ],
    name: 'entranceAttraction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_activityIndex',
        type: 'uint256',
      },
    ],
    name: 'exitAttraction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum TreasureTrailsXPFactory.ActivityType',
        name: '_activityType',
        type: 'uint8',
      },
    ],
    name: 'getActiveActivities',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'earnCredits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'discountCredits',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256',
          },
          {
            internalType: 'enum TreasureTrailsXPFactory.ActivityType',
            name: 'activityType',
            type: 'uint8',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.Activity[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getActivities',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'earnCredits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'discountCredits',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256',
          },
          {
            internalType: 'enum TreasureTrailsXPFactory.ActivityType',
            name: 'activityType',
            type: 'uint8',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.Activity[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_activityIndex',
        type: 'uint256',
      },
    ],
    name: 'getActivity',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'earnCredits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'discountCredits',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256',
          },
          {
            internalType: 'enum TreasureTrailsXPFactory.ActivityType',
            name: 'activityType',
            type: 'uint8',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.Activity',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getChallengesCompleted',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCredits',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_activityId',
        type: 'uint256',
      },
    ],
    name: 'getEntranceCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_activityId',
        type: 'uint256',
      },
    ],
    name: 'getExitCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_restaurantIndex',
        type: 'uint256',
      },
    ],
    name: 'getIdsMenuRestaurant',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_storeIndex',
        type: 'uint256',
      },
    ],
    name: 'getIdsProductsStore',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_restaurantIndex',
        type: 'uint256',
      },
    ],
    name: 'getMenuRestaurant',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'earnCredits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'discountCredits',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256',
          },
          {
            internalType: 'enum TreasureTrailsXPFactory.ActivityType',
            name: 'activityType',
            type: 'uint8',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.Activity[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMyTickets',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'ticketIndex',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.TicketPlayer[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_storeIndex',
        type: 'uint256',
      },
    ],
    name: 'getProductsStore',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'earnCredits',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'discountCredits',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'expiresAt',
            type: 'uint256',
          },
          {
            internalType: 'enum TreasureTrailsXPFactory.ActivityType',
            name: 'activityType',
            type: 'uint8',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.Activity[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRestaurants',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.Restaurant[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStores',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.Store[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_ticketIndex',
        type: 'uint256',
      },
    ],
    name: 'getTicket',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'durationInDays',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialCredits',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.Ticket',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTickets',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'durationInDays',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialCredits',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isActive',
            type: 'bool',
          },
        ],
        internalType: 'struct TreasureTrailsXPFactory.Ticket[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'restaurants',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_restaurantIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_meals',
        type: 'uint256[]',
      },
    ],
    name: 'setMenuRestaurant',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_storeIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_products',
        type: 'uint256[]',
      },
    ],
    name: 'setProductsStore',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'stores',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_activityIndex',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_isActive',
        type: 'bool',
      },
    ],
    name: 'toggleActivity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_ticketIndex',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_isActive',
        type: 'bool',
      },
    ],
    name: 'toggleTicket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
];
