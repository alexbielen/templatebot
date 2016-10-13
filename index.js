/**
 * Created by alexbielen on 9/14/16.
 */

const Slackbot = require('slackbots');
const preemptiveStrike = require('./libs/preemptiveStrike').preemptiveStrike;
const callAndResponse = require('./libs/callAndResponse');

// Public API
const getBot = function (token, settings) {

    const bot = new Slackbot({
        'token': token,
        'name': settings.botName
    });

    const run = function () {
        bot.on('message', message => {

            callAndResponse(bot, settings, message);
            preemptiveStrike(bot, message, settings);


        });
    };

    return {
        'run': run
    }
};

module.exports = {
    'getBot': getBot
};
