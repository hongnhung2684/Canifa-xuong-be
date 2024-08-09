import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hassPassword } from "./../utils/password.js";

export const register = async (req, res, next) => {
  try {
    /**
     * 1. Kiểm tra email có đk đăng ký trong hệ thống chưa?
     * 2. Mã hóa pasword
     * 3.Khởi tạo user mới
     * 4.Thông báo thành công
     */

    const { email, password } = req.body;
    const useExists = await User.findOne({ email });
    console.log(useExists);
    if (useExists) {
      console.log(useExists);
      return res.status(400).json({
        message: "Email đã tồn tại!",
      });
    }
    const hassPass = hassPassword(password);
    if (!hassPass) {
      return res.status(400).json({
        message: "Ma hoa mat khau that bai!",
      });
    }
    const user = await User.create({
      email,
      password: hassPass,
    });

    user.password = undefined;

    return res.status(201).json({
      success: true,
      user,
      message: "Đăng ký thành công!",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    /**
     * 1. Kiểm tra email có đk đăng ký trong hệ thống chưa?
     * 2. Giải mã password
     * 3. Generate Token
     * 4.Thông báo thành công
     */

    const { email, password } = req.body;
    const useExists = await User.findOne({ email });
    console.log(useExists);
    if (!useExists) {
      return res.status(400).json({
        message: "Email chưa đăng ký!",
      });
    }

    const isMatch = comparePassword(password, useExists.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng!",
      });
    }

    const token = generateToken({ _id: useExists._id }, "100d");
    useExists.password = undefined;

    return res.status(200).json({
      success: true,
      user: useExists,
      accessToken: token,
      message: "Login successfully!",
    });
  } catch (error) {
    next(error);
  }
};
