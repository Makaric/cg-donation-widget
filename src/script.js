/* =============================================
   COSMIC GLITCH GURU - i18n DONATION WIDGET
   Locale: ru = Russian, everything else = English
   ============================================= */

class CosmicGuru {
  constructor() {
    this.locales = {
      en: {
        cta: ['WITNESS ME', 'FUEL THE FIRE', 'SHARE ENERGY', 'RIDE ETERNAL', 'CLICK BRO'],
        panelTitle: 'ENERGY EXCHANGE',
        closeBtn: 'RIDE ETERNAL',
        copyBtn: 'copy',
        copiedBtn: 'COPIED!',
        langLabel: 'EN'
      },
      ru: {
        cta: ['\u0417\u0410\u0421\u0412\u0418\u0414\u0415\u0422\u0415\u041B\u042C\u0421\u0422\u0412\u0423\u0419', '\u041F\u041E\u0414\u041A\u0418\u041D\u042C \u041E\u0413\u041D\u042F', '\u042D\u041D\u0415\u0420\u0413\u041E\u041E\u0411\u041C\u0415\u041D', '\u0412\u0415\u0427\u041D\u042B\u0419 \u041F\u0423\u0422\u042C', '\u0416\u041C\u0410\u041A\u041D\u0418 \u0411\u0420\u041E'],
        panelTitle: '\u041E\u0411\u041C\u0415\u041D \u042D\u041D\u0415\u0420\u0413\u0418\u0415\u0419',
        closeBtn: '\u0412\u0415\u0427\u041D\u042B\u0419 \u041F\u0423\u0422\u042C',
        copyBtn: '\u043A\u043E\u043F\u0438\u044F',
        copiedBtn: '\u0421\u041A\u041E\u041F\u0418\u0420\u041E\u0412\u0410\u041D\u041E!',
        langLabel: 'RU'
      }
    };

    this.addresses = {
      eth: '0x4A88CEA080F9A2e60324799EF91400d13aEE439a',
      btc: 'bc1q6gdlptzwhdqnrt2n96hjfws50seplkmmxurh3v',
      sol: 'HxV7H5fkYdoXBv6PhaR538xcMqSQFD7hVbBWdb3H5CHF',
      trx: 'TMQyjfBgeMhFZQ6DnJxz12xQHY4tcGZgJe'
    };

    this.lang = this.detectLang();
    this.ctaIdx = 0;
    this.init();
  }

  detectLang() {
    const raw = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
    return raw === 'ru' ? 'ru' : 'en';
  }

  get t() {
    return this.locales[this.lang];
  }

  toggleLang() {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    this.applyLocale();
  }

  applyLocale() {
    const loc = this.t;
    document.getElementById('panelHdr').textContent = loc.panelTitle;
    document.getElementById('closeBtn').innerHTML = loc.closeBtn + ' \u2715';
    document.getElementById('langToggle').textContent = loc.langLabel;
    document.getElementById('cta').textContent = loc.cta[0];
    this.ctaIdx = 0;

    document.querySelectorAll('.cp-btn').forEach(btn => {
      if (!btn.classList.contains('copied')) {
        btn.textContent = loc.copyBtn;
      }
    });
  }

  init() {
    this.createDust();
    this.createSparks();
    this.startCtaRotation();
    this.bindEvents();
    this.applyLocale();
  }

  createDust() {
    const el = document.getElementById('dust');
    for (let i = 0; i < 60; i++) {
      const d = document.createElement('div');
      d.className = 'dust';
      d.style.left = Math.random() * 100 + '%';
      d.style.top = Math.random() * 100 + '%';
      d.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
      d.style.setProperty('--dy', (Math.random() * 200 - 100) + 'px');
      d.style.animationDuration = (3 + Math.random() * 5) + 's';
      d.style.animationDelay = Math.random() * 5 + 's';
      d.style.width = (2 + Math.random() * 3) + 'px';
      d.style.height = d.style.width;
      el.appendChild(d);
    }
  }

  createSparks() {
    const el = document.getElementById('sparks');
    if (!el) return;
    for (let i = 0; i < 15; i++) {
      const s = document.createElement('div');
      s.className = 'spark';
      s.style.left = (30 + Math.random() * 60) + '%';
      s.style.top = (10 + Math.random() * 40) + '%';
      s.style.setProperty('--sx', (Math.random() * 80 - 40) + 'px');
      s.style.setProperty('--sy', -(20 + Math.random() * 60) + 'px');
      s.style.animationDuration = (0.8 + Math.random() * 1) + 's';
      s.style.animationDelay = Math.random() * 2 + 's';
      el.appendChild(s);
    }
  }

  startCtaRotation() {
    setInterval(() => {
      const phrases = this.t.cta;
      this.ctaIdx = (this.ctaIdx + 1) % phrases.length;
      const cta = document.getElementById('cta');
      cta.style.opacity = 0;
      setTimeout(() => {
        cta.textContent = phrases[this.ctaIdx];
        cta.style.opacity = 1;
      }, 250);
    }, 3500);
  }

  bindEvents() {
    const self = this;
    document.getElementById('widget').addEventListener('click', () => self.openPanel());
    document.getElementById('overlay').addEventListener('click', () => self.closePanel());
    document.getElementById('closeBtn').addEventListener('click', (e) => { e.stopPropagation(); self.closePanel(); });
    document.getElementById('langToggle').addEventListener('click', (e) => { e.stopPropagation(); self.toggleLang(); });

    document.querySelectorAll('.crypto-row').forEach(row => {
      row.addEventListener('click', (e) => {
        e.stopPropagation();
        const coin = row.dataset.coin;
        if (coin) self.copyAddr(coin, row.querySelector('.cp-btn'));
      });
    });
  }

  openPanel() {
    document.getElementById('widget').classList.add('active');
    document.getElementById('panel').classList.add('show');
    document.getElementById('overlay').classList.add('show');
  }

  closePanel() {
    document.getElementById('widget').classList.remove('active');
    document.getElementById('panel').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
  }

  copyAddr(coin, btn) {
    const addr = this.addresses[coin];
    const loc = this.t;
    navigator.clipboard.writeText(addr).then(() => {
      btn.textContent = loc.copiedBtn;
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = loc.copyBtn;
        btn.classList.remove('copied');
      }, 2000);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new CosmicGuru());
