const messages = [
  {
    _id: 1,
    text: 'Look at how chocho sleep in my arms!',
    createdAt: new Date(),
    sent: true,
    received: true,
  },
  {
    _id: 2,
    text: "Of course, let me know if you're on your way",
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 2,
    },
  },
  {
    _id: 3,
    text: "K, I'm on my way",
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 1,
    },
  },
  {
    _id: 4,
    text: 'Very Good morning, yes',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 1,
    },
  },
  {
    _id: 5,
    text: 'https://zluck.com',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 1,
    },
  },
  {
    _id: 6,
    text: 'Good morning, did you sleep well?',
    createdAt: new Date(),
    sent: true,
    received: true,
  },
];

export default messages;
