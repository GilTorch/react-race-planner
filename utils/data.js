import React from 'react';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import MysteryIcon from '../components/svg/icons/MysteryIcon';

const avatarGenerator = email => `https://api.adorable.io/avatars/${email}.png`;

const stories = [
  {
    title: 'The Flag and The Bucket',
    authors: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        profilePicture: avatarGenerator('john@doe.com'),
        anonymous: true,
        storyLead: true
      },
      {
        firstName: 'Bruce',
        lastName: 'Banner',
        email: 'iamthehulk@gmail.com',
        profilePicture: avatarGenerator('iamthehulk@gmail.com'),
        anonymous: true,
        storyLead: false
      },
      {
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'iambatman@gmail.com',
        profilePicture: avatarGenerator('iambatman@gmail.com'),
        anonymous: true,
        storyLead: false
      },
      {
        firstName: 'Clark',
        lastName: 'Kent',
        email: 'iamsuperman@gmail.com',
        profilePicture: avatarGenerator('iamsuperman@gmail.com'),
        anonymous: true,
        storyLead: false
      },
      {
        firstName: 'John',
        lastName: 'Wick',
        email: 'dontouchmydog@gmail.com',
        profilePicture: avatarGenerator('dontouchmydog@gmail.com'),
        anonymous: true,
        storyLead: false
      }
    ],
    status: 'In Progress',
    genre: 'Mystery',
    startTime: '18 hours ago',
    initialIntro:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea',
    electedIntro: null,
    votes: []
  },
  {
    title: "There's a Man in The Woods",
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
    initialIntro:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea',
    electedIntro:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea',
    votes: []
  },
  {
    title: 'Snitches',
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
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Elephant',
        lastName: 'Man',
        email: 'elephant@man.com',
        profilePicture: avatarGenerator('elephant@man.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Joe',
        lastName: 'Budden',
        email: 'joe@budden.com',
        profilePicture: avatarGenerator('joe@budden.com'),
        anonymous: false,
        storyLead: false
      },
      {
        firstName: 'Marshall',
        lastName: 'Matthers',
        email: 'eminem@gmail.com',
        profilePicture: avatarGenerator('eminem@gmail.com'),
        anonymous: false,
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
    initialIntro:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea',
    electedIntro:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea',
    votes: []
  },
  {
    title: 'Alphonso, The Barber',
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
    initialIntro:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea',
    electedIntro:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea',
    votes: []
  }
];

const genres = [
  {
    name: 'Mystery',
    icon: size => <MysteryIcon width={size} height={size} />,
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
export { stories, genres };
