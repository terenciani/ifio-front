"use strict";

export default class UtilFormatter {
  // padrão dd/mm/yyyy
  static formatDateBR(date) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }
  //de isoDate para data dd/mm/yyyy
  static formatDateISOToBR(date) {
    if (!date) return null;

    const [year, month, day] = date.substring(0, 10).split("-");
    return `${day}/${month}/${year}`;
  }
  // padrão yyyy-mm-dd
  static formatDateUS(date) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`;
  }
  static formatPhone(phone) {
    if (!phone) return null;
    return `(${phone.substring(0, 2)}) ${phone.substring(
      2,
      3
    )} ${phone.substring(3, 7)}-${phone.substring(7, 11)}`;
  }
  static unMaskPhone(phone = "") {
    var str = "";
    for (var i = 0; i < phone.length; i++) {
      let char = phone.charAt(i);
      if (char != "(" && char != ")" && char != "-" && char != " ") str += char;
    }
    return str;
  } // unMask
  static numberToMoney(value = 0) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  } // numberToMoney

  static capitalizeCase(name) {
    var i, j, str, lowers;
    str = name.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ["De", "Da", "Do", "Dos", "Das", "E"];
    for (i = 0, j = lowers.length; i < j; i++)
      str = str.replace(
        new RegExp("\\s" + lowers[i] + "\\s", "g"),
        function (txt) {
          return txt.toLowerCase();
        }
      );

    return str;
  }
  static numberDot(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  } // numberDot

  static spaceTransform(space) {
    if (space < 1024) return space + " Mb";
    return (space / 1024).toFixed(2).toString().replace(".", ",") + " Gb";
  } // spaceTransform
} // class
