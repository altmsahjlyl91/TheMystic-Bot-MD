import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'What do you want to create?';
  
  if (typeof m.react === 'function') {
    m.react('🕒'); // استخدم رمز الانتظار أو رسالة انتظار
  } else {
    console.error("m.react is not a function");
  }
  
  let msg = encodeURIComponent(text);
  let res = await fetch(`https://aemt.me/bingimg?text=${msg}`);
  let data = await res.json();
  console.log(data);
  let buffer = data.result;
  conn.sendFile(m.chat, buffer, 'image.png', `${text}`, m);
  
  if (typeof m.react === 'function') {
    m.react('✅'); // استخدم رمز الانتهاء أو رسالة انتهاء
  } else {
    console.error("m.react is not a function");
  }
};

handler.help = ['bingimg <query>'];
handler.tags = ['AI'];
handler.command = /^bingimg|تخيل$/i;

export default handler;
