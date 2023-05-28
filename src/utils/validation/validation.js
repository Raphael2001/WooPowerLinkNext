export default function Validate(value, rules) {
  const Validations = {
    no_validation: {
      valid: (val) => true,
      msg: "",
    },
    not_empty: {
      valid: (val) => val !== "" && val !== undefined,
      msg: "שדה חובה",
    },

    email: {
      valid: (val) =>
        /^([\w!#$%&'*+-/=?^`{|}~]+\.)*[\w!#$%&'*+-/=?^`{|}~]+@((((([a-zA-Z0-9]{1}[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]{1})|[a-zA-Z])\.)+[a-zA-Z]{2,6})|(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?)$/.test(
          val
        ),
      msg: 'כתובת דוא"ל שגויה',
    },
    cell: {
      valid: (val) =>
        /^(?:(0(?:50|51|52|53|54|55|57|58|72|73|74|76|77|78)[-]?[0-9]{7}))$/.test(
          val
        ),
      msg: "מספר סלולרי שגוי",
    },
    phone: {
      valid: (val) =>
        /^(?:(0(?:2|3|4|8|9|7|50|51|52|53|54|55|56|57|58|59|72|73|74|76|77|78)[-]?[0-9]{7}))$/.test(
          val
        ),
      msg: "מספר טלפון שגוי",
    },
    id: {
      valid: (val) => /^[0-9]*$/.test(val) && val.length === 9,
      msg: "תעודת זהות לא תקינה",
    },
    full_name: {
      valid: (val) =>
        /^([\w\u0590-\u05FF]{2,})+\s+([\w\u0590-\u05FF\s]{2,})+$/.test(val),
      msg: "יש למלא שם פרטי ושם משפחה",
    },

    checkbox: {
      valid: (val) => val,
      msg: "שדה חובה",
    },
    required_select: {
      valid: (val) => {
        if (val === undefined) return false;
        return val !== -1;
      },
      msg: "שדה חובה",
    },
    required_radio: {
      valid: (val) => {
        if (val === undefined) return false;
        return true;
      },
      msg: "שדה חובה",
    },
    required_date: {
      valid: (val) => {
        return !!val;
      },
      msg: "שדה חובה",
    },
    number_of_seats: {
      valid: (val) => {
        if (!isNaN(val) && val > 0) {
          return true;
        }
        return false;
      },
      msg: "מספר כיסאות אינו תקין",
    },
  };

  let valid = true;
  let msg = "";

  for (const rule of rules) {
    if (typeof rule === "function") {
      valid = rule();
      msg = "שדה חובה";
    } else {
      if (!Validations[rule].valid(value)) {
        valid = false;
        msg = Validations[rule].msg;
        break;
      }
    }
  }

  return { valid, msg };
}
