it('can be constructed', () => {
    var bot = require('../src/Bot');
    var builder = require('botbuilder');
    
    new bot.Bot(new builder.ChatConnector(), {}));
})