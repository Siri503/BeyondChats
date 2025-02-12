import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import errorHandler  from '../utils/error.js';
export const test = (req, res) => {
    res.json({
      message: 'Api route is working!',
    });
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User has been deleted successfully...' });
  } catch (error) {
    next(error);
  }
};

// export const getUserListings=async(req,res,next)=>{
  // console.log(req.user.id);
  // console.log(req.params.id);
  // if (req.user.id === req.params.id) {
    // try {
      // const stocks = await Stock.find({ userRef: req.params.id });
      // res.status(200).json(stocks);
    // } catch (error) {
      // next(error);
    // }
  // } else {
    // return next(errorHandler(401, 'You can only view your own listings!'));
  // }
// }