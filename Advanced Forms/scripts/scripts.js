const myInfo = new URLSearchParams(window.location.search);

const results = document.querySelector("#results");

results.innerHTML = `
<p>Appointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>

<p>Ordinance Selected: ${myInfo.get('ordinance')}</p>

<p>Your Phone: ${myInfo.get('phone')}</p>

<p>Your Email: ${myInfo.get('email')}</p>

<p>Date Selected: ${myInfo.get('date')}</p>

<p>Temple Location: ${myInfo.get('location')}</p>
`;