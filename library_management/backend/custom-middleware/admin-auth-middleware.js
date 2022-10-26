module.exports = (req, res, next) => {
  const { user } = req;

  if (
    user.user &&
    user.user &&
    user.user.roles &&
    user.user.roles.includes("admin")
  ) {
    next();
  } else {
    return res.status(403).json({
      message: "Forbidden",
      error: true,
    });
  }
};
