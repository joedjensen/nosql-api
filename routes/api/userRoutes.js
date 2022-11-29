const router = require('express').Router();
const {
    getUsers, getSingleUser, addFriend, removeFriend, createUser
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;