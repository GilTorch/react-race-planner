import React from 'react';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import MysteryIcon from '../components/svg/icons/MysteryIcon';

const avatarGenerator = email => `https://api.adorable.io/avatars/${email}.png`;

const loremText =
  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.';

const stories = [
  {
    title: 'The Flag and The Bucket',
    screenName: 'InProgressStory',
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
    initialIntro: loremText,
    electedIntro: null,
    rounds: [],
    intros: [],
    endings: []
  },
  {
    title: "There's a Man in The Woods",
    screenName: 'StartedStory',
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
    initialIntro: loremText,
    electedIntro: loremText,
    rounds: rounds[0],
    intros: intros[0],
    endings: []
  },
  {
    title: 'Snitches',
    screenName: 'CompletedStory',
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
        firstName: 'Busta',
        lastName: 'Rhymes',
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
    initialIntro: loremText,
    electedIntro: loremText,
    rounds: rounds[1],
    intros: intros[1],
    endings: [0]
  },
  {
    title: 'Alphonso, The Barber',
    screenName: 'UserPartOfStory',
    authors: [
      {
        firstName: 'Liu',
        lastName: 'Kang',
        email: 'liu@gmail.com',
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
    initialIntro: loremText,
    electedIntro: loremText,
    rounds: rounds[2],
    intros: intros[2],
    endings: []
  }
];

const intros = [
  [
    { subTitle: 'By Anonymouns 1', elected: true, votes: '5/8', comments: '3' },
    { subTitle: 'By Anonymouns 2', elected: false, votes: '2/8', comments: '8' }
  ],
  [
    { subTitle: 'By Marie Clarck', elected: true, votes: '9/11', comments: '24' },
    { subTitle: 'By Anonymouns 4', elected: false, votes: '6/11', comments: '8' },
    { subTitle: 'By Anonymouns 6', elected: false, votes: '2/11', comments: '22' },
    { subTitle: 'By Anonymouns 2', elected: false, votes: '1/11', comments: '2' },
    { subTitle: 'By Anonymouns 1', elected: false, votes: '4/11', comments: '4' }
  ],
  [
    { subTitle: 'By Anonymouns 8', elected: true, votes: '6/8', comments: '8' },
    { subTitle: 'By Anonymouns 3', elected: false, votes: '1/8', comments: '18' },
    { subTitle: 'By Anonymouns 5', elected: false, votes: '2/8', comments: '4' },
    { subTitle: 'By Anonymouns 2', elected: false, votes: '1/8', comments: '2' },
    { subTitle: 'By Anonymouns 1', elected: false, votes: '4/8', comments: '14' }
  ],
  [
    { subTitle: 'By Anonymouns 8', elected: false, votes: '6/8', comments: '8' },
    { subTitle: 'By Anonymouns 3', elected: false, votes: '1/8', comments: '18' },
    { subTitle: 'By Anonymouns 5', elected: false, votes: '2/8', comments: '4' },
    { subTitle: 'By Anonymouns 2', elected: false, votes: '1/8', comments: '2' },
    { subTitle: 'By Anonymouns 1', elected: false, votes: '4/8', comments: '14' }
  ]
];

const endings = [
  { subTitle: 'By Marie Clack', elected: true, votes: '11/11', comments: '33' },
  { subTitle: 'By Anonymouns 6', elected: false, votes: '5/11', comments: '15' }
];

const rounds = [
  [
    { author: 'Anonymouns 1', body: loremText, comments: 3, status: 'completed' },
    { author: 'Anonymouns 8', body: loremText, comments: 0, status: 'completed' },
    { author: 'Anonymouns 2', status: 'In Progress', timeLeft: '38 minutes and 3 seconds left.' },
    { author: 'Anonymous 7', status: 'Pendding' },
    { author: 'Anonymous 3', status: 'Pendding' },
    { author: 'Anonymous 6', status: 'Pendding' },
    { author: 'Anonymous 4', status: 'Pendding' },
    { author: 'Anonymous 5', status: 'Pendding' }
  ],
  [
    { author: 'stephanyE289', body: loremText, comments: 0, status: 'completed' },
    { author: 'Anonymouns 8', body: loremText, comments: 3, status: 'completed' },
    { author: 'Marie Clarck', body: loremText, comments: 3, status: 'completed' },
    { author: 'Anonymous 2', body: loremText, comments: 10, status: 'completed' },
    { author: 'Anonymous 6', body: loremText, comments: 1, status: 'completed' },
    { author: 'Anonymous 5', body: loremText, comments: 0, status: 'completed' },
    { author: 'Jessica Eloi', body: loremText, comments: 0, status: 'completed' },
    { author: 'Anonymous 11', body: loremText, comments: 0, status: 'completed' },
    { author: 'Anonymous 3', body: loremText, comments: 33, status: 'completed' },
    { author: 'Anonymous 4', body: loremText, comments: 2, status: 'completed' },
    { author: 'Anonymous 9', body: loremText, comments: 0, status: 'completed' }
  ],
  [
    { author: 'Anonymouns 1', body: loremText, comments: 3, status: 'completed' },
    { author: 'Anonymouns 8', body: loremText, comments: 0, status: 'completed' },
    {
      author: 'You',
      body: loremText.slice(0, 200),
      status: 'In Progress',
      timeLeft: '45 minutes and 33 seconds left'
    },
    { author: 'Anonymous 7', status: 'Pendding' },
    { author: 'Anonymous 3', status: 'Pendding' },
    { author: 'Anonymous 6', status: 'Pendding' },
    { author: 'Anonymous 4', status: 'Pendding' },
    { author: 'Anonymous 5', status: 'Pendding' }
  ]
];

const genres = [
  {
    name: 'Mystery',
    icon: size => <MysteryIcon width={size} />,
    color: '#43A047'
  },
  {
    name: 'Action',
    icon: size => <MaterialCommunityIcons size={size} color="white" name="run" />,
    color: '#13BCBC'
  },
  {
    name: 'Thriller',
    icon: size => <MaterialCommunityIcons size={size} color="white" name="skull" />,
    color: '#29B6F6'
  },
  {
    name: 'Sci-Fi',
    icon: size => <MaterialCommunityIcons size={size} color="white" name="alien" />,
    color: '#5E35B1'
  },
  {
    name: 'Romance',
    icon: size => <AntDesign size={size} color="white" name="heart" />,
    color: '#FCF42A'
  },
  {
    name: 'Essay',
    icon: size => <AntDesign size={size} color="white" name="book" />,
    color: '#ED8A18'
  },
  {
    name: 'Bedtime Stories',
    icon: size => <Ionicons size={size} color="white" name="ios-bed" />,
    color: '#faf'
  }
];
export { loremText, intros, endings, stories, genres };
