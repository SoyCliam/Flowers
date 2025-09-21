// // Sincronizar las letras con la canción
// var audio = document.querySelector("audio");
// var lyrics = document.querySelector("#lyrics");

// // Array de objetos que contiene cada línea y su tiempo de aparición en segundos
// var lyricsData = [
//   { text: "At the time", time: 15 },
//   { text: "The whisper of birds", time: 18 },
//   { text: "Lonely before the sun cried", time: 27 },
//   { text: "Fell from the sky", time: 32 },
//   { text: "Like water drops", time: 33 },
//   { text: "Where I'm now? I don't know why", time: 41 },
//   { text: "Nice butterflies in my hands", time: 47 },
//   { text: "Too much light for twilight", time: 54 },
//   { text: "In the mood for the flowers love", time: 59 },
//   { text: "That vision", time: 67 },
//   { text: "Really strong, blew my mind", time: 72 },
//   { text: "Silence Let me see what it was", time: 78 },
//   { text: "I only want to live in clouds", time: 83 },
//   { text: "Where I'm now? I don't know why", time: 91 },
//   { text: "Nice butterflies in my hands", time: 97 },
//   { text: "Too much light for twilight", time: 104 },
//   { text: "In the mood for the flowers love", time: 108 },
//   { text: "At the time", time: 144 },
//   { text: "The whisper of birds", time: 148 },
//   { text: "Lonely before the sun cried", time: 153 },
//   { text: "Fell from the sky", time: 158 },
//   { text: "Like water drops", time: 164 },
//   { text: "Where I'm now? I don't know why", time: 169 },
//   { text: "Nice butterflies in my hands", time: 176 },
//   { text: "Too much light for twilight", time: 183 },
//   { text: "In the mood for the flowers", time: 188 },
//   { text: "Love.", time: 140 },
// ];

// // Animar las letras
// function updateLyrics() {
//   var time = Math.floor(audio.currentTime);
//   var currentLine = lyricsData.find(
//     (line) => time >= line.time && time < line.time + 6
//   );

//   if (currentLine) {
//     // Calcula la opacidad basada en el tiempo en la línea actual
//     var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
//     var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

//     // Aplica el efecto de aparición
//     lyrics.style.opacity = opacity;
//     lyrics.innerHTML = currentLine.text;
//   } else {
//     // Restablece la opacidad y el contenido si no hay una línea actual
//     lyrics.style.opacity = 0;
//     lyrics.innerHTML = "";
//   }
// }

// setInterval(updateLyrics, 1000);

// //funcion titulo
// // Función para ocultar el título después de 216 segundos
// function ocultarTitulo() {
//   var titulo = document.querySelector(".titulo");
//   titulo.style.animation =
//     "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
//   setTimeout(function () {
//     titulo.style.display = "none";
//   }, 3000); // Espera 3 segundos antes de ocultar completamente
// }

// // Llama a la función después de 216 segundos (216,000 milisegundos)
// setTimeout(ocultarTitulo, 216000);

