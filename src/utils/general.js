import translationsApp from "@/translations/app";

export function getCurrentLang() {
    return localStorage.getItem("language") ?? process.env.VUE_APP_LANG;
}

/**
 * @param {String} title
 * @returns {String}
 */
export function translate(title) {
    const lang = getCurrentLang(),
        translations = translationsApp;

    if (!translations?.[lang]?.[title]) {
        return title;
    }

    return translations[lang][title];
}

/**
 * Склонение различных чисел
 * @param number
 * @param {string[]} words
 * @returns {String} Примеры: number: 1, return "год"; number: 2, return "года"; number: 11, return "лет"
 */
export function numberDeclension(number, words = ["years_single", "years_decl", "years_many"]) {
    words = words.map(translate);

    if (!number) {
        return words[2];
    }

    number = String(number);
    if (number[number.length - 1] === "1" && number[number.length - 2] !== "1") {
        return words[0];
    }

    if (["2", "3", "4"].indexOf(number[number.length - 1]) !== -1 && number[number.length - 2] !== "1") {
        return words[1];
    }

    return words[2];
}
