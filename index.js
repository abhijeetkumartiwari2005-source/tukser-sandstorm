import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Note from './models/Note.js';
import User from './models/user.js';
import jwt from 'jsonwebtoken';
import authMiddleware from './middleware/auth.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('API is running and connected!');
});

// ===== POST - CREATE =====
app.post('/notes', async (req, res) => {
  try {
    const { title, body } = req.body;
    const newNote = new Note({
      title,
      body,
      isPinned: false
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== GET ALL =====
app.get('/allnotes', async (req, res) => {
  try {
    const stuff = await Note.find();
    res.status(200).json(stuff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== GET BY ID =====
app.get('/allnotes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const idstuff = await Note.findById(id);
    res.status(200).json(idstuff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== PUT - UPDATE =====
app.put('/allnotes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    
    const idstuff = await Note.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(idstuff);
   } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== DELETE =====
app.delete('/allnotes/:id', async (req, res) => {
  try {
   const id = req.params.id;
    const idstuff = await Note.findByIdAndDelete(id);
    res.status(200).json( {message: "Note deleted successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ====authentication stuff====
app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received email:', email); 
    const existingUser= await User.findOne({email});
    if(existingUser) return res.status(400).json({error: "user laready exists"});
    console.log('Existing user found:', existingUser);
      const newUser=new User({email,password});
      await newUser.save();
      res.status(201).json({message:"your account has been created", email:newUser.email});
    
    } catch (error) {
    res.status(400).json({ error: error.message});
  }
});
//==login==
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email) return res.status(401).json({error:error.message});
    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({error:"user not found"});
    if(!(await user.comparePassword(password))) return res.status(401).json({error:"wrong password"});

    const token=jwt.sign(
      {userId:user._id,email:user.email},
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
      
    )
    res.status(200).json({ message: "Login successful", token });
    } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//==profile==
app.get('/profile', authMiddleware , (req, res) => {
  try {
    res.status(200).json({
      message: "You accessed a protected route",
      userData: req.user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//===listen===

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});