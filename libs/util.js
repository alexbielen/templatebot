/**
 * Collection of utility functions
 */

const getChannelById = (channelId, outerBot) =>
    outerBot.channels.filter(item => item.id === channelId)[0];

const getRandomResponse = responses =>
    responses[Math.floor(Math.random() * responses.length)];

module.exports = {
    'getChannelById': getChannelById,
    'getRandomResponse': getRandomResponse
};

