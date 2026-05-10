async function testConfirm() {
  const res = await fetch('http://localhost:3000/api/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-requested-with': 'ProcureOS-Client'
    },
    body: JSON.stringify({
      endpoint: '/public/rfq/confirm',
      method: 'POST',
      data: { 
        intent_id: 'ecedef34-5414-4852-b80a-0e1bfcf373ea', 
        delivery_address: 'Istanbul, Turkey' 
      }
    })
  });
  
  console.log('Status:', res.status);
  const data = await res.json();
  console.log('Data:', data);
}

testConfirm();
