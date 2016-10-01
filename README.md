# templatebot

[![npm version](https://badge.fury.io/js/templatebot.svg)](https://badge.fury.io/js/templatebot)

Make simple SlackBots with an even simpler settings object!

```javascript
import { makeBot } from 'templatebot';

var settings = {
    botName: 'newbot',
    triggerWords: ['these', 'words', 'or', 'phrases', 'will trigger responses'],
    responses: ['add', 'responses', 'or phrases', 'here']
};

var bot = makeBot(process.env.SLACKBOT_TOKEN, settings);
bot.run();
```
