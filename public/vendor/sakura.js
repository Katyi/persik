var sakura = document.getElementById('sakura-container');

if (!sakura) {
  const rand = (min, max) => Math.random() * (max - min) + min;

  // разные лепестки
  const petalsArr = ['🌸', '🌸', '🌸', '🌺', '🌷'];

  let styles = `
  .sakura {
    position: absolute;
    top: -10vh; /* фикс старта */
    pointer-events: none;
    user-select: none;
    will-change: transform;
  }`;

  let html = '';
  const petals = 30;

  for (let i = 1; i <= petals; i++) {
    const startX = rand(0, 100);
    const drift = rand(-20, 20);
    const drift2 = drift * rand(0.3, 0.7);
    const duration = rand(12, 28);
    const delay = rand(0, duration); // безопасный delay
    const size = rand(12, 28);
    const rotate = rand(180, 720);

    const petal = petalsArr[Math.floor(Math.random() * petalsArr.length)];

    html += `<i class="sakura">${petal}</i>`;

    styles += `
    .sakura:nth-child(${i}) {
      left: ${startX}vw;
      font-size: ${size}px;
      animation: fall-${i} ${duration}s ${-delay}s linear infinite;
      animation-fill-mode: both;
    }

    @keyframes fall-${i} {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0.3; /* убрали 0 */
      }

      10% {
        opacity: 1;
      }

      25% {
        transform: translate(${drift2}vw, 25vh) rotate(${rotate * 0.25}deg);
      }

      50% {
        transform: translate(${drift}vw, 50vh) rotate(${rotate * 0.5}deg);
      }

      75% {
        transform: translate(${drift2}vw, 75vh) rotate(${rotate * 0.75}deg);
      }

      100% {
        transform: translate(${drift * 1.5}vw, 110vh) rotate(${rotate}deg);
        opacity: 0.8;
      }
    }`;
  }

  sakura = document.createElement('div');
  sakura.id = 'sakura-container';

  sakura.innerHTML = `
    <style>
      #sakura-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        pointer-events: none;
        z-index: 100;
      }
      ${styles}
    </style>
    ${html}
  `;

  document.body.appendChild(sakura);
}