document.addEventListener('DOMContentLoaded', () => {
            const heart = document.getElementById('heart');
            const heartContainer = document.getElementById('heartContainer');
            const messageContainer = document.getElementById('messageContainer');
            const letters = [
                document.getElementById('letter1'),
                document.getElementById('letter2'),
                document.getElementById('letter3'),
                document.getElementById('letter4')
            ];
            
            let currentLetterIndex = -1;
            let messagesActive = false;
            let isTransitioning = false;
            const colors = [
                'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
                'linear-gradient(135deg, #ff5252, #ff7676)',
                'linear-gradient(135deg, #ff3838, #ff5e5e)',
                'linear-gradient(135deg, #ff2626, #ff4d4d)',
                'linear-gradient(135deg, #ff1493, #ff69b4)'
            ];
            
            // Obtener posición central exacta
            function getCenterPosition() {
                const containerRect = heartContainer.getBoundingClientRect();
                return {
                    x: containerRect.left + containerRect.width / 2,
                    y: containerRect.top + containerRect.height / 2
                };
            }
            
            function createHeartParticles() {
                const particleCount = 40;
                const center = getCenterPosition();
                
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('heart-particle');
                    
                    const size = 8 + Math.random() * 15;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    
                    particle.style.left = `${center.x - size/2}px`;
                    particle.style.top = `${center.y - size/2}px`;
                     
                    document.body.appendChild(particle);
                    
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 50 + Math.random() * 150;
                    const duration = 1 + Math.random() * 0.5;
                    const delay = Math.random() * 0.3;
                    
                    gsap.to(particle, {
                        x: `+=${Math.cos(angle) * distance}`,
                        y: `+=${Math.sin(angle) * distance}`,
                        opacity: 1,
                        scale: Math.random() * 1.5 + 0.5,
                        rotation: 45 + (Math.random() * 90 - 45), 
                        duration: duration,
                        ease: 'power2.out',
                        delay: delay
                    });
                    
                    gsap.to(particle, {
                        y: `+=${10 - Math.random() * 20}`,
                        duration: 0.5,
                        repeat: 1,
                        yoyo: true,
                        delay: delay + duration * 0.5
                    });
                    
                    gsap.to(particle, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.5,
                        delay: delay + duration + 0.5,
                        onComplete: () => {
                            particle.remove();
                        }
                    });
                }
                
                createRosePetals();
            }
            
            function createRosePetals() {
                const petalCount = 15;
                const center = getCenterPosition();
                
                for (let i = 0; i < petalCount; i++) {
                    const petal = document.createElement('div');
                    petal.classList.add('rose-petal');
                    
                    const size = 5 + Math.random() * 10;
                    petal.style.width = `${size}px`;
                    petal.style.height = `${size}px`;
                    
                    const startX = center.x - 50 + Math.random() * 100;
                    const startY = center.y - 100;
                    
                    petal.style.left = `${startX}px`;
                    petal.style.top = `${startY}px`;
                    
                    document.body.appendChild(petal);
                    
                    const duration = 3 + Math.random() * 2;
                    const delay = Math.random() * 1;
                    const rotation = Math.random() * 360;
                    const endX = startX + (Math.random() * 100 - 50);
                    
                    gsap.to(petal, {
                        y: `+=${center.y + 200 - startY}`,
                        x: endX,
                        rotation: rotation,
                        opacity: 0,
                        duration: duration,
                        delay: delay,
                        ease: 'power1.in',
                        onComplete: () => {
                            petal.remove();
                        }
                    });
                }
            }
            
            function showNextLetter() {
                if (isTransitioning) return;
                isTransitioning = true;
                
                // Ocultar la carta actual si existe
                if (currentLetterIndex >= 0) {
                    hideCurrentLetter();
                } else {
                    // Mostrar la primera carta
                    currentLetterIndex = 0;
                    showCurrentLetter();
                }
            }
            
            function hideCurrentLetter() {
                const letter = letters[currentLetterIndex];
                
                gsap.to(letter, {
                    y: '-=20',
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.in",
                    onComplete: () => {
                        // Verificar si es la última carta
                        if (currentLetterIndex === letters.length - 1) {
                            // Mostrar el corazón y reiniciar
                            showHeartAndReset();
                            return;
                        }
                        
                        // Mostrar la siguiente carta
                        currentLetterIndex++;
                        showCurrentLetter();
                    }
                });
            }
            
            function showCurrentLetter() {
                const letter = letters[currentLetterIndex];
                
                // Resetear posición antes de mostrar
                gsap.set(letter, {
                    y: '+=20',
                    scale: 0.8,
                    opacity: 0,
                    display: 'flex'
                });
                
                // Mostrar la carta con animación
                gsap.to(letter, {
                    y: '-=20',
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    onComplete: () => {
                        isTransitioning = false;
                    }
                });
            }
            
            function showHeartAndReset() {
                // Ocultar todas las cartas primero
                letters.forEach(letter => {
                    gsap.to(letter, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => {
                            letter.style.display = 'none';
                        }
                    });
                });
                
                // Mostrar el corazón con animación después de ocultar las cartas
                setTimeout(() => {
                    heart.style.display = 'block';
                    gsap.fromTo(heart, 
                        { scale: 0.5, opacity: 0 },
                        { 
                            scale: 1, 
                            opacity: 1, 
                            duration: 1.2, 
                            ease: "elastic.out(1, 0.5)",
                            onComplete: () => {
                                // Reiniciar la experiencia después de 2 segundos
                                setTimeout(resetExperience, 2000);
                            }
                        }
                    );
                }, 300);
            }
            
            function resetExperience() {
                // Resetear todas las cartas
                letters.forEach(letter => {
                    gsap.set(letter, {
                        y: '50%',
                        scale: 0.9,
                        opacity: 0,
                        display: 'none'
                    });
                });
                
                // Reiniciar el corazón
                heart.style.animation = 'pulse 2s ease-in-out infinite';
                heart.style.display = 'block';
                heart.style.opacity = '1';
                heart.style.transform = 'rotate(45deg) scale(1)';
                
                // Limpiar partículas y pétalos
                document.querySelectorAll('.heart-particle, .rose-petal').forEach(el => el.remove());
                
                // Restablecer variables de estado
                currentLetterIndex = -1;
                messagesActive = false;
                isTransitioning = false;
            }
            
            heart.addEventListener('click', () => {
                heart.style.animation = 'none';
                
                gsap.to(heart, {
                    scale: 1.5,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.in',
                    onComplete: () => {
                        heart.style.display = 'none';
                        createHeartParticles();
                        
                        // Mostrar la primera carta después de la explosión
                        setTimeout(() => {
                            messagesActive = true;
                            showNextLetter();
                        }, 1500);
                    }
                });
            });
            
            messageContainer.addEventListener('click', (e) => {
                // Si los mensajes están activos y se hace clic en el contenedor
                if (messagesActive && !isTransitioning) {
                    showNextLetter();
                }
            });
            
            // Posicionamiento inicial de las cartas
            letters.forEach(letter => {
                gsap.set(letter, {
                    y: '50%',
                    scale: 0.9,
                    opacity: 0,
                    display: 'none'
                });
            });
        });