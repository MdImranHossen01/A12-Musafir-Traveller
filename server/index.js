require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 5000;

// =================================================================
// CONFIGURATIONS
// =================================================================

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// CORS Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://musafirtraveller.vercel.app',
    'https://marvelous-gaufre-bd3a39.netlify.app',
  ],
  credentials: true
}));
app.use(express.json());





// Multer Config for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB Connection
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
//     ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
//     : require("./firebase-admin-sdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
//==========================================================
app.get('/test-jwt', (req, res) => {
  const payload = { email: 'test@example.com' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });


  // Verify right away to test
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Verification failed', error: err.message });
    }
    res.send({ token, decoded });
  });
});



async function run() {
  try {
    // It's good practice to connect explicitly
    await client.connect();

    // Define all collections in one place
    const db = client.db("touristGuideDB");
    const usersCollection = db.collection("users");
    const packagesCollection = db.collection("packages");
    const storiesCollection = db.collection("stories");
    const bookingsCollection = db.collection("bookings");
    const applicationsCollection = db.collection("applications");
    const paymentsCollection = db.collection("payments");

    console.log('✅ Successfully connected to MongoDB and set up collections');

    app.get('/', (req, res) => {
      res.send('Tourist Guide Server is running and ready to accept requests!');
    });

    // =================================================================
    // MIDDLEWARES FOR TOKEN VERIFICATION
    // =================================================================
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        console.warn("⚠️ No Authorization header found");
        return res.status(401).send({ message: 'Unauthorized access' });
      }
      const token = req.headers.authorization.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error("❌ JWT verification failed:", err.message);
          return res.status(401).send({ message: 'Unauthorized access' });
        }
        req.decoded = decoded;
        next();
      });
    };


    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await usersCollection.findOne({ email });
      if (user?.role !== 'admin') {
        return res.status(403).send({ message: 'Forbidden access' });
      }
      next();
    };

    // =================================================================
    // ALL ROUTES
    // =================================================================


    // Create Payment Intent
    app.post('/api/create-payment-intent', async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100); // in cents
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card']
      });
      res.send(paymentIntent.client_secret);
    });

    // Save payment and update booking
    app.post('/api/payments', async (req, res) => {
      const { bookingId, transactionId } = req.body;

      const payment = {
        bookingId,
        transactionId,
        paidAt: new Date()
      };

      const result = await paymentsCollection.insertOne(payment);

      await bookingsCollection.updateOne(
        { _id: new ObjectId(bookingId) },
        { $set: { status: 'in review', transactionId } }
      );

      res.send({ success: true });
    });

    // --- Health & Auth Routes ---
    app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

    app.post('/jwt', (req, res) => {
      const email = req.body?.email;
      if (!email) return res.status(400).send({ message: "Missing email for JWT" });

      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.send({ token });
    });
    // --- Image Upload Route ---
    app.post('/upload', upload.single('image'), async (req, res) => {
      try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file provided' });
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: "travel-stories" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }).end(req.file.buffer);
        });
        res.json({ success: true, url: result.secure_url });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Upload failed' });
      }
    });

    // --- User & Guide Routes ---
