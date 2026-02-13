// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// 1. СПИСОК КАРТИНОК, КОТОРЫЕ БУДУТ ПОЯВЛЯТЬСЯ
// Замени названия файлов на свои реальные картинки в папке img
const sadImages = [
    "img/1.gif", 
    "img/2.gif", 
    "img/3.gif", 
    "img/4.gif",
    "img/5.gif",
    "img/6.gif",
    "img/7.gif",
    "img/8.gif",
    "img/9.gif"
];

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// Logic to move the NO btn
noBtn.addEventListener("mouseover", () => {
    // Движение кнопки (твой старый код)
    const min = 100; // Немного уменьшил радиус, чтобы кнопка не улетала слишком далеко
    const max = 300;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // 2. ВЫЗЫВАЕМ ФУНКЦИЮ ПОКАЗА КАРТИНКИ
    spawnRandomImage();
});

// Функция для создания случайной картинки
function spawnRandomImage() {
    // Если картинок нет в массиве, ничего не делаем
    if (sadImages.length === 0) return;

    // Создаем элемент img
    const img = document.createElement("img"); 
    
    // Выбираем случайную картинку из массива
    const randomIndex = Math.floor(Math.random() * sadImages.length);
    img.src = sadImages[randomIndex];
    
    // Добавляем класс для стилей
    img.classList.add("floating-img");

    // Задаем случайные координаты на экране
    // window.innerWidth - ширина экрана, window.innerHeight - высота
    const x = Math.random() * (window.innerWidth - 150); // -150 чтобы не вылезало за край
    const y = Math.random() * (window.innerHeight - 150);

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    
    // Случайный поворот для естественности
    const rotate = (Math.random() * 40) - 20; // от -20 до +20 градусов
    img.style.transform = `rotate(${rotate}deg)`;

    // Добавляем картинку в body
    document.body.appendChild(img);
}

// YES is clicked
yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "img/cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";

    const floatingImages = document.querySelectorAll(".floating-img");
    floatingImages.forEach(img => img.remove());
});