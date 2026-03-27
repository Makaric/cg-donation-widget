/**
 * Cosmic-Glitch Guru Widget
 * Neo-Hippie-Hardcore-Cosmo-Buddha-Punk / Mad Max
 * Created for Maxim G. (Makaric)
 */

class CosmicGuru {
  constructor() {
    this.locales = {
      en: {
        cta: ['WITNESS ME', 'FUEL THE FIRE', 'SHARE ENERGY', 'RIDE ETERNAL', 'CLICK BRO'],
        panelTitle: 'ENERGY EXCHANGE',
        copied: 'COPIED!',
        copy: 'copy',
        close: 'RIDE ETERNAL',
        coins: { eth: 'Ethereum', btc: 'Bitcoin', sol: 'Solana', trx: 'Tron' }
      },
      ru: {
        cta: ['ЗАСВИДЕТЕЛЬСТВУЙ', 'ПОДКИНЬ ОГНЯ', 'ЭНЕРГООБМЕН', 'ВЕЧНЫЙ ПУТЬ', 'ЖМАКНИ БРО'],
        panelTitle: 'ЭНЕРГООБМЕН',
        copied: 'СКОПИРОВАНО!',
        copy: 'copy',
        close: 'ВЕЧНЫЙ ПУТЬ',
        coins: { eth: 'Ethereum', btc: 'Bitcoin', sol: 'Solana', trx: 'Tron' }
      }
    };

    this.addresses = {
      eth: '0x4A88CEA080F9A2e60324799EF91400d13aEE439a',
      btc: 'bc1q6gdlptzwhdqnrt2n96hjfws50seplkmmxurh3v',
      sol: 'HxV7H5fkYdoXBv6PhaR538xcMqSQFD7hVbBWdb3H5CHF',
      trx: 'TMQyjfBgeMhFZQ6DnJxz12xQHY4tcGZgJe'
    };

    this.isOpen = false;
    this.ctaIdx = 0;
    this.init();
  }

  get t() {
    const lang = navigator.language.split('-')[0];
    return this.locales[lang] || this.locales.en;
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.createDust();
      this.createSparks();
      this.startCtaRotation();
      this.bindEvents();
    });
  }

  createDust() {
    const container = document.getElementById('dust');
    for (let i = 0; i < 60; i++) {
      const d = document.createElement('div');
      d.className = 'dust';
      d.style.left = Math.random() * 100 + '%';
      d.style.top = Math.random() * 100 + '%';
      d.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
      d.style.setProperty('--dy', (Math.random() * 200 - 100) + 'px');
      d.style.animationDuration = (3 + Math.random() * 5) + 's';
      d.style.animationDelay = Math.random() * 5 + 's';
      const size = (2 + Math.random() * 3) + 'px';
      d.style.width = size;
      d.style.height = size;
      container.appendChild(d);
    }
  }

  createSparks() {
    const container = document.getElementById('sparks');
    for (let i = 0; i < 15; i++) {
      const s = document.createElement('div');
      s.className = 'spark';
      s.style.left = (30 + Math.random() * 40) + '%';
      s.style.top = (10 + Math.random() * 40) + '%';
      s.style.setProperty('--sx', (Math.random() * 80 - 40) + 'px');
      s.style.setProperty('--sy', -(20 + Math.random() * 60) + 'px');
      s.style.animationDuration = (0.8 + Math.random() * 1) + 's';
      s.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(s);
    }
  }

  startCtaRotation() {
    const cta = document.getElementById('cta');
    cta.textContent = this.t.cta[0];
    setInterval(() => {
      this.ctaIdx = (this.ctaIdx + 1) % this.t.cta.length;
      cta.style.opacity = 0;
      setTimeout(() => {
        cta.textContent = this.t.cta[this.ctaIdx];
        cta.style.opacity = 1;
      }, 250);
    }, 3500);
  }

  bindEvents() {
    const widget = document.getElementById('widget');
    const panel = document.getElementById('panel');
    const overlay = document.getElementById('overlay');

    widget.addEventListener('click', () => {
      if (!this.isOpen) this.openPanel();
    });

    overlay.addEventListener('click', () => this.closePanel());

    document.getElementById('close-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.closePanel();
    });

    document.querySelectorAll('.cp-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const coin = btn.dataset.coin;
        const addr = this.addresses[coin];
        navigator.clipboard.writeText(addr).then(() => {
          btn.textContent = this.t.copied;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = this.t.copy;
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  openPanel() {
    this.isOpen = true;
    document.getElementById('widget').classList.add('active');
    document.getElementById('panel').classList.add('show');
    document.getElementById('overlay').classList.add('show');
  }

  closePanel() {
    this.isOpen = false;
    document.getElementById('widget').classList.remove('active');
    document.getElementById('panel').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
  }
}

new CosmicGuru();