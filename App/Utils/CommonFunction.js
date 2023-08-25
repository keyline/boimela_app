import moment from "moment"

export const offerPercentage = (regularpp, salepp) => {
    let diff = regularpp - salepp
    let value = diff / regularpp * 100
    return parseInt(value)
}

export const dateFormat = (date) => {
    if (date) {
        return moment(new Date(date)).format("MMMM DD, YYYY")
    } else {
        return null
    }
}

export const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}