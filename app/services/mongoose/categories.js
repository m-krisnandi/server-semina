const Categories = require('../../api/v1/categories/model');
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });
  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  // cari kategori dengan nama yang sama
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
  });

  // jika ada kategori dengan nama yang sama, maka throw error
  if (check) throw new BadRequestError('Kategori nama duplikat');

  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError('Kategori tidak ditemukan');

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  // cari kategori dengan field name dan id selain dari yang dikirim dari params
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  // jika ada kategori dengan nama yang sama, maka throw error
  if (check) throw new BadRequestError('Kategori nama duplikat');

  const result = await Categories.findOneAndUpdate(
    {
      _id: id,
    },
    { name, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  // jika id result false / null / undefined, maka throw error
  if (!result) throw new NotFoundError('Kategori tidak ditemukan');

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  // jika id result false / null / undefined, maka throw error
  if (!result) throw new NotFoundError('Kategori tidak ditemukan');

  await result.remove();

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  // jika id result false / null / undefined, maka throw error
  if (!result)
    throw new NotFoundError(`Kategori dengan id: ${id} tidak ditemukan`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
