document.addEventListener('DOMContentLoaded', () => {

    // --- ПЕРЕМЕННЫЕ ---
    const envelope = document.getElementById("envelope-container");
    const letter = document.getElementById("letter-container");
    const noBtn = document.querySelector(".no-btn");
    const yesBtn = document.querySelector(".btn[alt='Yes']");

    const title = document.getElementById("letter-title");
    const catImg = document.getElementById("letter-cat");
    const buttons = document.getElementById("letter-buttons");
    const finalText = document.getElementById("final-text");

    // Элементы стартового экрана
    const startBtn = document.getElementById("start-btn");
    const introScreen = document.getElementById("intro-screen");
    const music = document.getElementById("bg-music");

    // Элементы плана
    const planBtn = document.getElementById("plan-btn");
    const planScreen = document.getElementById("plan-screen");
    const closePlan = document.querySelector(".close-plan");

    // Грустные картинки
    const sadImages = [
        "img/1.gif", "img/2.gif", "img/3.gif", 
        "img/4.gif", "img/5.gif", "img/6.gif", 
        "img/7.gif", "img/8.gif", "img/9.gif"
    ];
    let currentImageIndex = 0;

    // --- 1. ЛОГИКА СТАРТОВОГО ЭКРАНА И МУЗЫКИ ---
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            // Запуск музыки
            music.volume = 0.5;
            music.play().catch(error => {
                console.log("Ошибка аудио:", error);
            });

            // Скрытие черного экрана
            introScreen.classList.add("hidden");
        });
    }

    // --- 2. СЕРДЕЧКИ ЗА КУРСОРОМ ---
    let lastHeartTime = 0;

    document.addEventListener("mousemove", (e) => {
        const currentTime = Date.now();
        // Лимит создания сердечек (раз в 40мс)
        if (currentTime - lastHeartTime > 40) {
            createHeart(e.pageX, e.pageY);
            lastHeartTime = currentTime;
        }
    });

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('cursor-heart');
        heart.innerText = '❤'; 
        
        const randomX = (Math.random() - 0.5) * 15;
        heart.style.left = (x + randomX) + 'px';
        heart.style.top = y + 'px';
        
        const size = Math.random() * 10 + 15; 
        heart.style.fontSize = size + 'px';
        heart.style.color = '#ff0000'; 

        document.body.appendChild(heart);
        
        // Удаляем через 1 секунду
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }

    // --- 3. ЛОГИКА КОНВЕРТА ---
    if (envelope) {
        envelope.addEventListener("click", () => {
            envelope.style.display = "none";
            letter.style.display = "flex";
            
            setTimeout(() => {
                const letterWindow = document.querySelector(".letter-window");
                if(letterWindow) letterWindow.classList.add("open");
            }, 50);
        });
    }

    // --- 4. КНОПКА "NO" (СТАРАЯ ВЕРСИЯ) ---
    if (noBtn) {
        noBtn.addEventListener("mouseover", () => {
            const min = 100; 
            const max = 300;

            const distance = Math.random() * (max - min) + min;
            const angle = Math.random() * Math.PI * 2;

            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;

            noBtn.style.transition = "transform 0.3s ease";
            noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

            spawnNextImage();
        });
    }

    function spawnNextImage() {
        if (sadImages.length === 0 || currentImageIndex >= sadImages.length) return;

        const img = document.createElement("img"); 
        img.src = sadImages[currentImageIndex];
        currentImageIndex++;
        
        img.classList.add("floating-img"); 

        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 150);

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        
        const rotate = (Math.random() * 40) - 20; 
        img.style.transform = `rotate(${rotate}deg)`;

        document.body.appendChild(img);
    }

    // --- 5. КНОПКА "YES" ---
    if (yesBtn) {
        yesBtn.addEventListener("click", () => {
            // Меняем заголовок и картинку
            title.textContent = "Youpi !!!"; 
            catImg.src = "img/cat_dance.gif";
            
            // Финальные стили окна
            const letterWindow = document.querySelector(".letter-window");
            if(letterWindow) letterWindow.classList.add("final");
            
            // Скрываем кнопки Yes/No и показываем текст
            buttons.style.display = "none";
            finalText.style.display = "block";

            // Удаляем грустные картинки
            const floatingImages = document.querySelectorAll(".floating-img");
            floatingImages.forEach(img => img.remove());

            // !!! ПОКАЗЫВАЕМ КНОПКУ ПЛАНА !!!
            if (planBtn) {
                planBtn.classList.remove("hidden");
            }
        }); 
    }

    // --- 6. ЛОГИКА ОКНА С ПЛАНОМ ---
    if (planBtn) {
        planBtn.addEventListener("click", () => {
            planScreen.classList.add("show");
        });
    }

    if (closePlan) {
        closePlan.addEventListener("click", () => {
            planScreen.classList.remove("show");
        });
    }
    
    // Закрытие по клику вне карточки
    if (planScreen) {
        planScreen.addEventListener("click", (e) => {
            if (e.target === planScreen) {
                planScreen.classList.remove("show");
            }
        });
    }
});