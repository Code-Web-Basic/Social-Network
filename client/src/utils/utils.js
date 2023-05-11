import PropTypes from 'prop-types';

export const calculateTimePassed = (time) => {
    const unit = {
        year: 12 * 30 * 7 * 24 * 60 * 60 * 1000,
        month: 30 * 7 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
    };
    const date = new Date(typeof time === 'string' ? parseInt(time) : time);
    const formattedDate = date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });

    const convertedDate = new Date(formattedDate);
    // console.log(convertedDate.getTime);
    // var date = new Date(time);
    const diff = Date.now() - convertedDate.getTime();
    for (const key in unit) {
        if (diff > unit[key]) {
            const value = unit[key];
            const timePassed = Math.floor(diff / value);
            return `${timePassed} ${key}${timePassed > 1 ? 's' : ''}`;
        }
    }
    return 'Just now';
};

calculateTimePassed.prototype = {
    time: PropTypes.number,
};

export function timeAgo(input) {
    const date = input instanceof Date ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat('vn');
    const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1,
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];
            return formatter.format(Math.round(delta), key);
        }
    }
}
