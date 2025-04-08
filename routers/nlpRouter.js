const router = require('express').Router();
const { authenticateToken } = require('../middleware/authToken');
const { handleNLPQuery } = require('../controllers/nlpController');

router.post('/nlp-query', authenticateToken, handleNLPQuery);

module.exports = router;
