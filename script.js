const canvasFireworks = document.getElementById('fireworks');
const ctxFireworks = canvasFireworks.getContext('2d');
canvasFireworks.width = window.innerWidth;
canvasFireworks.height = window.innerHeight;

const canvasPetals = document.getElementById('petals');
const ctxPetals = canvasPetals.getContext('2d');
canvasPetals.width = window.innerWidth;
canvasPetals.height = window.innerHeight;

const fireworks = [];
const petals = [];

function createFirework(x, y) {
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: x,
            y: y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 6 + 2,
            radius: Math.random() * 3 + 1,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.02
        });
    }
    fireworks.push(particles);
}

function drawFireworks() {
    ctxFireworks.clearRect(0, 0, canvasFireworks.width, canvasFireworks.height);
    fireworks.forEach((particles, i) => {
        particles.forEach((p, j) => {
            p.x += p.speed * Math.cos(p.angle);
            p.y += p.speed * Math.sin(p.angle);
            p.alpha -= p.decay;
            if (p.alpha <= 0) {
                particles.splice(j, 1);
            }
            ctxFireworks.beginPath();
            ctxFireworks.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctxFireworks.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctxFireworks.fill();
        });
        if (particles.length === 0) {
            fireworks.splice(i, 1);
        }
    });
}

function createPetal() {
    return {
        x: Math.random() * canvasPetals.width,
        y: -50,
        size: Math.random() * 10 + 10,
        speed: Math.random() * 2 + 1,
        angle: Math.random() * 2 * Math.PI,
        rotationSpeed: Math.random() * 0.05 + 0.02
    };
}

function drawPetals() {
    ctxPetals.clearRect(0, 0, canvasPetals.width, canvasPetals.height);
    petals.forEach((p, i) => {
        p.y += p.speed;
        p.angle += p.rotationSpeed;
        if (p.y > canvasPetals.height) {
            petals.splice(i, 1);
            petals.push(createPetal());
        }
        ctxPetals.save();
        ctxPetals.translate(p.x, p.y);
        ctxPetals.rotate(p.angle);
        ctxPetals.beginPath();
        ctxPetals.arc(0, 0, p.size, 0, Math.PI * 2);
        ctxPetals.fillStyle = "rgba(255, 192, 203, 0.8)";
        ctxPetals.fill();
        ctxPetals.restore();
    });
}

function launchFirework() {
    createFirework(Math.random() * canvasFireworks.width, Math.random() * canvasFireworks.height);
    setTimeout(launchFirework, Math.random() * 1000 + 500);
}

launchFirework();

for (let i = 0; i < 50; i++) {
    petals.push(createPetal());
}

function loop() {
    drawFireworks();
    drawPetals();
    requestAnimationFrame(loop);
}
loop();

window.addEventListener('resize', () => {
    canvasFireworks.width = window.innerWidth;
    canvasFireworks.height = window.innerHeight;
    canvasPetals.width = window.innerWidth;
    canvasPetals.height = window.innerHeight;
});

const message = "Chúc Insert Name... 20/10 vui vẻ!";
const animatedMessage = document.getElementById("animatedMessage");
let index = 0;
let isDeleting = false;
const typingSpeed = 150;
const deleteSpeed = 100;
const pauseDuration = 1500;

function typeEffect() {
    if (!isDeleting && index <= message.length) {
        animatedMessage.innerHTML = message.slice(0, index);
        index++;
    } else if (isDeleting && index > 0) {
        animatedMessage.innerHTML = message.slice(0, index);
        index--;
    }

    if (index === message.length && !isDeleting) {
        setTimeout(() => {
            isDeleting = true;
        }, pauseDuration);
    }

    else if (index === 0 && isDeleting) {
        isDeleting = false;
    }

    const speed = isDeleting ? deleteSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
}

typeEffect();
