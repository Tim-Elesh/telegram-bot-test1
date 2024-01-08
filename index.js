const TelegramApi = require('node-telegram-bot-api');
const{gameOptions , againOptions} = require('./options');
const token = "6805604699:AAFK9h8Tza_CtcOsBkKn17a74chc-kIAir4";

const bot = new TelegramApi(token, {polling:true});

const chats = {};

const startGame = async (chatId) =>{
    await bot.sendMessage(chatId , 'Я загадываю одну цифру , угадай ее лохопедус)');
    const randomNumber = Math.floor((Math.random() * 10));
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId , 'Отгадывай' , gameOptions);
}

const start = () =>{
    bot.on('message' , async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        bot.setMyCommands(
            [{command: '/start' , description: 'Wassup'},
            {command: '/info' , description: 'Get the information'},
            {command: '/game' , description: 'Game with numbers'}
        ])
    
        if(text === '/start'){
            await bot.sendSticker(chatId , 'https://chpic.su/_data/stickers/a/amnyamsbor/amnyamsbor_035.webp?v=1704457503')
            return bot.sendMessage(chatId , `Welcome`);
        }
    
        if(text === '/info'){
           return bot.sendMessage(chatId , `Your name is ${msg.from.first_name} ${msg.from.last_name}`);
        }

        if(text === '/game'){
            return startGame(chatId);
        }

        else{
            return bot.sendMessage(chatId , "I don't understand you))");
        }
    })

    bot.on('callback_query' , async msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
            return startGame(chatId);
        }
        if(data === chats[chatId]){
            return bot.sendMessage(chatId , `Ты отгадал !!!!.Это была цифра ${chats[chatId]}` , againOptions);
        }
        else{
            return bot.sendMessage(chatId , `К величайшему сожалению ты не отгадал, это была цифра ${chats[chatId]}` , againOptions);
        }
    })
}

start()