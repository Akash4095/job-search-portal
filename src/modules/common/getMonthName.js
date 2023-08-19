

export function extractMonthNames(dateList) {
    let monthNames = "";
    let date = [`${dateList}`]
    const options = { month: 'long' }; // 'long' gives you full month name
    if (date && date.length > 0) {
        date.forEach(dateString => {
            const [day, month, year] = dateString.split('-');
            const dateObject = new Date(`${year}-${month}-${day}`);
            const monthName = dateObject.toLocaleString('en-US', options);
            monthNames = monthName;
        });
    }
    return monthNames;
}