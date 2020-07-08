const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
var randomize = require('randomatic')
var random = require('random-name')
const { URLSearchParams } = require('url');
const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs-extra');
const delay = require('delay');
const { read } = require('fs');

const functionRegist = (username, email, reff) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('action', 'boombox_ajax_register');
    params.append('username', username);
    params.append('useremail', email);
    params.append('password', 'Berak321#')
    params.append('security', 'd49ab7d617')
    params.append('redirect', 'https%3A%2F%2Fstellarf.com')
    params.append('captcha', 'KA9EU')

       fetch('https://stellarf.com/wp-admin/admin-ajax.php', {
        method: 'POST', 
        body: params,
        headers: {
            'Host': 'stellarf.com',
            'Connection': 'keep-alive',
            'Content-Length': 176,
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://stellarf.com',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://stellarf.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': `__cfduid=d5453570cf82b39bb4ccb80f0b82f80a61594176354; PHPSESSID=r6rantko9k24a88sgm733oaikk; mycred_refmycred_default=${reff}; signup_refmycred_default=${reff}; bp-activity-oldestpage=1`
           }
       })
       .then(res => res.json())
       .then(result => {
           resolve(result);
       })
       .catch(err => reject(err))
   });

const functionGetLink = (nickname) =>
   new Promise((resolve, reject) => {
       fetch(`https://generator.email/`, {
           method: "get",
           headers: {
               'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
               'accept-encoding': 'gzip, deflate, br',
               'accept-language': 'en-US,en;q=0.9',
               'cookie': `_ga=GA1.2.1434039633.1579610017; _gid=GA1.2.374838364.1579610017; _gat=1; surl=mouselesstails.com%2F${nickname}`,
               'sec-fetch-mode': 'navigate',
               'sec-fetch-site': 'same-origin',
               'upgrade-insecure-requests': 1,
               'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'
           }
       })
       .then(res => res.text())
           .then(text => {
               const $ = cheerio.load(text);
               const src = $("table p a").attr('href')
               resolve(src);
           })
           .catch(err => reject(err));
   });

const functionVerif = (key) => new Promise((resolve, reject) => {
       fetch(`https://stellarf.com/activate/${key}/?key=${key}&submit=Activate`, {
        method: 'GET'
       })
       .then(res => res.text())
       .then(result => {
           resolve(result);
       })
       .catch(err => reject(err))
   });

(async () => {
    const reff = readlineSync.question('[?] Reff: ')
    const jumlah = readlineSync.question('[?] Jumlah reff: ')
    for (var i = 0; i < jumlah; i++){
    try {
        const name = random.first()
        const rand = randomize('0', 5)
        const username = `${name}${rand}`
        const email = `${name}${rand}@mouselesstails.com`
        const regist = await functionRegist(username, email, reff)
        console.log(`[+] ${regist.data.message}`)
        await delay(5000)
        const link = await functionGetLink(`${name}${rand}`)
        console.log(`[+] Link verif: ${link}`)
        const key = link.split('/')[4]
        const verif = await functionVerif(key)
        console.log('[+] Sukses verif !\n')
    } catch (e) {
        console.log(e)
    }
}
})()