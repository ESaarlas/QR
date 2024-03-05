document.addEventListener('DOMContentLoaded', function() {
    // Example functionality: Update profile preview dynamically
    const aboutMeInput = document.getElementById('about-me-input');
    const aboutMePreview = document.getElementById('about-me-preview');

    if (aboutMeInput) {
        aboutMeInput.addEventListener('keyup', function() {
            aboutMePreview.textContent = aboutMeInput.value;
        });
    }
});
