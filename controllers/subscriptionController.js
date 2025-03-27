const subscriptionDatabase = require('../db/models/subscription');
const userData = require('../db/models/usertable');

const Subscription = async (req, res) => {
    try {
        const userid = req.user.id;
        const { cardFullname, cardNumber, expMonth, expYear, cvv, backGround_Check, amount,
            criminalRecord, healthBAckground, gender, race, termsandCondition
        } = req.body;

        const workCertificate = req.files['workCertificate'] ? req.files['workCertificate'][0].filename : null;
        const drugtest = req.files['drugtest'] ? req.files['drugtest'][0].filename : null;
        const idproof = req.files['idproof'] ? req.files['idproof'][0].filename : null;

        console.log('Files received:', { workCertificate, drugtest, idproof });

        const takeSubscription = await subscriptionDatabase.create({
            cardFullname,
            cardNumber,
            expMonth,
            expYear,
            cvv,
            workCertificate,
            drugtest,
            idproof,
            amount,
            backGround_Check,
            criminalRecord,
            healthBAckground,
            gender,
            race,
            termsandCondition,
            userID: userid
        });

        if (takeSubscription) {
            try {
                await userData.update({
                    usertype: 1
                }, {
                    where: {
                        id: userid
                    }
                });
                res.status(200).json({
                    message: "Subscription Success"
                });
            } catch (updateError) {
                console.error('Failed to update userType:', updateError);
                res.status(500).json({
                    message: 'Subscription succeeded, but failed to update userType'
                });
            }
        }
    } catch (error) {
        console.error('Subscription error:', error);
        res.status(500).json({
            message: `${error}`
        });
    }
};

const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await subscriptionDatabase.findAll();
        res.status(200).json({
            data: subscriptions
        });
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({
            message: 'An error occurred while fetching subscriptions'
        });
    }
};

module.exports = { Subscription, getAllSubscriptions };
