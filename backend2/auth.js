const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Organization = require('./models/Organization');
const Opportunity = require('./models/Opportunity');

const router = express.Router();

// User Register route
router.post('/user_register', async (req, res) => {
  const { name, email, age, highSchool, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, age, highSchool, password: hashedPassword, interests });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error });
  }
});

// User Login route
router.post('/user_login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).send({ message: 'Invalid name or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid name or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
});

// Organization Register route
router.post('/org_register', async (req, res) => {
  const { name, email, password, description, contact } = req.body;
  try {
    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) {
      return res.status(400).send({ message: 'Organization already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const organization = new Organization({ name, email, password: hashedPassword, description, contact });
    await organization.save();
    res.status(201).send({ message: 'Organization registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error registering organization', error });
  }
});

// Organization Login route
router.post('/org_login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const org = await Organization.findOne({ email });
    if (!org) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: org._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
});

// Create Opportunity route
router.post('/create_opportunity', async (req, res) => {
  const { title, description, location, genre, organization, created_at } = req.body;
  try {
    const existingOpp = await Opportunity.findOne({ organization });
    if (existingOpp) {
      return res.status(400).send({ message: 'Opportunity already exists' });
    }
    const opportunity = new Opportunity({ title, description, location, genre, organization, created_at });
    await opportunity.save();
    res.status(201).send({ message: 'Opportunity has been successfully created' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating opportunity', error });
  }
});

module.exports = router;
