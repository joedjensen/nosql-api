const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  users = [{username: 'joe', email: 'joe.d.jensen@gmail.com'}]

  await User.collection.insertMany(users)
  
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
