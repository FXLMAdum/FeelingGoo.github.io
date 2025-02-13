let isFirstImage = true;
document.getElementById("toggle-background").addEventListener("click", function() {
    const icon = document.getElementById("toggle-icon"); // The icon element

    if (isFirstImage) {
        document.body.style.backgroundImage = "url('/ProjectDesige/Photo/download.jpg')"; // เปลี่ยนเป็นภาพที่ 1
        icon.className = "fas fa-sun"; // Change icon to sun for first image
    } else {
        document.body.style.backgroundImage = "url('/ProjectDesige/Photo/Illustration by Uomi.jpg')"; // เปลี่ยนเป็นภาพที่ 2
        icon.className = "fas fa-moon"; // Change icon to moon for second image
    }

    isFirstImage = !isFirstImage;
});


// เก็บเสียงในแต่ละ playlist
const playlists = {
    relaxing: [
        "/ProjectDesige/Audio/a-train-on-the-railways-169416.mp3",
        "/ProjectDesige/Audio/Bird-sound.mp3",
        "/ProjectDesige/Audio/steps-on-dry-leaves-8000.mp3"
    ],
    reading: [
        "/ProjectDesige/Audio/ticking-clock-sound-effect-1-mp3-edition-264451.mp3",
        "/ProjectDesige/Audio/cozy-soft-rain-under-umbrella-116183.mp3",
        "/ProjectDesige/Audio/library-sound.mp3"
    ],
    sleeping: [
        "/ProjectDesige/Audio/sea-waves-169411.mp3",
        "/ProjectDesige/Audio/202502021155.mp4",
        "/ProjectDesige/Audio/Flowing-water-sound.mp3"
    ],
    chilling: [
        "/ProjectDesige/Audio/a-train-on-the-railways-169416.mp3",
        "/ProjectDesige/Audio/wind_44100-27055.mp3",
        "/ProjectDesige/Audio/soft-piano-sound.mp3"
    ],
    productivity: [
        "/ProjectDesige/Audio/Fireplace-sound.mp3",
        "/ProjectDesige/Audio/Flowing-water-sound.mp3",
        "/ProjectDesige/Audio/ticking-clock-sound-effect-1-mp3-edition-264451.mp3"
    ]
};

let audioElements = [];  // เก็บเสียงที่กำลังเล่นทั้งหมด

document.querySelectorAll('.sound-button').forEach(button => {
    let audio = null;  
    button.addEventListener('click', function () {
        // หยุดเสียงที่กำลังเล่นอยู่ก่อนหน้า
        if (audio && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
            button.classList.remove('playing');
            button.classList.remove('loading');
        } else {
            const soundFile = button.getAttribute('data-sound');
            audio = new Audio(soundFile);
            audio.play();
            audio.loop = true;
            button.classList.add('playing');
            button.classList.add('loading');
            audioElements.push(audio);  // เก็บเสียงไว้ใน array
        }
    });
});

// ฟังก์ชันเล่นหลายเสียงพร้อมกันเมื่อเลือกหมวดหมู่
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', function () {
        // หยุดเสียงทั้งหมดก่อน
        audioElements.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        audioElements = []; // รีเซ็ตอาร์เรย์ของเสียง

        // เอาชื่อ playlist จากปุ่มที่คลิก
        const playlistName = button.getAttribute('data-playlist');
        
        // เล่นเสียงในเพลย์ลิสต์ที่เลือก
        if (playlists[playlistName]) {
            playlists[playlistName].forEach(soundFile => {
                let audio = new Audio(soundFile);
                audio.play();
                audio.loop = true;
                audioElements.push(audio); // เก็บเสียงในอาร์เรย์
            });
        }
    });
});

// เมื่อกดปุ่ม "Clear!"
document.getElementById('stop-all-sounds').addEventListener('click', function () {
    // หยุดเสียงทั้งหมดและรีเซ็ตสถานะของปุ่ม
    audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0; // รีเซ็ตเสียงกลับไปเริ่มต้น
    });

    // ลบคลาสจากปุ่มทั้งหมด
    document.querySelectorAll('.sound-button').forEach(button => {
        button.classList.remove('playing');
        button.classList.remove('loading');
    });

    // เคลียร์อาร์เรย์ของเสียงที่กำลังเล่นทั้งหมด
    audioElements = [];
});

// ฟังก์ชันเล่นหลายเสียงพร้อมกันเมื่อเลือกหมวดหมู่
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', function () {
        // หยุดเสียงทั้งหมดก่อน
        audioElements.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        audioElements = []; // รีเซ็ตอาร์เรย์ของเสียง

        // เอาชื่อ playlist จากปุ่มที่คลิก
        const playlistName = button.getAttribute('data-playlist');
        
        // ลบคลาส 'playing' ออกจากทุกปุ่มเสียง
        document.querySelectorAll('.sound-button').forEach(soundButton => {
            soundButton.classList.remove('playing');
        });

        // เล่นเสียงในเพลย์ลิสต์ที่เลือก
        if (playlists[playlistName]) {
            playlists[playlistName].forEach(soundFile => {
                let audio = new Audio(soundFile);
                audio.play();
                audio.loop = true;
                audioElements.push(audio); // เก็บเสียงในอาร์เรย์
                
                // เพิ่มคลาส 'playing' ให้กับปุ่มเสียงที่เกี่ยวข้อง
                const soundButton = document.querySelector(`.sound-button[data-sound="${soundFile}"]`);
                if (soundButton) {
                    soundButton.classList.add('playing');
                }
            });
        }
    });
});
