async function testProxy() {
  const res = await fetch('http://localhost:3000/api/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-requested-with': 'ProcureOS-Client'
    },
    body: JSON.stringify({
      endpoint: '/public/rfq/intent',
      method: 'POST',
      data: { title: 'Test Request' }
    })
  });
  
  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Data:', data);
}

testProxy();
