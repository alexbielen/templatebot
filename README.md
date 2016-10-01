# templatebot
Make simple SlackBots with an even simpler settings object!

```javascript
import { startBot } from 'templatebot';

var settings = {
    botName: 'newbot',
    triggerWords: ['these', 'words', 'or', 'phrases', 'will trigger responses'],
    responses: ['add', 'responses', 'or phrases', 'here']
};

var bot = startBot(process.env.SLACKBOT_TOKEN, settings);
bot.run();
```
