document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const socialLinks = document.getElementById('social_links').value.split(',');
    const bio = document.getElementById('bio').value;
    const profilePicture = document.getElementById('profile_picture').files[0];
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const profileHTML = `
            <img src="${e.target.result}" alt="Profile Picture">
            <div>
                <h3>${name}</h3>
                <p>${bio}</p>
                <p>Email: ${email}</p>
                <p>Social Links: ${socialLinks.join(', ')}</p>
            </div>
        `;
        document.getElementById('profile-display').innerHTML = profileHTML;
        document.getElementById('form-section').style.display = 'none';
        document.getElementById('account-section').style.display = 'block';
    };
    reader.readAsDataURL(profilePicture);
});

document.getElementById('export-qr').addEventListener('click', function() {
    const profileData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        socialLinks: document.getElementById('social_links').value.split(','),
        bio: document.getElementById('bio').value
    };
    
    fetch('/generate_qr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('qr-code').innerHTML = `<img src="${data.qr_code}" alt="QR Code">`;
        document.getElementById('download-qr').href = data.qr_code;
        document.getElementById('account-section').style.display = 'none';
        document.getElementById('qr-section').style.display = 'block';
    })
    .catch(error => console.error('Error generating QR code:', error));
});
