export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieExpireDays = parseInt(process.env.COOKIE_EXPIRES) || 10; // Convert "10d" to number

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000), // Convert days to milliseconds
      httpOnly: true,
      sameSite: "None",
      secure: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
