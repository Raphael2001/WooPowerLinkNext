import jwt_decode from "jwt-decode";

// generate unique IDs
export function generateUniqueId(length) {
  const result = [];
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

export function getBase64(file, cb) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}
export function getHoursByStartEnd(startHour, endHour) {
  const hours = [];
  for (let i = startHour; i <= endHour; i++) {
    const hour = formatTime(i);
    hours.push(hour);
  }
  return hours;
}
export function getMinutesByInterval(interval = 1) {
  const minutes = [];
  for (let i = 0; i < 60; i += interval) {
    const minute = formatTime(i);
    minutes.push(minute);
  }
  return minutes;
}

export function formatTime(time) {
  if (typeof time === "string") {
    return time;
  }

  return time < 10 ? `0${time}` : time.toString();
}

export function combineClassNames(...classes) {
  let res = "";
  classes.forEach((cls) => {
    res += cls ? cls + " " : "";
  });
  return res;
}

export function parseJWT(token) {
  const decoded = jwt_decode(token);
  return decoded;
}

export function chekcForJWTexp(token) {
  const currentTime = Math.floor(Date.now() / 1000);
  const decodedToken = parseJWT(token);
  const exp = decodedToken.exp;

  if (exp - 1 <= currentTime) {
    return true;
  }
  return false;
}
