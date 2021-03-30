const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

const helper = {
    formatDate : (date) => {
        let newDate = new Date(date);
        const year = newDate.getFullYear();
        const dateIndex = newDate.getDate();
        const month = months[newDate.getMonth()];
        const day = days[newDate.getDay()];

        const formattedDate = `${day}, ${dateIndex} ${month} ${year}`
        return formattedDate;

    }
}

export default helper;