import bcrypt from 'bcryptjs';

const users = [
  { id: '123', username: 'user1', password: 'pass123', role: 'user' },
  { id: '1', username: 'admin1', password: 'adminpass', role: 'admin' }
];

users.forEach(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  console.log(user);
});
