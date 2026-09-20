var leavesContainer = document.getElementById('leaves-container');

if (!leavesContainer) {
  const rand = (min, max) => Math.random() * (max - min) + min;

  // leaves and pumpkins
  const elementsArr = [
    '🍁',
    '🍂',
    '🍃',
    '🌾',
    '🍁',
    '🍂',
    '🍁',
    '🍂',
    '🍃',
    '🍁',
    '🎃',
  ];

  let styles = `
  .leaf {
    position: absolute;
    top: -10vh;
    pointer-events: none;
    user-select: none;
    will-change: transform;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }`;

  let html = '';
  const elementsCount = 40; // Немного увеличим общее количество

  for (let i = 1; i <= elementsCount; i++) {
    const startX = rand(0, 100);
    const drift = rand(-25, 25);
    const drift2 = drift * rand(0.3, 0.8);
    const duration = rand(10, 26); // Чуть медленнее
    const delay = rand(0, duration);
    const size = rand(18, 36); // Немного увеличим базовый размер
    const rotate = rand(360, 1080);

    const elementSymbol =
      elementsArr[Math.floor(Math.random() * elementsArr.length)];

    html += `<i class="leaf">${elementSymbol}</i>`;

    styles += `
    .leaf:nth-child(${i}) {
      left: ${startX}vw;
      font-size: ${size}px;
      animation: fall-leaf-${i} ${duration}s ${-delay}s linear infinite;
      animation-fill-mode: both;
      z-index: ${Math.random() > 0.5 ? 101 : 99}; /* Часть элементов за контентом, часть перед */
    }

    @keyframes fall-leaf-${i} {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0.2;
      }

      10% {
        opacity: 1;
      }

      25% {
        transform: translate(${drift}vw, 25vh) rotate(${rotate * 0.25}deg);
      }

      50% {
        transform: translate(${drift2}vw, 50vh) rotate(${rotate * 0.5}deg);
      }

      75% {
        transform: translate(${drift}vw, 75vh) rotate(${rotate * 0.75}deg);
      }

      100% {
        transform: translate(${drift2 * 1.5}vw, 110vh) rotate(${rotate}deg);
        opacity: 0.7;
      }
    }`;
  }

  leavesContainer = document.createElement('div');
  leavesContainer.id = 'leaves-container';

  leavesContainer.innerHTML = `
    <style>
      #leaves-container {
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

  document.body.appendChild(leavesContainer);
}
