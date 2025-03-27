const router = require('express').Router();
const { authenticateToken } = require('../middleware/authToken');
const { Subscription, getAllSubscriptions } = require('../controllers/subscriptionController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const fileDetails = path.join(__dirname, '../files');
if (!fs.existsSync(fileDetails)) {
    fs.mkdirSync(fileDetails, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, fileDetails);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.route('/subscription').post(
    authenticateToken,
    upload.fields([
        { name: 'workCertificate', maxCount: 1 },
        { name: 'drugtest', maxCount: 1 },
        { name: 'idproof', maxCount: 1 }
    ]),
    Subscription
);
router.get('/subscriptions', getAllSubscriptions);

module.exports = router;
