import './models';

import mongoose from 'mongoose';
import User from './models/User';
import Topic from './models/Topic';
import Comment from './models/Comment';
import Category from './models/Category';

const MONGO_URI = 'mongodb://mongodb:27017/forum';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding.');

    await User.deleteMany({});
    await Topic.deleteMany({});
    await Comment.deleteMany({});
    await Category.deleteMany({});

    const categories = await Category.insertMany([
      { name: 'General', description: 'General discussion' },
      { name: 'Announcements', description: 'Official announcements' },
      { name: 'Off-Topic', description: 'Random discussions' },
      { name: 'Feedback', description: 'Forum feedback and suggestions' },
    ]);
    console.log('Categories created:', categories);

    const moderator = new User({ username: 'Admin', password: 'password123', role: 'moderator' });
    moderator.save();

    const moderators = [moderator];

    console.log('Moderators created:', moderators);

    const user1 = new User({ username: 'Betonkevero', password: 'password123', role: 'user' });
    user1.save();
    const user2 = new User ({ username: 'Beka', password: 'password123', role: 'user' });
    user2.save();
    const users = [user1, user2];

    console.log('Users created:', users);

    const topics = await Topic.insertMany([
      {
        title: 'Welcome to the Forum!',
        content: 'This is the first topic. Welcome everyone!',
        category: categories[0]._id,
        author: moderators[0]._id,
      },
      {
        title: 'Site Updates',
        content: 'Check out the latest updates on the forum.',
        category: categories[1]._id,
        author: moderators[0]._id,
      },
      {
        title: 'General Chat',
        content: 'Talk about anything here.',
        category: categories[0]._id,
        author: users[0]._id,
      },
    ]);
    console.log('Topics created:', topics);

    await Comment.insertMany([
      {
        content: 'Great forum, thanks for setting this up!',
        topic: topics[0]._id,
        author: users[1]._id,
      },
      {
        content: 'Looking forward to more updates.',
        topic: topics[1]._id,
        author: moderators[0]._id,
      },
      {
        content: 'This is a fun place to chat.',
        topic: topics[2]._id,
        author: users[0]._id,
      },
    ]);
    console.log('Comments created.');

    console.log('Database seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
