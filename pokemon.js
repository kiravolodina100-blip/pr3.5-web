export class Selectors {
    constructor(selector) {
        this.elHP = document.getElementById(`health-${selector}`);
        this.elProgressbar = document.getElementById(`progressbar-${selector}`);
    }
}

export class Pokemon extends Selectors {
    constructor({ name, defaultHP, selectors }) {
        super(selectors);
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = defaultHP;
        
        this.renderHP();
    }

    renderHPLife() {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    }

    renderProgressbar() {
        const percent = (this.damageHP * 100) / this.defaultHP;
        this.elProgressbar.style.width = percent + '%';
        
        this.elProgressbar.classList.remove('low', 'critical');
        if (percent < 20) {
            this.elProgressbar.classList.add('critical');
        } else if (percent < 50) {
            this.elProgressbar.classList.add('low');
        }
    }

    render() {
        this.renderHPLife();
        this.renderProgressbar();
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbar();
    }

    changeHP(count, cb) {
        this.damageHP -= count;

        if (this.damageHP <= 0) {
            this.damageHP = 0;
        }

        this.render();
        
        if (typeof cb === 'function') {
            cb();
        }
    }
}
