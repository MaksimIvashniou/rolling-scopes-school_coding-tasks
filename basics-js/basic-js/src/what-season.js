const { NotImplementedError } = require('../lib');

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  if (!date) return 'Unable to determine the time of year!';

  if (
    !(date instanceof Date) ||
    Object.getOwnPropertyNames(date).length ||
    isNaN(date)
  ) {
    throw new Error('Invalid date!');
  }

  const SEASONS = ['winter', 'spring', 'summer', 'autumn'];

  const month = (date.getMonth() + 1) % 12;

  return SEASONS[Math.floor(month / 3)];
}

module.exports = {
  getSeason,
};
