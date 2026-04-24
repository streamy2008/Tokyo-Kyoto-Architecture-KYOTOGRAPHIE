import https from 'https';
const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
};
https.get('https://casabrutus.com/categories/food/106208', options, (res) => {
  let data = '';
  res.on('data', (d) => data += d);
  res.on('end', () => {
    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    const descMatch = data.match(/<meta property="og:description" content="(.*?)"/);
    console.log('Title:', titleMatch ? titleMatch[1] : null);
    console.log('Desc:', descMatch ? descMatch[1] : null);
    const urls = data.match(/https:\/\/[^\"']+\.(jpg|jpeg|png)/g);
    if(urls) {
      console.log('Images:', Array.from(new Set(urls)).filter(u => u.includes('uploads')).slice(0, 5).join('\n'));
    }
  });
});
