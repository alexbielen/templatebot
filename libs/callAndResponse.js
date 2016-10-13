/**
 * Contains functions for implementing Call and Response messages
 *
 *
 */
const util = require("../libs/util");

const _isChatMessage = message => message.type === 'message' && Boolean(message.text);

const _isChannelConvo = message => typeof message.channel === 'string' && message.channel[0] === 'C';

const _isFromBot = (message, botUser) => message.user === botUser.id;

const _mentionsTrigger = (message, settings) =>
    settings.triggerWords.some((word) =>
        message.text.toLowerCase().indexOf(word) > -1
    );

const callAndResponse = function (bot, settings, message) {
    // Call and Response
    if (_isChatMessage(message) && _isChannelConvo(message) && !_isFromBot(message, botUser) && _mentionsTrigger(message, settings)) {
        bot.postMessageToChannel(channel.name, util.getRandomResponse(settings.responses), {as_user: true}, x => x);
    }
};



