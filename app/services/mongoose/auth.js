const Users = require('../../api/v1/users/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError('Email dan password harus diisi');

  const result = await Users.findOne({ email });
  if (!result) throw new UnauthorizedError('Email atau password salah');

  const isMatch = await result.comparePassword(password);
  if (!isMatch) throw new UnauthorizedError('Email atau password salah');

  const token = createJWT({ payload: createTokenUser(result) });

  return { token, role: result.role };
};

module.exports = { signin };
