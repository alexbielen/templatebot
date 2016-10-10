# templatebot

[![npm version](https://badge.fury.io/js/templatebot.svg)](https://badge.fury.io/js/templatebot)
[![dependency badge](https://david-dm.org/alexbielen/templatebot.svg)](https://david-dm.org/alexbielen/templatebot)

Make simple SlackBots with an even simpler settings object!

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
