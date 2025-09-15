document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splashScreen');
    const mainMenu = document.getElementById('mainMenu');
    const playButton = document.getElementById('playButton');
    const settingsButton = document.getElementById('settingsButton');
    const mosaicButton = document.getElementById('mosaicButton');
    const achievementsButton = document.getElementById('achievementsButton');
    const questionArea = document.getElementById('questionArea');
    const settingsArea = document.getElementById('settingsArea');
    const mosaicArea = document.getElementById('mosaicArea');
    const achievementsArea = document.getElementById('achievementsArea');

    const questionElement = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer-button');
    const resultElement = document.getElementById('result');
    const explanationElement = document.getElementById('explanation');
    const scoreElement = document.getElementById('currentScore');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const coinsElement = document.getElementById('currentCoins');
    const mosaicCoinsElement = document.getElementById('mosaicCurrentCoins');
    const difficultySelect = document.getElementById('difficultySelect');
    const saveSettingsButton = document.getElementById('saveSettings');
    const muteButton = document.getElementById('muteButton');
    const resetProgressButton = document.getElementById('resetProgressButton');
    const hintButton = document.getElementById('hintButton');
    const nextQuestionButton = document.getElementById('nextQuestionButton');
    const mosaicPieces = document.querySelectorAll('.mosaic-piece');
    const mosaicMessage = document.getElementById('mosaicMessage');
    const currentMosaicNumber = document.getElementById('currentMosaicNumber');
    const streak5Progress = document.getElementById('streak5Progress');
    const streak10Progress = document.getElementById('streak10Progress');
    const streak5Element = document.getElementById('streak5');
    const streak10Element = document.getElementById('streak10');
    const quickLearnerProgress = document.getElementById('quickLearnerProgress');
    const coinMasterProgress = document.getElementById('coinMasterProgress');
    const hintMasterProgress = document.getElementById('hintMasterProgress');
    const quickLearnerElement = document.getElementById('quickLearner');
    const coinMasterElement = document.getElementById('coinMaster');
    const hintMasterElement = document.getElementById('hintMaster');
    const loginStreakProgress = document.getElementById('loginStreakProgress');
    const backToMenuFromGame = document.getElementById('backToMenuFromGame');
    const backToMenuFromSettings = document.getElementById('backToMenuFromSettings');
    const backToMenuFromMosaic = document.getElementById('backToMenuFromMosaic');
    const backToMenuFromAchievements = document.getElementById('backToMenuFromAchievements');

    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');

    let currentDifficulty = 'superEasy';
    let currentQuestion = null;
    let currentScore = 0;
    let totalQuestions = 0;
    let currentCoins = 0;
    let currentMosaic = 0;
    let mosaics = Array(20).fill().map(() => new Array(9).fill(false));
    let isMuted = false;
    let currentStreak = 0;
    let lastAchievementDate = null;
    let quickLearnerCount = 0;  // Правильные ответы с первой попытки
    let dailyCoinsEarned = 0;   // Монеты, заработанные за день
    let hintUsageCount = 0;     // Количество использованных подсказок
    let loginStreak = 0;        // Счётчик дней входа подряд
    let lastLoginDate = null;   // Дата последнего входа

    const mosaicImages = [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
        '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'
    ];

    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainMenu.style.display = 'block';
        }, 1000);
    }, 4000);

    function showPage(page) {
        console.log('Showing page:', page.id);
        mainMenu.style.display = 'none';
        questionArea.classList.remove('active');
        settingsArea.classList.remove('active');
        mosaicArea.classList.remove('active');
        achievementsArea.classList.remove('active');
        page.classList.add('active');
    }

    function showMainMenu() {
        questionArea.classList.remove('active');
        settingsArea.classList.remove('active');
        mosaicArea.classList.remove('active');
        achievementsArea.classList.remove('active');
        mainMenu.style.display = 'block';
    }

    function generateQuestion() {
        let num1, num2, operator;

        switch (currentDifficulty) {
            case 'superEasy':
                num1 = Math.floor(Math.random() * 5) + 1;
                num2 = Math.floor(Math.random() * 5) + 1;
                operator = Math.random() < 0.5 ? '+' : '-';
                if (operator === '-' && num1 < num2) [num1, num2] = [num2, num1];
                break;
            case 'easy':
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                operator = Math.random() < 0.5 ? '+' : '-';
                if (operator === '-' && num1 < num2) [num1, num2] = [num2, num1];
                break;
            case 'medium':
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
                operator = Math.random() < 0.5 ? '+' : '-';
                if (operator === '-' && num1 < num2) [num1, num2] = [num2, num1];
                break;
            case 'hard':
                num1 = Math.floor(Math.random() * 50);
                num2 = Math.floor(Math.random() * 50);
                const operations = ['+', '-', '*', '/'];
                operator = operations[Math.floor(Math.random() * operations.length)];
                if (operator === '/' && num2 !== 0) num1 = num2 * Math.floor(Math.random() * 10);
                break;
        }

        currentQuestion = { num1, num2, operator };
        let correctAnswer = operator === '+' ? num1 + num2 : 
                          operator === '-' ? num1 - num2 : 
                          operator === '*' ? num1 * num2 : 
                          num1 / num2;

        questionElement.textContent = `Сколько будет ${num1} ${operator} ${num2}?`;

        let answers = [];
        while (answers.length < 3) {
            let randomAnswer = Math.floor(Math.random() * 100) - 50;
            if (!answers.includes(randomAnswer) && randomAnswer !== correctAnswer) answers.push(randomAnswer);
        }
        answers.push(correctAnswer);
        answers = shuffleArray(answers);

        answerButtons.forEach((button, index) => {
            button.textContent = answers[index];
            button.dataset.correct = answers[index] === correctAnswer ? 'true' : 'false';
        });
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            totalQuestions++;
            totalQuestionsElement.textContent = totalQuestions;

            let correctAnswer = currentQuestion.operator === '+' ? currentQuestion.num1 + currentQuestion.num2 :
                              currentQuestion.operator === '-' ? currentQuestion.num1 - currentQuestion.num2 :
                              currentQuestion.operator === '*' ? currentQuestion.num1 * currentQuestion.num2 :
                              currentQuestion.num1 / currentQuestion.num2;

            if (button.dataset.correct === 'true') {
                currentScore++;
                currentStreak++;
                currentCoins += 10;
                dailyCoinsEarned += 10; // Отслеживаем монеты за день
                quickLearnerCount++;    // Увеличиваем счётчик правильных ответов
                scoreElement.textContent = currentScore;
                coinsElement.textContent = currentCoins;
                mosaicCoinsElement.textContent = currentCoins;
                resultElement.textContent = 'Правильно!';
                resultElement.style.color = 'green';
                explanationElement.textContent = `Правильное решение: ${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2} = ${correctAnswer}`;
                if (!isMuted) correctSound.play();
                checkAchievements();
            } else {
                currentStreak = 0;
                resultElement.textContent = `Неправильно. Правильный ответ был ${correctAnswer}`;
                resultElement.style.color = 'red';
                explanationElement.textContent = `Правильное решение: ${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2} = ${correctAnswer}. Объяснение: нужно ${getOperationExplanation(currentQuestion.operator)}`;
                if (!isMuted) incorrectSound.play();
            }

            hintButton.style.display = 'none';
            nextQuestionButton.style.display = 'block';
            answerButtons.forEach(answer => answer.disabled = true);
            updateAchievementsDisplay();
            saveProgress();
        });
    });

    nextQuestionButton.addEventListener('click', function() {
        resultElement.textContent = '';
        explanationElement.textContent = '';
        nextQuestionButton.style.display = 'none';
        hintButton.style.display = 'block';
        answerButtons.forEach(answer => answer.disabled = false);
        generateQuestion();
    });

    hintButton.addEventListener('click', function() {
        hintUsageCount++; // Увеличиваем счётчик подсказок
        explanationElement.textContent = currentDifficulty === 'superEasy' ?
            `Подсказка: ${'🍏'.repeat(currentQuestion.num1)} ${currentQuestion.operator} ${'🍏'.repeat(currentQuestion.num2)}` :
            `Подсказка: ${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2} = ? Попробуй вспомнить, что такое ${getOperationExplanation(currentQuestion.operator)}.`;
        explanationElement.style.color = 'blue';
        checkAchievements(); // Проверяем после использования подсказки
        updateAchievementsDisplay();
    });

    playButton.addEventListener('click', function() {
        generateQuestion();
        showPage(questionArea);
    });

    settingsButton.addEventListener('click', function() {
        showPage(settingsArea);
    });

    mosaicButton.addEventListener('click', function() {
        console.log('Mosaic button clicked');
        updateMosaic();
        showPage(mosaicArea);
    });

    achievementsButton.addEventListener('click', function() {
        updateAchievementsDisplay();
        showPage(achievementsArea);
    });

    saveSettingsButton.addEventListener('click', function() {
        currentDifficulty = difficultySelect.value;
        saveProgress();
        showPage(questionArea);
        generateQuestion();
    });

    muteButton.addEventListener('click', function() {
        isMuted = !isMuted;
        muteButton.textContent = isMuted ? 'Включить звук' : 'Отключить звук';
        saveProgress();
    });

    resetProgressButton.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить!')) {
            currentScore = 0;
            totalQuestions = 0;
            currentCoins = 0;
            currentMosaic = 0;
            mosaics = Array(20).fill().map(() => new Array(9).fill(false));
            currentStreak = 0;
            quickLearnerCount = 0;
            dailyCoinsEarned = 0;
            hintUsageCount = 0;
            loginStreak = 0;
            lastLoginDate = null;
            streak5Element.classList.remove('completed');
            streak10Element.classList.remove('completed');
            quickLearnerElement.classList.remove('completed');
            coinMasterElement.classList.remove('completed');
            hintMasterElement.classList.remove('completed');
            scoreElement.textContent = currentScore;
            totalQuestionsElement.textContent = totalQuestions;
            coinsElement.textContent = currentCoins;
            mosaicCoinsElement.textContent = currentCoins;
            currentMosaicNumber.textContent = currentMosaic + 1;
            updateMosaic();
            updateAchievementsDisplay();
            saveProgress();
            alert('Прогресс сброшен!');
        }
    });

    // Добавляем обработчики для кнопок "Назад в меню"
    backToMenuFromGame.addEventListener('click', showMainMenu);
    backToMenuFromSettings.addEventListener('click', showMainMenu);
    backToMenuFromMosaic.addEventListener('click', showMainMenu);
    backToMenuFromAchievements.addEventListener('click', showMainMenu);

    mosaicPieces.forEach(piece => {
        const button = piece.querySelector('.buy-piece-button');
        button.addEventListener('click', function() {
            const index = parseInt(piece.dataset.index);
            const cost = parseInt(button.dataset.cost);

            if (mosaics[currentMosaic][index]) {
                mosaicMessage.textContent = 'Эта часть уже куплена!';
                mosaicMessage.style.color = 'blue';
                return;
            }

            if (currentCoins >= cost) {
                currentCoins -= cost;
                coinsElement.textContent = currentCoins;
                mosaicCoinsElement.textContent = currentCoins;
                mosaics[currentMosaic][index] = true;

                if (mosaics[currentMosaic].every(part => part)) {
                    currentMosaic++;
                    if (currentMosaic >= 20) {
                        currentMosaic = 19;
                        mosaicMessage.textContent = 'Вы собрали все мозаики!';
                        mosaicMessage.style.color = 'green';
                    } else {
                        mosaicMessage.textContent = `Мозаика ${currentMosaic} завершена! Переходим к следующей.`;
                        mosaicMessage.style.color = 'green';
                    }
                } else {
                    mosaicMessage.textContent = 'Часть мозаики куплена!';
                    mosaicMessage.style.color = 'green';
                }

                updateMosaic();
                saveProgress();
            } else {
                mosaicMessage.textContent = 'Недостаточно монет!';
                mosaicMessage.style.color = 'red';
            }
        });
    });

    function updateMosaic() {
        console.log('Updating mosaic for mosaic number:', currentMosaic + 1);
        mosaicPieces.forEach((piece, index) => {
            if (mosaics[currentMosaic][index]) {
                piece.classList.add('unlocked');
                piece.style.backgroundImage = `url('${mosaicImages[currentMosaic]}')`;
                piece.style.backgroundPosition = `${-(index % 3) * 100}px ${-Math.floor(index / 3) * 100}px`;
                piece.querySelector('.buy-piece-button').style.display = 'none';
            } else {
                piece.classList.remove('unlocked');
                piece.style.backgroundImage = 'none';
                piece.querySelector('.buy-piece-button').style.display = 'block';
            }
        });
        mosaicCoinsElement.textContent = currentCoins;
        currentMosaicNumber.textContent = currentMosaic + 1;
    }

    function checkAchievements() {
        const today = new Date().toDateString();
        if (lastAchievementDate !== today) {
            currentStreak = 0;
            quickLearnerCount = 0;
            dailyCoinsEarned = 0;
            hintUsageCount = 0;
            lastAchievementDate = today;
            streak5Element.classList.remove('completed');
            streak10Element.classList.remove('completed');
            quickLearnerElement.classList.remove('completed');
            coinMasterElement.classList.remove('completed');
            hintMasterElement.classList.remove('completed');
        }

        if (currentStreak >= 5 && !streak5Element.classList.contains('completed')) {
            currentCoins += 10;
            streak5Element.classList.add('completed');
            coinsElement.textContent = currentCoins;
            mosaicCoinsElement.textContent = currentCoins;
        }
        if (currentStreak >= 10 && !streak10Element.classList.contains('completed')) {
            currentCoins += 15;
            streak10Element.classList.add('completed');
            coinsElement.textContent = currentCoins;
            mosaicCoinsElement.textContent = currentCoins;
        }
        if (quickLearnerCount >= 3 && !quickLearnerElement.classList.contains('completed')) {
            currentCoins += 5;
            quickLearnerElement.classList.add('completed');
            coinsElement.textContent = currentCoins;
            mosaicCoinsElement.textContent = currentCoins;
        }
        if (dailyCoinsEarned >= 50 && !coinMasterElement.classList.contains('completed')) {
            currentCoins += 10;
            coinMasterElement.classList.add('completed');
            coinsElement.textContent = currentCoins;
            mosaicCoinsElement.textContent = currentCoins;
        }
        if (hintUsageCount >= 5 && !hintMasterElement.classList.contains('completed')) {
            currentCoins += 15;
            hintMasterElement.classList.add('completed');
            coinsElement.textContent = currentCoins;
            mosaicCoinsElement.textContent = currentCoins;
        }
    }

    function updateAchievementsDisplay() {
        streak5Progress.textContent = Math.min(currentStreak, 5);
        streak10Progress.textContent = Math.min(currentStreak, 10);
        quickLearnerProgress.textContent = Math.min(quickLearnerCount, 3);
        coinMasterProgress.textContent = Math.min(dailyCoinsEarned, 50);
        hintMasterProgress.textContent = Math.min(hintUsageCount, 5);

        if (currentStreak >= 5) streak5Element.classList.add('completed');
        if (currentStreak >= 10) streak10Element.classList.add('completed');
        if (quickLearnerCount >= 3) quickLearnerElement.classList.add('completed');
        if (dailyCoinsEarned >= 50) coinMasterElement.classList.add('completed');
        if (hintUsageCount >= 5) hintMasterElement.classList.add('completed');
    }

    function checkDailyLogin() {
        const today = new Date().toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        if (lastLoginDate !== today) {
            if (lastLoginDate === yesterdayStr) {
                loginStreak++;
            } else if (!lastLoginDate || lastLoginDate !== today) {
                loginStreak = 1; // Начинаем стрик заново
            }

            // Даём 5 монет за вход
            currentCoins += 5;
            coinsElement.textContent = currentCoins;
            mosaicCoinsElement.textContent = currentCoins;

            // Проверяем 7 дней
            if (loginStreak >= 7) {
                currentCoins += 50;
                coinsElement.textContent = currentCoins;
                mosaicCoinsElement.textContent = currentCoins;
                loginStreak = 0; // Сбрасываем после 7 дней
                alert('Поздравляем! Вы получили 50 монет за 7 дней входа подряд!');
            }

            lastLoginDate = today;
            saveProgress();
        }
        loginStreakProgress.textContent = loginStreak;
    }

    function saveProgress() {
        localStorage.setItem('currentDifficulty', currentDifficulty);
        localStorage.setItem('currentCoins', currentCoins);
        localStorage.setItem('mosaics', JSON.stringify(mosaics));
        localStorage.setItem('currentMosaic', currentMosaic);
        localStorage.setItem('currentScore', currentScore);
        localStorage.setItem('totalQuestions', totalQuestions);
        localStorage.setItem('isMuted', isMuted);
        localStorage.setItem('currentStreak', currentStreak);
        localStorage.setItem('lastAchievementDate', lastAchievementDate);
        localStorage.setItem('quickLearnerCount', quickLearnerCount);
        localStorage.setItem('dailyCoinsEarned', dailyCoinsEarned);
        localStorage.setItem('hintUsageCount', hintUsageCount);
        localStorage.setItem('loginStreak', loginStreak);
        localStorage.setItem('lastLoginDate', lastLoginDate);
    }

    function loadProgress() {
        if (localStorage.getItem('currentDifficulty')) {
            currentDifficulty = localStorage.getItem('currentDifficulty');
            difficultySelect.value = currentDifficulty;
        }
        if (localStorage.getItem('currentCoins')) {
            currentCoins = parseInt(localStorage.getItem('currentCoins'));
            coinsElement.textContent = currentCoins;
            mosaicCoinsElement.textContent = currentCoins;
        }
        if (localStorage.getItem('mosaics')) {
            mosaics = JSON.parse(localStorage.getItem('mosaics'));
        }
        if (localStorage.getItem('currentMosaic')) {
            currentMosaic = parseInt(localStorage.getItem('currentMosaic'));
            if (currentMosaic >= 20) currentMosaic = 19;
        }
        if (localStorage.getItem('currentScore')) {
            currentScore = parseInt(localStorage.getItem('currentScore'));
            scoreElement.textContent = currentScore;
        }
        if (localStorage.getItem('totalQuestions')) {
            totalQuestions = parseInt(localStorage.getItem('totalQuestions'));
            totalQuestionsElement.textContent = totalQuestions;
        }
        if (localStorage.getItem('isMuted')) {
            isMuted = localStorage.getItem('isMuted') === 'true';
            muteButton.textContent = isMuted ? 'Включить звук' : 'Отключить звук';
        }
        if (localStorage.getItem('currentStreak')) {
            currentStreak = parseInt(localStorage.getItem('currentStreak'));
        }
        if (localStorage.getItem('lastAchievementDate')) {
            lastAchievementDate = localStorage.getItem('lastAchievementDate');
            const today = new Date().toDateString();
            if (lastAchievementDate !== today) {
                currentStreak = 0;
                quickLearnerCount = 0;
                dailyCoinsEarned = 0;
                hintUsageCount = 0;
                lastAchievementDate = today;
                streak5Element.classList.remove('completed');
                streak10Element.classList.remove('completed');
                quickLearnerElement.classList.remove('completed');
                coinMasterElement.classList.remove('completed');
                hintMasterElement.classList.remove('completed');
            }
        }
        if (localStorage.getItem('quickLearnerCount')) {
            quickLearnerCount = parseInt(localStorage.getItem('quickLearnerCount'));
        }
        if (localStorage.getItem('dailyCoinsEarned')) {
            dailyCoinsEarned = parseInt(localStorage.getItem('dailyCoinsEarned'));
        }
        if (localStorage.getItem('hintUsageCount')) {
            hintUsageCount = parseInt(localStorage.getItem('hintUsageCount'));
        }
        if (localStorage.getItem('loginStreak')) {
            loginStreak = parseInt(localStorage.getItem('loginStreak'));
        }
        if (localStorage.getItem('lastLoginDate')) {
            lastLoginDate = localStorage.getItem('lastLoginDate');
        }
        updateMosaic();
        updateAchievementsDisplay();
        checkDailyLogin(); // Проверяем ежедневный вход
    }

    function getOperationExplanation(operator) {
        return { '+': 'сложить', '-': 'вычесть', '*': 'умножить', '/': 'разделить' }[operator];
    }

    loadProgress();
});
