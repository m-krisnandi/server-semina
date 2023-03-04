const Orders = require('../../api/v1/orders/model');

const getAllOrders = async (req) => {
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let condition = {};

  if (req.user.role !== 'owner') {
    condition = { ...condition, 'historyEvent.organizer': req.user.organizer };
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    condition = {
      ...condition,
      date: {
        $gte: start,
        $lte: end,
      },
    };
  }

  const result = await Orders.find(condition)
    // .populate({ path: 'event', match: { organizer: req.user.organizer } })
    .limit(limit)
    .skip((page - 1) * limit);

  const count = await Orders.countDocuments(condition);

  return {
    data: result,
    pages: Math.ceil(count / limit),
    total: count,
  };
};

module.exports = {
  getAllOrders,
};
