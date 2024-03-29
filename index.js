process.env["NTBA_FIX_350"] = 1;
import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
const TOKEN = process.env.API_KEY; //botfather API key
let flag = true;
async function helper(cid) {
    const inlineKeyboard = {
        inline_keyboard: [[
            {
                text: 'Twitter',
                url: 'https://twitter.com/Lakshyaa_22'
            },
            {
                text: 'Github',
                url: 'https://github.com/Lakshyyaa'
            }
        ]]
    }
    bot.sendPhoto(cid, 'media/DP.png', {
        caption: `'1' to know about crypto\n\n'2' to know about DeFi\n\n'3' to know about CryptoWallets\n\n'4' to know about DAOs\n\n'/help' to get help\n\n'/price' to get price of Eth and Sol tokens`,
        reply_markup: inlineKeyboard
    })
}
const bot = new TelegramBot(TOKEN, { polling: true })
bot.onText(/\/help/, function (msg, match) {
    var cid = msg.chat.id;
    helper(cid);
    bot.sendChatAction(cid, 'typing')
})
async function sol(sol_add, chatId) {
    const x = await fetch('https://solana-gateway.moralis.io/token/mainnet/' + sol_add + '/price', {
        method: 'GET',
        headers: {
            'x-api-key': process.env.SOL_API //sol token api key
        }
    })
    const y = await x.json()
    const z = await y.usdPrice;
    if (z === undefined) {
        bot.sendMessage(chatId, `Invalid address, try using '/price' again`);
        return;
    }
    bot.sendMessage(chatId, `Price is: ${z} USD`);
    flag = true
}

async function eth(eth_add, chatId) {
    const x = await fetch('https://deep-index.moralis.io/api/v2/erc20/' + eth_add + '/price?chain=eth', {
        method: 'GET',
        headers: {
            'x-api-key': process.env.ETH_API // eth token api key
        }
    })
    const y = await x.json()
    const z = await y.usdPrice;
    if (z === undefined) {
        bot.sendMessage(chatId, `Invalid address, try using '/price' again`);
        return;
    }
    bot.sendMessage(chatId, `Price is: ${z} USD`);
    flag = true
}

bot.on('message', (message) => {
    bot.sendChatAction(message.from.id, 'typing')
    const query = message.text;
    console.log(message.text);
    console.log(message.from.first_name);
    if (query === '/start') {
        const inlineKeyboard = {
            inline_keyboard: [[
                {
                    text: 'Twitter',
                    url: 'https://twitter.com/Lakshyaa_22'
                },
                {
                    text: 'Github',
                    url: 'https://github.com/Lakshyyaa'
                }
            ]]
        }
        bot.sendPhoto(message.from.id, 'media/DP.png', {
            caption: `<strong>HEY THERE🚀\n\nMy name is TrackBot, your web3 (de)gen assistant to track real-time prices of your tokens.</strong>\n\n'1' to know about crypto\n\n'2' to know about DeFi\n\n'3' to know about CryptoWallets\n\n'4' to know about DAOs\n\n'/price' to get price of Eth and Sol tokens\n\n'/help' to get help`,
            parse_mode: 'HTML',
            reply_markup: inlineKeyboard
        })
    }
    else if (query == 1) {
        const inlineKeyboard = {
            inline_keyboard: [[{
                text: 'Bitcoin',
                url: 'https://coinmarketcap.com/currencies/bitcoin/'
            }], [{
                text: 'Ethereum',
                url: 'https://coinmarketcap.com/currencies/ethereum/'
            }], [{
                text: 'BNB',
                url: 'https://coinmarketcap.com/currencies/bnb/'
            }],
            [{
                text: 'Solana',
                url: 'https://coinmarketcap.com/currencies/solana/'
            }],
            [{
                text: 'Tether',
                url: 'https://coinmarketcap.com/currencies/tether/'
            }]]
        };
        bot.sendChatAction(message.from.id, 'typing')
        bot.sendMessage(message.from.id, 'Cryptocurrency is any form of currency that exists digitally or virtually and uses cryptography to secure transactions. They use a decentralized system to record transactions and issue new units. Check some of them below👇', { reply_markup: inlineKeyboard });
    }
    else if (query == 2) {
        const inlineKeyboard = {
            inline_keyboard: [[{
                text: 'DeFi for beginners',
                url: 'https://www.investopedia.com/decentralized-finance-defi-5113835#:~:text=Decentralized%20finance%20eliminates%20intermediaries%20by,%2C%20software%2C%20and%20hardware%20advancements.'
            }],
            ]
        };
        bot.sendChatAction(message.from.id, 'typing')
        bot.sendMessage(message.from.id, 'DeFi, short for decentralized finance, refers to a set of financial services and applications that are built on top of blockchain technology. These services are decentralized, meaning they are not controlled by any single entity or organization.', { reply_markup: inlineKeyboard });
    }
    else if (query == 3) {
        const inlineKeyboard = {
            inline_keyboard: [[{
                text: 'Setup MetaMask',
                url: 'https://metamask.io/'
            }],
            ]
        };
        bot.sendChatAction(message.from.id, 'typing')
        bot.sendMessage(message.from.id, 'Crypto wallets keep your private keys – the passwords that give you access to your cryptocurrencies – safe and accessible, allowing you to send and receive cryptocurrencies like Bitcoin and Ethereum.', { reply_markup: inlineKeyboard });
    }
    else if (query == 4) {
        const inlineKeyboard = {
            inline_keyboard: [[{
                text: 'DAO for beginners',
                url: 'https://www.investopedia.com/tech/what-dao/'
            }],
            ]
        };
        bot.sendChatAction(message.from.id, 'typing')
        bot.sendMessage(message.from.id, 'A decentralized autonomous organization (DAO) is an emerging form of legal structure that has no central governing body and whose members share a common goal to act in the best interest of the entity.', { reply_markup: inlineKeyboard });
    }
    else if (query === '/help') {
        console.log('/help handled')
    }
    else if (query === '/price') {
        const inlineKeyboard = {
            inline_keyboard: [[{
                text: 'Ethereum',
                callback_data: 'eth_token'
            }],
            [{
                text: 'Solana',
                callback_data: 'sol_token'
            }]]
        };
        bot.sendMessage(message.from.id, "<strong>Choose the token chain👇</strong>", { parse_mode: 'HTML', reply_markup: inlineKeyboard });
    }
    else {
        if (!flag) {
            return;
        }
        else {
            bot.sendMessage(message.from.id, `<i>Invalid input</i>\nPlease refer to '/help'`, { parse_mode: 'HTML' })
        }
    }
})

bot.on('callback_query', (callbackQuery) => {
    const action = callbackQuery.data;
    const chatId = callbackQuery.message.chat.id;
    if (action === 'sol_token') {
        flag = false;
        bot.sendMessage(chatId, '<strong>Reply to this message with your SPL token address</strong>', { parse_mode: 'HTML' }).then((sended) => {
            const messageId = sended.message_id;
            bot.onReplyToMessage(chatId, messageId, (message) => {
                sol(message.text, chatId)
                bot.sendChatAction(chatId, 'typing');
            });
        });
    }
    else if (action === 'eth_token') {
        flag = false;
        bot.sendMessage(chatId, '<strong>Reply to this message with your contract address</strong>', { parse_mode: 'HTML' }).then((sended) => {
            const messageId = sended.message_id;
            bot.onReplyToMessage(chatId, messageId, (message) => {
                eth(message.text, chatId)
                bot.sendChatAction(chatId, 'typing');
            });
        });
    }
});
// //              T E S T         A D D R E S S E S
// //         '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0';
// //         "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt"
