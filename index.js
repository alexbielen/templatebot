/**
 * Created by alexbielen on 9/14/16.
 */

var Slackbot = require('slackbots');

// Call and Response functions
const isChatMessage = message =>
    message.type === 'message' && Boolean(message.text);

const isChannelConvo = message =>
    typeof message.channel === 'string' && message.channel[0] === 'C';

const isFromBot = (message, botUser) =>
    message.user === botUser.id;

const mentionsTrigger = (message, settings) =>
    settings.triggerWords.some((word) =>
        message.text.toLowerCase().indexOf(word) > -1
    );

const getChannelById = (channelId, outerBot) =>
    outerBot.channels.filter(item => item.id === channelId)[0];

const getRandomResponse = responses =>
    responses[Math.floor(Math.random() * responses.length)];


// Preemptive Strike Functions

const isSomeoneTyping = message =>
    message.type === 'user_typing';

const getUserById = (bot, userId) =>
    bot.users.filter(user => user.id === userId)[0];


const isUserInPreemptives = (bot, message, preemptives) => {
    const user = getUserById(bot, message.user);
    return user.name in preemptives;
};

// API
const getBot = function (token, settings) {

    const bot = new Slackbot({
        'token': token,
        'name': settings.botName
    });

    const botUser = bot.on('start', () =>
        bot.users.filter(user => user.name === settings.botName)[0]
    );

    const preemptiveStrikeUsers = Object.keys(settings.preemptiveStrike);

    const run = function () {
        bot.on('message', message => {
            console.log(message);

            // Call and Response
            if (isChatMessage(message) && isChannelConvo(message) && !isFromBot(message, botUser) && mentionsTrigger(message, settings)) {
                var channel = getChannelById(message.channel, bot);
                bot.postMessageToChannel(channel.name, getRandomResponse(settings.responses), {as_user: true});
            }

            // Preemptive Strike
            if (isSomeoneTyping(message) && isUserInPreemptives(bot, message, preemptiveStrikeUsers)) {
                var channel = getChannelById(message.channel, bot);
                bot.postMessageToChannel(channel.name, getRandomResponse(settings), {as_user: true})
            }





        })
    };

    return {
        'run': run
    }
};

module.exports = {
    'getBot': getBot
};
