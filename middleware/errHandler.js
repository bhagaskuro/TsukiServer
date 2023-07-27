module.exports = (err, req, res, next) => {
  let message;
  let status;
  console.log(err);
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      message = err.errors[0].message;
      status = 400;
      break;

    case "SequelizeForeignKeyConstraintError":
      message = "Table still used in active cuisine.";
      status = 400;
      break;

    case "reqEmailPassword":
      message = "Email/Password required";
      status = 400;
      break;

    case "invalid":
    case "JsonWebTokenError":
      message = "access token is missing";
      status = 401;
      break;

    case "emailpassword":
      message = "Invalid email/password";
      status = 401;
      break;

    case "NotFound":
      message = "Data Not Found";
      status = 404;
      break;

    case "forbidden":
      message = "Forbidden Error";
      status = 403;
      break;

    default:
      message = err.message || "Internal Server Error";
      status = err.status || 500;
      break;
  }
  res.status(status).json({ message });
};
