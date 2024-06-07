import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) text = 'بحث افتراضي'; // استخدم نصًا افتراضيًا إذا لم يكن هناك إدخال

    try {
        let result = await yts(text);
        let ytres = result.videos;
        let teskd = `بحث عن *${text}*`
        
        let listSections = [];
        for (let index in ytres) {
            let v = ytres[index];
            listSections.push({
                title: `النتائج`,
                rows: [
                    {
                        title: "الصوت",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        rowId: `${usedPrefix}ytmp3 ${v.url}`
                    },
                    {
                        title: "الفيديو",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        rowId: `${usedPrefix}ytmp4 ${v.url}`
                    }, 
                    {
                        title: "الصوت في الدونمة",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        rowId: `${usedPrefix}play3 ${v.url}`
                    }, 
                    {
                        title: "الفيديو في الدونمة",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        rowId: `${usedPrefix}play4 ${v.url}`
                    }
                ]
            });
        }
        await conn.sendList(m.chat, `*النتائج*\n`, `بحث عن: ${text}`, `بواسطة`, listSections, m);
    } catch (e) {
        await conn.sendButton(m.chat, `\n${wm}`, `حدث خطأ، #report ${usedPrefix}${command}`, null, [[`تبليغ`, `#reporte ${usedPrefix}${command}`]], null, m);
        console.log(e);
    }
}

handler.help = ['playlist'];
handler.tags = ['تنزيل'];
handler.command = /^playlist|يوتيوب|yts(earch)?$/i;
handler.limit = 0;
handler.level = 0;

export default handler;
