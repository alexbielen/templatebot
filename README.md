# templatebot
A Slackbot Template. 

Simply add botname, trigger words and responses to the config file. 

```javascript
// config.js
var settings = {
    triggerWords: ['add', 'trigger', 'words or phrases', 'here'],
    responses: ['add', 'responses', 'or phrases', 'here']
};
```

and then add the bot token as an environment variable named `SLACKBOT_TOKEN`. 
