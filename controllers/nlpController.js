const nlp = require('compromise');
const orderData = require('../db/models/ordertable');
const serviceDetails = require('../db/models/servicedetailstable');
const paymentData = require('../db/models/paymenttable');

const parseQuery = (query) => {
  const doc = nlp(query.toLowerCase());

  if (doc.has('pending orders')) return { type: 'orders', filter: 'pending' };
  if (doc.has('completed orders')) return { type: 'orders', filter: 'completed' };
  if (doc.has('all services')) return { type: 'services', filter: 'all' };
  if (doc.has('payment details') || doc.has('payments')) return { type: 'payments' };

  return { type: 'unknown' };
};

const handleNLPQuery = async (req, res) => {
  try {
    const { query } = req.body;
    const userId = req.user.id;
    const parsed = parseQuery(query);

    switch (parsed.type) {
      case 'orders':
        const orders = await orderData.findAll({
          where: { orderuser_id: userId, status: parsed.filter }
        });
        return res.json({ result: orders });

      case 'services':
        const services = await serviceDetails.findAll({ where: { user_id: userId } });
        return res.json({ result: services });

      case 'payments':
        const payments = await paymentData.findAll({ where: { userId } });
        return res.json({ result: payments });

      default:
        return res.status(400).json({ message: 'Could not understand your query' });
    }
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

module.exports = { handleNLPQuery };
