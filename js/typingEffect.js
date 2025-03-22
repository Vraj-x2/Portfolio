// Typing effect
const typingEffect = () => {
    const texts = ['Software Engineer', 'Front end Developer', 'Back end Developer'];
    const typingText = document.getElementById('typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentText = texts[textIndex];
        typingText.textContent = isDeleting 
            ? currentText.substring(0, charIndex - 1)
            : currentText.substring(0, charIndex + 1);

        isDeleting ? charIndex-- : charIndex++;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    };
    type();
};
