/* eslint-disable react/no-multi-comp */
import React from 'react';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import MysteryIcon from '../components/svg/icons/MysteryIcon';

const avatarGenerator = email => `https://api.adorable.io/avatars/${email}.png`;

const loremText =
  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.';
const storyTex =
  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea...';

const intros = [
  [
    { author: 'Anonymouns 1', elected: true, votes: '5/8', comments: '3', body: loremText },
    { author: 'Anonymouns 2', elected: false, votes: '2/8', comments: '8', body: loremText }
  ],
  [
    { author: 'Marie Clarck', elected: true, votes: '9/11', comments: '24', body: loremText },
    { author: 'Anonymouns 4', elected: false, votes: '6/11', comments: '8', body: loremText },
    { author: 'Anonymouns 6', elected: false, votes: '2/11', comments: '22', body: loremText },
    { author: 'Anonymouns 2', elected: false, votes: '1/11', comments: '2', body: loremText },
    { author: 'Anonymouns 1', elected: false, votes: '4/11', comments: '4', body: loremText }
  ],
  [
    { author: 'Anonymouns 8', elected: true, votes: '6/8', comments: '8', body: loremText },
    { author: 'Anonymouns 3', elected: false, votes: '1/8', comments: '18', body: loremText },
    { author: 'Anonymouns 5', elected: false, votes: '2/8', comments: '4', body: loremText },
    { author: 'Anonymouns 2', elected: false, votes: '1/8', comments: '2', body: loremText },
    { author: 'Anonymouns 1', elected: false, votes: '4/8', comments: '14', body: loremText }
  ],
  [
    { author: 'Anonymouns 8', elected: false, votes: '6/8', comments: '8', body: loremText },
    { author: 'Anonymouns 3', elected: false, votes: '1/8', comments: '18', body: loremText },
    { author: 'Anonymouns 5', elected: false, votes: '2/8', comments: '4', body: loremText },
    { author: 'Anonymouns 2', elected: false, votes: '1/8', comments: '2', body: loremText },
    { author: 'Anonymouns 1', elected: false, votes: '4/8', comments: '14', body: loremText }
  ]
];

const endings = [
  { author: 'Marie Clack', elected: true, votes: '11/11', comments: '33' },
  { author: 'Anonymouns 6', elected: false, votes: '5/11', comments: '15' }
];

const rounds = [
  [
    { author: 'Anonymouns 1', body: loremText, comments: 3, status: 'completed', order: 1 },
    { author: 'Anonymouns 8', body: loremText, comments: 0, status: 'completed', order: 2 },
    {
      author: 'Anonymouns 2',
      status: 'In Progress',
      timeLeft: '38 minutes and 3 seconds left.',
      order: 3
    },
    { author: 'Anonymous 7', status: 'Pendding', order: 4 },
    { author: 'Anonymous 3', status: 'Pendding', order: 5 },
    { author: 'Anonymous 6', status: 'Pendding', order: 6 },
    { author: 'Anonymous 4', status: 'Pendding', order: 7 },
    { author: 'Anonymous 5', status: 'Pendding', order: 8 }
  ],
  [
    { author: 'stephanyE289', body: loremText, comments: 0, status: 'completed', order: 1 },
    { author: 'Anonymouns 8', body: loremText, comments: 3, status: 'completed', order: 2 },
    { author: 'Marie Clarck', body: loremText, comments: 3, status: 'completed', order: 3 },
    { author: 'Anonymous 2', body: loremText, comments: 10, status: 'completed', order: 4 },
    { author: 'Anonymous 6', body: loremText, comments: 1, status: 'completed', order: 5 },
    { author: 'Anonymous 5', body: loremText, comments: 0, status: 'completed', order: 6 },
    { author: 'Jessica Eloi', body: loremText, comments: 0, status: 'completed', order: 7 },
    { author: 'Anonymous 11', body: loremText, comments: 0, status: 'completed', order: 8 },
    { author: 'Anonymous 3', body: loremText, comments: 33, status: 'completed', order: 9 },
    { author: 'Anonymous 4', body: loremText, comments: 2, status: 'completed', order: 10 },
    { author: 'Anonymous 9', body: loremText, comments: 0, status: 'completed', order: 11 }
  ],
  [
    { author: 'Anonymouns 1', body: loremText, comments: 3, status: 'completed', order: 1 },
    { author: 'Anonymouns 8', body: loremText, comments: 0, status: 'completed', order: 2 },
    {
      author: 'You',
      body: loremText.slice(0, 200),
      status: 'In Progress',
      order: 3,
      timeLeft: '45 minutes and 33 seconds left'
    },
    { author: 'Anonymous 7', status: 'Pendding', order: 4 },
    { author: 'Anonymous 3', status: 'Pendding', order: 5 },
    { author: 'Anonymous 6', status: 'Pendding', order: 6 },
    { author: 'Anonymous 4', status: 'Pendding', order: 7 },
    { author: 'Anonymous 5', status: 'Pendding', order: 8 }
  ]
];

