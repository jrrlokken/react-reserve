import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body
  try {
    // Check to see if user already exists in db
    const user = await User.findOne({ email })
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    // If not, hash password
    const hash = await bcrypt.hash(password, 10);
    // Create user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    console.log({newUser});
    // Create token for the new user
    const token = jwt.sign({ userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' });
    // Send back token
    res.status(201).json(token);
  } catch {
    console.error(error)
    res.status(500).send("Server error while signing up user.  Please try again later.");
  }
}