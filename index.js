/**
 * Created by alexbielen on 9/14/16.
 */
(function () {

    var Slackbot = require('slackbots');
    var config,
        botUser;

    // utility functions
    var isChatMessage = function (message) {
        return message.type === 'message' && Boolean(message.text);
    };

    var isChannelConvo = function (message) {
        return typeof message.channel === 'string' && message.channel[0] === 'C';
    };

    var isFromBot = function (message, botUser) {
        // check that message is sent from bot user
        return message.user === botUser.id;
    };

    var mentionsTrigger = function (message) {
        // check the message against the trigger words
        return config.triggerWords.some(function (word) {
            return message.text.toLowerCase().indexOf(word) > -1;
        });

    };

    var getChannelById = function (channelId, outerBot) {
        return outerBot.channels.filter(item => item.id === channelId)[0];
    };

    var getRandomResponse = function () {
        return config.responses[Math.floor(Math.random() * config.responses.length)];
    };

    // API
    var getBot = (settings) => new Slackbot(settings);

    var run = function (bot, settings) {
        config = settings;

        // we need to get some info once connected to the channel
        bot.on('start', () => {
            botUser = bot.users.filter(user => user.name === config.botname)[0]
        });

        bot.on('message', message => {
            if (isChatMessage(message) && isChannelConvo(message) && !isFromBot(message, botUser) && mentionsTrigger(message)) {
                var channel = getChannelById(message.channel, bot);
                bot.postMessageToChannel(channel.name, getRandomResponse(), {as_user: true});
            }
        })
    };

    module.exports = {
        'run': run,
        'getBot': getBot
    }
})();