const stories = [
  {
    id: 1,
    title: 'The Flag and The Bucket',
    totalRound: 11,
    authors: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        anonymous: true,
        storyLead: true
      },
      {
        firstName: 'Bruce',
        lastName: 'Banner',
        email: 'iamthehulk@gmail.com',
        anonymous: true,
        storyLead: false
      },
      {
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'iambatman@gmail.com',
        anonymous: true,
        storyLead: false
      }
    ],
    status: 'Waiting for players',
    genre: 'Mystery',
    startTime: '18 hours ago',
    initialIntro: storyTex,
    electedIntro: null,
    rounds: [],
    intros: [],
    endings: []
  },
  {
    id: 2,
    title: "There's a Man in The Woods",
    totalRound: 8,
    authors: [
      {
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'iamironman@gmail.com',
        profilePicture: avatarGenerator('iamironman@gmail.com'),
        anonymous: true,
        storyLead: false
      },
      {
        firstName: 'Mohammed',
        lastName: 'Ali',
        email: 'bestboxer@gmail.com',
        profilePicture: avatarGenerator('bestboxer@gmail.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Joe',
        lastName: 'Frazier',
        email: 'joe@gmail.com',
        profilePicture: avatarGenerator('joe@gmail.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Mike',
        lastName: 'Tyson',
        email: 'ironmike@gmail.com',
        profilePicture: avatarGenerator('ironmike@gmail.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Sylvester',
        lastName: 'Stalone',
        email: 'stalone@gmail.com',
        profilePicture: avatarGenerator('stalone@gmail.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@smith.com',
        profilePicture: avatarGenerator('john@smith.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Toussaint',
        lastName: 'Louverture',
        email: 'toussaint@louverture.com',
        profilePicture: avatarGenerator('toussaint@louverture.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Jean Jacques',
        lastName: 'Dessalines',
        email: 'empereur@gmail.com',
        profilePicture: avatarGenerator('empereur@gmail.com'),
        anonymous: false,
        storyLead: true
      }
    ],
    status: 'In Progress',
    genre: 'Thriller',
    startTime: '1 day and 13 hours ago',
    initialIntro: storyTex,
    electedIntro: storyTex,
    rounds: rounds[0],
    intros: intros[0],
    endings: []
  },
  {
    id: 3,
    title: 'Snitches',
    totalRound: 11,
    authors: [
      {
        firstName: 'Freddy',
        lastName: 'Mercury',
        email: 'freddy@mercury.com',
        profilePicture: avatarGenerator('freddy@mercury.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'John',
        lastName: 'Lenon',
        email: 'therealenon@gmail.com',
        profilePicture: avatarGenerator('therealenon@gmail.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Jackie',
        lastName: 'Chan',
        email: 'jackie@chan.com',
        profilePicture: avatarGenerator('jackie@chan.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Bruce',
        lastName: 'Lee',
        email: 'wahtah@gmail.com',
        profilePicture: avatarGenerator('wahtah@gmail.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'James',
        lastName: 'Bond',
        email: 'james007@mi6.com',
        profilePicture: avatarGenerator('james007@mi6.com'),
        anonymous: true,
        storyLead: false
      },
      {
        firstName: 'Elephant',
        lastName: 'Man',
        email: 'elephant@man.com',
        profilePicture: avatarGenerator('elephant@man.com'),
        anonymous: true,
        storyLead: false
      },
      {
        firstName: 'Joe',
        lastName: 'Budden',
        email: 'joe@budden.com',
        profilePicture: avatarGenerator('joe@budden.com'),
        anonymous: true,
        storyLead: false
      },
      {
        firstName: 'Marshall',
        lastName: 'Matthers',
        email: 'eminem@gmail.com',
        profilePicture: avatarGenerator('eminem@gmail.com'),
        anonymous: true,
        storyLead: false
      },
      {
        firstName: 'Marie',
        lastName: 'Clark',
        fullName: 'Marie Clark',
        email: 'busta@gmail.com',
        profilePicture: avatarGenerator('busta@gmail.com'),
        anonymous: false,
        storyLead: true
      },
      {
        firstName: 'Curtis',
        lastName: 'Jackson',
        email: 'iam50cent@gmail.com',
        profilePicture: avatarGenerator('iam50cent@gmail.com'),
        anonymous: false,
        storyLead: false
      }
    ],
    status: 'Completed',
    genre: 'Action',
    startTime: '2 days and 7 hours ago',
    initialIntro: storyTex,
    electedIntro: storyTex,
    rounds: rounds[1],
    intros: intros[1],
    endings
  },
  {
    id: 4,
    title: 'Alphonso, The Barber',
    totalRound: 11,
    authors: [
      {
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@email.com',
        profilePicture: avatarGenerator('liu@gmail.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Shao',
        lastName: 'Khan',
        email: 'shao@gmail.com',
        profilePicture: avatarGenerator('shao@gmail.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Johny',
        lastName: 'Cage',
        email: 'johny@cage.com',
        profilePicture: avatarGenerator('johny@cage.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Shan',
        lastName: 'Tsung',
        email: 'shan@tsung.com',
        profilePicture: avatarGenerator('shan@tsung.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Kung',
        lastName: 'Lao',
        email: 'kung@lao.com',
        profilePicture: avatarGenerator('kung@lao.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Scarlett',
        lastName: 'Johansson',
        email: 'scarlett@gmail.com',
        profilePicture: '',
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Lady',
        lastName: 'Gaga',
        email: 'lady@gmail.com',
        profilePicture: avatarGenerator('lady@gaga.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Van Damme',
        lastName: 'Jean-Claude',
        email: 'spinningkicks@gmail.com',
        profilePicture: avatarGenerator('spinningkicks@gmail.com'),
        anonymous: false,
        storyLead: true
      }
    ],
    status: 'In Progress',
    genre: 'Romance',
    startTime: '1 day and 13 hours ago',
    initialIntro: storyTex,
    electedIntro: storyTex,
    rounds: rounds[2],
    intros: intros[2],
    endings: []
  }
];

const genres = [
  {
    id: 1,
    name: 'Mystery',
    description: 'For those stories that keep you questioning everything',
    icon: size => <MysteryIcon width={size} />,
    color: '#43A047'
  },
  {
    id: 2,
    name: 'Action',
    description: 'Stories that keep your adrenaline high!',
    icon: size => <MaterialCommunityIcons size={size} color="white" name="run" />,
    color: '#13BCBC'
  },
  {
    id: 3,
    name: 'Thriller',
    description: "Stories that won't let you sleep at night",
    icon: size => <MaterialCommunityIcons size={size} color="white" name="skull" />,
    color: '#29B6F6'
  },
  {
    id: 4,
    name: 'Sci-Fi',
    description: 'Stories that keep your imagination pumping',
    icon: size => <MaterialCommunityIcons size={size} color="white" name="alien" />,
    color: '#5E35B1'
  },
  {
    id: 5,
    name: 'Romance',
    description: 'For those stories that bring more love into the air',
    icon: size => <AntDesign size={size} color="white" name="heart" />,
    color: '#FCF42A'
  },
  {
    id: 7,
    name: 'Bedtime Stories',
    description: "Kid's stories to help the little ones sleep peacefully",
    icon: size => <Ionicons size={size} color="white" name="ios-bed" />,
    color: '#faf'
  }
];

const comments = [
  {
    id: 0,
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.',
    startTime: '2 hours ago',
    author: stories[0].authors[0]
  },
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.',
    startTime: '25 minutes ago',
    author: stories[0].authors[1]
  },
  {
    id: 2,
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.',
    startTime: '3 hours ago',
    author: stories[0].authors[2]
  },
  {
    id: 3,
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.',
    startTime: '45 minutes ago',
    author: stories[0].authors[0]
  },
  {
    id: 4,
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.',
    startTime: '2 minutes ago',
    author: stories[0].authors[0]
  },
  {
    id: 5,
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.',
    startTime: '5 minutes ago',
    author: stories[0].authors[1]
  },
  {
    id: 6,
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.',
    startTime: '5 hours ago',
    author: stories[0].authors[2]
  },
  {
    id: 7,
    content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.',
    startTime: '35 minutes ago',
    author: stories[0].authors[0]
  }
];

export { loremText, intros, endings, stories, comments, genres };
