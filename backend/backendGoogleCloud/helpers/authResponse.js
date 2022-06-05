const {production} = require("../config");

function authResponse(res, result, statusCode) {
  if(result.success) {
    const {token, ...data} = result;

    return res.cookie("token", token, {
      httpOnly: true,
      secure: production, // Solo disponible a través de https*
      sameSite: "none",
      expires: new Date(new Date().setDate(new Date().getDate() + 7))
    }).json(data);
  }

  return res.status(statusCode).json(result);
}

function providerResponse(res, result, statusCode) {
  if(result.success) {
    const {token, ...data} = result;

    return res.cookie("token", token, {
      httpOnly: true,
      secure: production, // Solo disponible a través de https*
      sameSite: "none",
      expires: new Date(new Date().setDate(new Date().getDate() + 7))
    }).redirect("http://localhost:5500/frontend/index.html");
  }

  return res.status(statusCode).json(result);
}

function deleteCookie(res) {
  return res.cookie("token", "", {
    httpOnly: true,
    secure: production,
    sameSite: "none",
    expires: new Date()
  }).json({
    success: true,
    message: "Successfully logged out"
  });
}

module.exports = {
  authResponse,
  providerResponse,
  deleteCookie
};