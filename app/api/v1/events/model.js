const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const ticketCategoriesSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Tipe tiket harus diisi'],
  },
  price: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  statusTicketCategories: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  expired: {
    type: Date,
  },
});

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Judul harus diisi'],
      minlength: [3, 'Judul minimal 3 karakter'],
      maxlength: [50, 'Judul maksimal 50 karakter'],
    },
    date: {
      type: Date,
      required: [true, 'Tanggal dan waktu harus diisi'],
    },
    about: {
      type: String,
    },
    tagLine: {
      type: String,
      required: [true, 'Tagline harus diisi'],
    },
    keyPoint: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, 'Tempat acara harus diisi'],
    },
    statusEvent: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: 'Talent',
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organizer',
      required: [true, 'Penyelenggara harus diisi'],
    },
  },
  { timestamps: true }
);

module.exports = model('Event', eventSchema);
