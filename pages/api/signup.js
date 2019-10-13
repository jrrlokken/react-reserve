import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body
  try {
    // Validate inputs (name, email, password)
    if (!isLength(name, { min: 3, max: 20 })) {
      return res.status(422).send("Name must be 3-20 characters long");
    } else if (!isLength(password, { min: 8 })) {
      return res.status(422).send("Password must be at least 8 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }
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
    // Create cart for the new user
    await new Cart({ user: newUser._id }).save();
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