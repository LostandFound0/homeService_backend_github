const { Signup, Login, Profile, UpdateProfile, Forgotpassword, Updatepassword, getAllUsers } = require('../controllers/authControllers');
const { authenticateToken } = require('../middleware/authToken');
const UserDatabase = require('../db/models/usertable');
const router = require('express').Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/forgotpassword', Forgotpassword);
router.put('/updatepassword', Updatepassword);
router.get('/profile', authenticateToken, Profile);
router.put('/profileupdate', authenticateToken, UpdateProfile);
router.get('/allusers', getAllUsers);
router.put('/admin/updateuser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phonenumber, usertype } = req.body;

    const user = await UserDatabase.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update({ firstname, lastname, email, phonenumber, usertype });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: `Error updating user: ${err}` });
  }
});
router.delete('/admin/deleteuser/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserDatabase.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: `Error deleting user: ${err}` });
  }
});

module.exports = router;
