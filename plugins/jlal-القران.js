import fetch from 'node-fetch'

const BASE_URL = 'http://api.alquran.cloud/v1'

let quranChapterHandler = async (m, { conn }) => {
  try {
    let chapterInput = m.text.split(' ').slice(1).join('').trim()

    if (!chapterInput) {
      throw new Error('الرجاء تحديد رقم السورة. مثال: .القرآن البقرة')
    }

    let chapterRes = await fetch(`${BASE_URL}/surah/${chapterInput}/ar.alafasy`)

    if (!chapterRes.ok) {
      throw new Error('لا يمكن العثور على المعلومات المطلوبة.')
    }

    let chapterData = await chapterRes.json()

    let chapterName = chapterData.data.name
    let versesCount = chapterData.data.numberOfAyahs
    let verses = chapterData.data.ayahs.map(ayah => ayah.text)

    let chapterContent = `
📖 *القرآن الكريم*
📜 *سورة ${chapterName}*
🔢 عدد الآيات: ${versesCount}
🔮 *محتوى السورة:*\n
${verses.join('\n')}
`
    m.reply(chapterContent)
  } catch (error) {
    console.error(error)
    m.reply(`خطأ: ${error.message}`)
  }
}

quranChapterHandler.help = ['القرآن [رقم_السورة]']
quranChapterHandler.tags = ['دين']
quranChapterHandler.command = ['القران']

export default quranChapterHandler
