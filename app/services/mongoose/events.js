const Events = require('../../api/v1/events/model');
const { checkingImage } = require('./images');
const { checkingCategories } = require('../mongoose/categories');
const { checkingTalents } = require('../mongoose/talents');

const { NotFoundError, BadRequestError } = require('../../errors');

const getAllEvents = async (req) => {
  const { keyword, category, talent, status } = req.query;

  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  if (status) {
    condition = {
      ...condition,
      statusEvent: { $regex: status, $options: 'i' },
    };
  }

  const result = await Events.find(condition)
    .populate({ path: 'image', select: '_id name' })
    .populate({
      path: 'category',
      select: '_id name',
    })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id name' },
    });

  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagLine,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  // cari image, category, talent dengan id yang diinputkan
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  // cari Events dengan title yang sama
  const check = await Events.findOne({ title });

  if (check) throw new BadRequestError('Judul event sudah ada');

  // buat event baru
  const result = await Events.create({
    title,
    date,
    about,
    tagLine,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id })
    .populate({ path: 'image', select: '_id name' })
    .populate({
      path: 'category',
      select: '_id name',
    })
    .populate({
      path: 'talent',
      select: '_id name role image',
      populate: { path: 'image', select: '_id name' },
    });

  if (!result) throw new NotFoundError(`Event dengan id ${id} tidak ditemukan`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagLine,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  const checkId = await Events.findOne({ _id: id });

  if (!checkId)
    throw new NotFoundError(`Event dengan id : ${id} tidak ditemukan`);

  // cari image, category, talent dengan id yang diinputkan
  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  // cari Events dengan title dan id yang berbeda
  const check = await Events.findOne({ title, _id: { $ne: id } });

  if (check) throw new BadRequestError('Judul event sudah ada');

  // update event
  const result = await Events.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      date,
      about,
      tagLine,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

const updateStatusEvents = async (req) => {
  const { id } = req.params;
  const { statusEvent } = req.body;

  const check = await Events.findOne({ _id: id });

  if (!check) throw new NotFoundError(`Event dengan id ${id} tidak ditemukan`);

  const result = await Events.findOneAndUpdate(
    {
      _id: id,
    },
    {
      statusEvent,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Event dengan id ${id} tidak ditemukan`);

  await result.remove();

  return result;
};

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  updateStatusEvents,
  deleteEvents,
};