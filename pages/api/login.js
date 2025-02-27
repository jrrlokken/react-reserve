import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connectDb();

export default async (req, res) => {
  const { email, password } = req.body
  try {
    // Check to see if user exists (by email)
    const user = await User.findOne({ email }).select('+password');
    // if not, return error
    if (!user) {
      return res.status(404).send("No user exists with that email");
    }
    // check to see if the user's password matches db
    const passwordsMatch = await bcrypt.compare(password, user.password)
    // if so, generate token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id },
        process.env.JWT_SECRET,{ expiresIn: '7d' });
      // send token to client
      res.status(200).json(token);
    } else {
      res.status(401).send("Passwords do not match");
    }
  } catch {
    console.error(error)
    res.status(500).send("Server error loggin in user");
  }
}