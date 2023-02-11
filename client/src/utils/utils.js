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

    const diff = Date.now() - time;
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
