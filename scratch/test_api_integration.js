
const PROXY_URL = 'http://localhost:3000/api/proxy';

async function testEndpoint(endpoint, method = 'GET', data = null) {
  console.log(`\n--- Testing: ${method} ${endpoint} ---`);
  try {
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-requested-with': 'ProcureOS-Client'
      },
      body: JSON.stringify({
        endpoint,
        method,
        data: data || {}
      })
    });

    const resData = await response.json();
    console.log(`Status: ${response.status}`);
    if (response.ok) {
      console.log('✅ Success');
      // Log a snippet of the data
      if (Array.isArray(resData.results)) {
        console.log(`Items found: ${resData.results.length}`);
      } else if (resData.message) {
        console.log(`Message: ${resData.message}`);
      } else {
        console.log('Data received:', JSON.stringify(resData).substring(0, 100) + '...');
      }
    } else {
      console.log('❌ Failed');
      console.log('Error:', resData.message || resData.error);
    }
  } catch (err) {
    console.log('🔥 Proxy connection error:', err.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API Proxy Integration Tests...');
  
  // 1. Health Check
  await testEndpoint('/public/health');

  // 2. Search Check
  await testEndpoint('/public/search?q=test');

  // 3. Reviews Check
  await testEndpoint('/public/search/reviews');

  // 4. Forbidden Test (Security check)
  await testEndpoint('/admin/config');

  console.log('\n🏁 Tests completed.');
}

runTests();
