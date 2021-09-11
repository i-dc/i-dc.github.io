import {getCurrentLang, numberDeclension, translate} from "@/utils/general";

export function getMapLink(coords) {
    const lang = getCurrentLang();

    if (lang && ["ru", "ua"].indexOf(lang) !== -1) {
        return `https://yandex.${lang}/maps/?text=${coords[0]},${coords[1]}`;
    }

    return `https://google.com/maps/search/${coords[0]},${coords[1]}`;
}

/**
 * Расстояние между небезызвестными пунктами A и B
 * @param {object} pointA
 * @param {object} pointB
 * @returns {number}
 */
export function getDistance(pointA, pointB) {
    const points = {
        a: [pointA[0] * Math.PI / 180, pointA[1] * Math.PI / 180],
        b: [pointB[0] * Math.PI / 180, pointB[1] * Math.PI / 180]
    }, planetRadius = 6371000; /** Радиус текущей планеты */

    const angle = Math.acos(Math.sin(points["a"][0]) * Math.sin(points["b"][0]) + Math.cos(points["a"][0]) * Math.cos(points["b"][0]) * Math.cos(points["b"][1] - points["a"][1]));
    return Math.round(planetRadius * angle); /** Расстояние между точками в метрах */
}

/**
 * @param {number} distance
 * @param {number} speed
 * @returns {string}
 */
export function getWalkingTime(distance, speed = 3400) {
    const result = [];
    let hours = 0, minutes = Math.round(60 * (distance / speed));

    if (minutes > 60) {
        hours = (minutes - minutes % 60) / 60;
        minutes = minutes % 60;
    }

    if (hours) {
        result.push(hours + " " + numberDeclension(hours, ["hours_single", "hours_decl", "hours_many"]));
    }

    if (minutes) {
        result.push(minutes + " " + numberDeclension(minutes, ["minutes_single_alt", "minutes_decl", "minutes_many"]));
    }

    return result.join(" ");
}

/**
 * @param {number} distance
 * @returns {string}
 */
export function beautifyDistance(distance) {
    if (distance < 1000) {
        return String(distance) + " " + translate("meter_short");
    }

    return String(Math.floor(distance / 100) / 10) + " " + translate("kilometer_short");
}

/**
 * @param {array} pointA
 * @param {array} pointB
 * @param {string} routeType
 * @returns {string} yamaps link
 */
export function getRouteLink(pointA, pointB, routeType = "mt") {
    return "https://yandex.ru/maps/?from=api-maps&mode=routes&rtext=" + String(pointB[0]) + "%2C" + String(pointB[1]) + "~" + String(pointA[0]) + "%2C" + String(pointA[1]) + "&rtt=" + routeType;
}
