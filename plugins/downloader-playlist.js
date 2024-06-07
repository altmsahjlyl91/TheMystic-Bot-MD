import yts from  yt-search ;

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) text =  default search term ; // استخدم نصًا افتراضيًا إذا لم يكن هناك إدخال

    try {
        let result = await yts(text);
        let ytres = result.videos;
        let teskd = `𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚 *${text}*`
        
        let listSections = [];
        for (let index in ytres) {
            let v = ytres[index];
            listSections.push({
                title: `𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎`,
                rows: [
                    {
                        title: "𝗔 𝗨 𝗗 𝗜 𝗢",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        rowId: `${usedPrefix}ytmp3 ${v.url}`
                    },
                    {
                        title: "𝗩 𝗜 𝗗 𝗘 𝗢",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        rowId: `${usedPrefix}ytmp4 ${v.url}`
                    }, 
                    {
                        title: "𝗔 𝗨 𝗗 𝗜 𝗢  𝗗 𝗢 𝗖",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        rowId: `${usedPrefix}play3 ${v.url}`
                    }, 
                    {
                        title: "𝗩 𝗜 𝗗 𝗘 𝗢  𝗗 𝗢 𝗖",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        rowId: `${usedPrefix}play4 ${v.url}`
                    }
                ]
            });
        }
        await conn.sendList(m.chat, `*𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎*\n`, `𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚: ${text}`, `𝗕 𝗨 𝗦 𝗖 𝗔 𝗥`, listSections, m);
    } catch (e) {
        await conn.sendButton(m.chat, `\n${wm}`, `${lenguajeGB.smsMalError3()} #report ${usedPrefix}${command}`, null, [[`${lenguajeGB.smsMensError1()}`, `#reporte ${lenguajeGB.smsMensError2()} ${usedPrefix}${command}`]], null, m);
        console.log(e);
    }
}

handler.help = [ playlist ];
handler.tags = [ dl ];
handler.command = /^playlist|ytbuscar|yts(earch)?$/i;
handler.limit = 0;
handler.level = 0;

export default handler;
