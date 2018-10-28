exports.default = (date) => {
    let tmpDate = new Date(date);
    return tmpDate.getFullYear() + "-" +
           tmpDate.getMonth()+ "-" +
           tmpDate.getDate() + "-" +
           tmpDate.getHours() + "'" +
           tmpDate.getMinutes()
};
