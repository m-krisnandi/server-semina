const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Tipe pembayaran harus diisi'],
      minlength: [3, 'Panjang tipe pembayaran minimal 3 karakter'],
      maxLength: [20, 'Panjang tipe pembayaran maksimal 20 karakter'],
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: [true, 'Gambar harus diisi'],
    },
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);
