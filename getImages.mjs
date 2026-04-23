async function findImage(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const text = await res.text();
    const match = text.match(/<img[^>]+src=[\"']([^\"']+\.jpe?g)[\"']/i);
    return match ? (match[1].startsWith('http') ? match[1] : url.replace(/\/$/, '') + '/' + match[1].replace(/^\//, '')) : 'Not found';
  } catch(e) {
    return 'Error: ' + e.message;
  }
}

findImage('https://www.kaikado-cafe.jp/').then(console.log);
