import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import bcrypt from 'bcrypt';


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
    
    // Send back token
  } catch {

  } finally {

  }
}