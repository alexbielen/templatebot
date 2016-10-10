# templatebot

[![npm version](https://badge.fury.io/js/templatebot.svg)](https://badge.fury.io/js/templatebot)
[![dependency badge](https://david-dm.org/alexbielen/templatebot.svg)](https://david-dm.org/alexbielen/templatebot)

Make simple and fun SlackBots with an even simpler settings object!

```javascript
import { getBot } from 'templatebot';

var settings = {
    botName: 'newbot',
    triggerWords: ['these', 'words', 'or', 'phrases', 'will trigger responses'],
    responses: ['add', 'responses', 'or phrases', 'here'],
    preemptiveStrike: {
        'someuser': ['these', 'responses will be chosen', 'as soon as this user', 'starts typing']
    }
};

var bot = getBot(process.env.SLACKBOT_TOKEN, settings);
bot.run();
```
### Call and Response
Add words to the `triggerWords` array in the settings object and a random response from `responses` array
will be posted to the channel that the triggering message orginated from. 

### Pre-emptive Strike
Use the `preemptiveStrike` field to post a message as soon as a user starts typing. If a user is in the 
`preemptiveStrike` object the bot will pick a random response from the array keyed by the username. 

