const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const concertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  venue: String,
  date: String,
  bands: [String],
});

const Concert = mongoose.model('Concert', concertSchema);
const conc = new Concert({
  title: 'Sonic Temple',
  venue: 'Columbus Crew Stadium',
  date: '052024',
  bands: ['Pantera', 'Misfits, Imminence, Lacuna Coil'],
});
conc.save().then(
  () => console.log('One entry added'),
  (err) => console.log(err)
);

// MongoDB Connection
const db = process.env.MONGO_URI || '';

async function connectToDatabase() {
  try {
    await mongoose.connect(db);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

app.get('/concert', (req, res) => {
  async function entries() {
    const concerts = await Concert.find({});
    return concerts;
  }
  entries().then((x) => res.send(x));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
