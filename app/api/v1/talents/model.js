const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let talentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama harus diisi'],
    },
    role: {
      type: String,
      default: '-',
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
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

module.exports = model('Talent', talentSchema);