// In your backend route
app.get('/user/:email', verifyToken, async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.send({ 
      role: user.role,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL 
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

    app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
      const { search, role, page = 1, size = 10 } = req.query;
      let query = {};
      if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
      if (role) query.role = role;
      const result = await usersCollection.find(query).skip((parseInt(page) - 1) * parseInt(size)).limit(parseInt(size)).toArray();
      res.send(result);
    });
    app.get('/users/count', verifyToken, verifyAdmin, async (req, res) => {
      const { search, role } = req.query;
      let query = {};
      if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
      if (role) query.role = role;
      const count = await usersCollection.countDocuments(query);
      res.send({ count });
    });
    app.post('/users', async (req, res) => {
      const email = req.body.email.toLowerCase();
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) return res.send({ message: 'User already exists' });

      const result = await usersCollection.insertOne({
        ...req.body,
        email, // save lowercase
      });

      res.send(result);
    });
    app.patch('/user/role/:id', verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { role: req.body.role } });
      res.send(result);
    });


    // --- Add this new route for updating user profiles ---
    app.patch('/user/profile', verifyToken, async (req, res) => {
      const { name, photoURL } = req.body;
      const email = req.decoded.email;

      try {
        // 1. Update Firebase Authentication
        const userRecord = await admin.auth().getUserByEmail(email);
        await admin.auth().updateUser(userRecord.uid, {
          displayName: name,
          photoURL: photoURL,
        });

        // 2. Update MongoDB
        const filter = { email: email };
        const updateDoc = {
          $set: {
            name: name,
            photoURL: photoURL
          }
        };
        await usersCollection.updateOne(filter, updateDoc);

        res.send({ success: true, message: 'Profile updated successfully' });
      } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).send({ success: false, message: 'Failed to update profile.' });
      }
    });


    app.get('/guides', verifyToken, async (req, res) => {
      const result = await usersCollection.find({ role: 'tour-guide' }).toArray();
      res.send(result);
    });
    app.get('/guide/:id', async (req, res) => {
      const result = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    // GET all users who are tour guides (This is a public route)
    app.get('/all-guides', async (req, res) => {
      const result = await usersCollection.find({ role: 'tour-guide' }).toArray();
      res.send(result);
    });

    // --- Package Routes ---
    app.get('/packages', async (req, res) => {
      const { page = 1, size = 10 } = req.query;
      const result = await packagesCollection.find().skip((parseInt(page) - 1) * parseInt(size)).limit(parseInt(size)).toArray();
      res.send(result);
    });
    app.get('/packages/count', async (req, res) => {
      const count = await packagesCollection.countDocuments();
      res.send({ count });
    });
    app.get('/package/:id', async (req, res) => {
      const result = await packagesCollection.findOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });
    app.get('/packages/random', async (req, res) => {
      const result = await packagesCollection.aggregate([{ $sample: { size: 3 } }]).toArray();
      res.send(result);
    });
    app.post('/packages', verifyToken, verifyAdmin, async (req, res) => {
      const result = await packagesCollection.insertOne(req.body);
      res.send(result);
    });

    // --- Story Routes ---
    // --- Add these two new routes inside your run() function ---

    // GET a single story by its ID
    app.get('/story/:id', verifyToken, async (req, res) => {
      const result = await storiesCollection.findOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    // --- Add this new route inside your run() function ---

    // GET a single story by its ID (Public)
    app.get('/story-details/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const result = await storiesCollection.findOne({ _id: new ObjectId(id) });

        if (!result) {
          return res.status(404).send({ message: 'Story not found' });
        }

        res.send(result);
      } catch (error) {
        console.error('❌ Error fetching story details:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });


    // PATCH to update a story
    app.patch('/story/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const updatedContent = req.body;
      const story = await storiesCollection.findOne({ _id: new ObjectId(id) });

      // Security check: Make sure the user owns the story
      if (!story || story.authorEmail !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }

      const result = await storiesCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...updatedContent, updatedAt: new Date() } }
      );
      res.send(result);
    });

    // --- Add these two new routes inside your run() function ---

    // GET all stories for a specific user
    app.get('/stories/my-stories/:email', verifyToken, async (req, res) => {
      // Security check: Make sure the logged-in user is requesting their own stories
      if (req.decoded.email !== req.params.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      const result = await storiesCollection.find({ authorEmail: req.params.email }).sort({ createdAt: -1 }).toArray();
      res.send(result);
    });

    // DELETE a story by its ID
    app.delete('/stories/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const story = await storiesCollection.findOne({ _id: new ObjectId(id) });

      // Security check: Make sure the logged-in user is the owner of the story
      if (!story || story.authorEmail !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }

      const result = await storiesCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get('/stories', async (req, res) => {
      const result = await storiesCollection.find().sort({ createdAt: -1 }).toArray();
      res.send(result);
    });
    app.get('/stories/random', async (req, res) => {
      const result = await storiesCollection.aggregate([{ $sample: { size: 4 } }]).toArray();
      res.send(result);
    });
    app.get('/stories/by-guide/:email', async (req, res) => {
      const result = await storiesCollection.find({ authorEmail: req.params.email }).toArray();
      res.send(result);
    });
    app.post('/stories', verifyToken, async (req, res) => {
      const storyData = {
        ...req.body,
        createdAt: new Date(),
        authorEmail: req.decoded.email
      };
      const result = await storiesCollection.insertOne(storyData);
      res.send(result);
    });

    // --- Booking Routes ---
    app.post('/bookings', verifyToken, async (req, res) => {
      const result = await bookingsCollection.insertOne(req.body);
      res.send(result);
    });
    app.get('/my-bookings/:email', verifyToken, async (req, res) => {
      const { page = 1, size = 10 } = req.query;
      const result = await bookingsCollection.find({ touristEmail: req.params.email }).skip((parseInt(page) - 1) * parseInt(size)).limit(parseInt(size)).toArray();
      res.send(result);
    });
    app.get('/bookings/count/:email', verifyToken, async (req, res) => {
      const count = await bookingsCollection.countDocuments({ touristEmail: req.params.email });
      res.send({ count });
    });
    app.patch('/booking/status/:id', verifyToken, async (req, res) => {
      const result = await bookingsCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { status: req.body.status } });
      res.send(result);
    });
    app.get('/my-assigned-tours/:email', verifyToken, async (req, res) => {
      const result = await bookingsCollection.find({ 'guide.email': req.params.email }).toArray();
      res.send(result);
    });

    // Get single booking by ID
    app.get('/bookings/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      try {
        const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });
        if (!booking) {
          return res.status(404).send({ message: 'Booking not found' });
        }
        res.send(booking);
      } catch (error) {
        console.error('Failed to fetch booking by ID:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    // --- Add this new route inside your run() function ---

    // DELETE a booking by its ID
    app.delete('/booking/:id', verifyToken, async (req, res) => {
      const id = req.params.id;
      const booking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

      // Security check: Make sure the logged-in user is the owner of the booking
      if (!booking || booking.touristEmail !== req.decoded.email) {
        return res.status(403).send({ message: 'forbidden access' });
      }

      const result = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });


    // Get 6 random tour guides
    app.get('/guides/random', verifyToken, async (req, res) => {
      try {
        const result = await usersCollection.aggregate([
          { $match: { role: 'tour-guide' } },
          { $sample: { size: 6 } }
        ]).toArray();
        res.send(result);
      } catch (error) {
        console.error("Failed to get random guides:", error);
        res.status(500).send({ message: "Failed to get guides" });
      }
    });


    // --- Application Routes ---
    app.get('/applications', verifyToken, verifyAdmin, async (req, res) => {
      const result = await applicationsCollection.find().toArray();
      res.send(result);
    });
    app.post('/applications', verifyToken, async (req, res) => {
      const result = await applicationsCollection.insertOne(req.body);
      res.send(result);
    });
    app.patch('/applications/accept/:id', verifyToken, verifyAdmin, async (req, res) => {
      await usersCollection.updateOne({ email: req.body.email }, { $set: { role: 'tour-guide' } });
      const result = await applicationsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });
    app.delete('/applications/:id', verifyToken, verifyAdmin, async (req, res) => {
      const result = await applicationsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    // --- Admin Stats Route ---
    app.get('/admin-stats', verifyToken, verifyAdmin, async (req, res) => {
      const [totalTourists, totalGuides, totalPackages, totalStories] = await Promise.all([
        usersCollection.countDocuments({ role: 'tourist' }),
        usersCollection.countDocuments({ role: 'tour-guide' }),
        packagesCollection.countDocuments(),
        storiesCollection.countDocuments()
      ]);
      res.send({ totalTourists, totalGuides, totalPackages, totalStories, totalRevenue: 0 });
    });

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
}

run().catch(console.error);