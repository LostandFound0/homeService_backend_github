const nlp = require('compromise');
const orderData = require('../db/models/ordertable');
const serviceDetails = require('../db/models/servicedetailstable');
const paymentData = require('../db/models/paymenttable');

const parseQuery = (query) => {
  const text = query.toLowerCase();

  if (text.includes('pending')) return { type: 'orders', filter: 0 };
  if (text.includes('accepted')) return { type: 'orders', filter: 1 };
  if (text.includes('cancelled')) return { type: 'orders', filter: 2 };
  if (text.includes('completed')) return { type: 'orders', filter: 3 };
  if (text.includes('all')) return { type: 'orders', filter: 'all' };
  if (text.includes('payment')) return { type: 'payments' };

  return { type: 'unknown' };
};

const handleNLPQuery = async (req, res) => {
  try {
    const { query } = req.body;
    const userId = req.user.id;
    const parsed = parseQuery(query);

    switch (parsed.type) {
      case 'orders': {
        const whereClause = parsed.filter === 'all'
          ? { orderuser_id: userId }
          : { orderuser_id: userId, status: parsed.filter };

        const orders = await orderData.findAll({ where: whereClause });
        return res.json({ result: orders });
      }

      case 'payments': {
        const payments = await paymentData.findAll({ where: { userId } });
        return res.json({ result: payments });
      }

      default:
        return res.status(400).json({ message: 'Could not understand your query' });
    }
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

module.exports = { handleNLPQuery };
