const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, 'Tipe tiket harus diisi'],
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  sumTicket: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'Tanggal harus diisi'],
    },
    personalDetail: {
      firstName: {
        type: String,
        required: [true, 'Nama depan harus diisi'],
        minlength: [3, 'Panjang nama depan minimal 3 karakter'],
        maxLength: [20, 'Panjang nama depan maksimal 20 karakter'],
      },
      lastName: {
        type: String,
      },
      email: {
        type: String,
        required: [true, 'Email harus diisi'],
      },
      role: {
        type: String,
        default: 'Designer',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
        type: mongoose.Types.ObjectId,
        ref: 'Participant',
        required: true,
    },
    payment: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
        required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    historyEvent: {
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
      tagline: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
