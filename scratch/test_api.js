
async function test() {
    const url = 'http://165.245.252.75:4000/api/public/health';
    console.log(`Fetching ${url}...`);
    try {
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        const data = await res.text();
        console.log(`Response: ${data}`);
    } catch (e) {
        console.error(`Error: ${e.message}`);
    }
}
test();
