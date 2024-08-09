import bcryptjs from "bcryptjs";
export const hassPassword = (password) => {
  // const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hashSync(password, 10);
};
export const comparePassword = (password, hassPassword) => {
  return bcryptjs.compareSync(password, hassPassword);
};
