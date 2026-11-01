export function random(num) {
    return Math.floor(Math.random() * (num + 1));
}

export function countClicks(maxLimit = 6) {
    let clicks = 0;

    return function(buttonElement, buttonOriginalText) {
        clicks++;
        const remaining = maxLimit - clicks;
        
        console.log(`Кількість кліків по кнопці: ${clicks}. Залишилось натискань: ${remaining >= 0 ? remaining : 0}`);

        if (remaining >= 0) {
            buttonElement.innerText = `${buttonOriginalText} (${remaining})`;
        }

        if (clicks >= maxLimit) {
            buttonElement.disabled = true;
            buttonElement.innerText = `${buttonOriginalText} (Вичерпано)`;
            console.log('Ліміт натискань для цієї кнопки вичерпано!');
        }

        return clicks;
    };
}