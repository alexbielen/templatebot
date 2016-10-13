/**
 * Contains functions for implementing pre-emptive strike messages
 *
 * Pre-emptive Strike messages are messages where the bot sends a message to a channel
 * if two conditions are met:
 *
 * 1) A user_typing message is sent
 * 2) A user's name is in the pre-emptive strike settings
 */

const util = require('../libs/util');

// Preemptive Strike Functions
const _isSomeoneTyping = message => message.type === 'user_typing';

const _getUserById = (bot, userId) => bot.users.filter(user => user.id === userId)[0];

const _isUserInPreemptives = (user, preemptives) => preemptives.indexOf(user.name) > -1;

const preemptiveStrike = function (bot, message, settings) {
    // Get some useful data
    const user = _getUserById(bot, message.user);
    const preemptiveStrikeUsers = Object.keys(settings.preemptiveStrike);

    if (_isSomeoneTyping(message) && _isUserInPreemptives(user, preemptiveStrikeUsers)) {
        var channel = util.getChannelById(message.channel, bot);
        bot.postMessageToChannel(channel.name, util.getRandomResponse(settings.preemptiveStrike[user.name]), {as_user: true}, x => x)
    }
};

module.exports = {
    'preemptiveStrike': preemptiveStrike
};

