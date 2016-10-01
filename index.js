/**
 * Created by alexbielen on 9/14/16.
 */
(function () {

    var Slackbot = require('slackbots');

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

    var mentionsTrigger = function (message, settings) {
        // check the message against the trigger words
        return settings.triggerWords.some(function (word) {
            return message.text.toLowerCase().indexOf(word) > -1;
        });
    };

    var getChannelById = function (channelId, outerBot) {
        return outerBot.channels.filter(item => item.id === channelId)[0];
    };

    var getRandomResponse = function (settings) {
        return settings.responses[Math.floor(Math.random() * settings.responses.length)];
    };

    // API
    var startBot = function (token, settings) {
        const bot = new Slackbot({
            'token': token,
            'name': settings.botName
        });
        const botUser = bot.on('start', () =>
            bot.users.filter(user => user.name === settings.botName)[0]
        );

        var run = function () {
            bot.on('message', message => {
                if (isChatMessage(message) && isChannelConvo(message) && !isFromBot(message, botUser) && mentionsTrigger(message, settings)) {
                    var channel = getChannelById(message.channel, bot);
                    bot.postMessageToChannel(channel.name, getRandomResponse(settings), {as_user: true});
                }
            })
        };

        return {
            'run': run
        }
    };

    module.exports = {
        'startBot': startBot
    }
})();
