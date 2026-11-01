import { Pokemon } from './pokemon.js';
import { random, countClicks } from './utils.js';

const logs = [
    '[ПЕРСОНАЖ №1] згадав щось важливе, але несподівано [ПЕРСОНАЖ №2], не тямлячи себе від переляку, вдарив у передпліччя ворога.',
    '[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.',
    '[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.',
    '[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.',
    '[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком <вырезанно цензурой> противника.',
    '[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.',
    '[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.',
    '[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника',
    '[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.',
    '[ПЕРСОНАЖ №1] пытался что-то сказать, но вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.'
];

const countKickClicks = countClicks(6);
const countSuperKickClicks = countClicks(6);

// Створюємо екземпляри за допомогою класу Pokemon (для героя та супротивника)
const character = new Pokemon({
    name: 'Pikachu',
    defaultHP: 100,
    selectors: 'character'
});

const enemy = new Pokemon({
    name: 'Charmander',
    defaultHP: 100,
    selectors: 'enemy'
});

const $btnKick = document.getElementById('btn-kick');
const $btnSuperKick = document.getElementById('btn-super-kick');

function generateLog(first, second, damage) {
    const { name: name1 } = first;
    const { name: name2, damageHP, defaultHP } = second;

    const randomIndex = random(logs.length - 1);
    let text = logs[randomIndex]
        .replace('[ПЕРСОНАЖ №1]', name1)
        .replace('[ПЕРСОНАЖ №2]', name2);

    const logMessage = `${text} -${damage} [${damageHP}/${defaultHP}]`;

    const $p = document.createElement('p');
    $p.innerText = logMessage;
    
    const $logs = document.getElementById('logs');
    $logs.insertBefore($p, $logs.children[0]);
}

function attack(attacker, receiver, minDamage, maxDamage) {
    const damage = random(maxDamage - minDamage) + minDamage;
    
    receiver.changeHP(damage, () => {
        generateLog(attacker, receiver, damage);
    });

    if (receiver.damageHP === 0) {
        alert(`${receiver.name} програв бій!`);
        $btnKick.disabled = true;
        if ($btnSuperKick) $btnSuperKick.disabled = true;
    }
}

$btnKick.addEventListener('click', function () {
    countKickClicks(this, 'Thunder Jolt');
    
    attack(character, enemy, 0, 15);
    
    if (enemy.damageHP > 0) {
        attack(enemy, character, 0, 15);
    }
});

if ($btnSuperKick) {
    $btnSuperKick.addEventListener('click', function () {
        countSuperKickClicks(this, 'Iron Tail');
        
        attack(character, enemy, 10, 30);
        
        if (enemy.damageHP > 0) {
            attack(enemy, character, 5, 20);
        }
    });
}