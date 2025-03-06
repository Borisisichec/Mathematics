document.addEventListener('DOMContentLoaded', function() {
    const elements = {
        playButton: document.getElementById('playButton'),
        settingsButton: document.getElementById('settingsButton'),
        rewardsButton: document.getElementById('rewardsButton'),
        puzzleButton: document.getElementById('puzzleButton'),
        questionArea: document.getElementById('questionArea'),
        settingsArea: document.getElementById('settingsArea'),
        rewardsArea: document.getElementById('rewardsArea'),
        puzzleArea: document.getElementById('puzzleArea'),
        question: document.getElementById('question'),
        answerButtons: document.querySelectorAll('.answer-button'),
        result: document.getElementById('result'),
        explanation: document.getElementById('explanation'),
        currentScore: document.getElementById('currentScore'),
        totalQuestions: document.getElementById('totalQuestions'),
        currentCoins: document.getElementById('currentCoins'),
        difficultySelect: document.getElementById('difficultySelect'),
        saveSettings: document.getElementById('saveSettings'),
        hintButton: document.getElementById('hintButton'),
        nextQuestionButton: document.getElementById('nextQuestionButton'),
        dailyTask1: document.getElementById('dailyTask1'),
        dailyScore1: document.getElementById('dailyScore1'),
        claimReward1: document.getElementById('claimReward1'),
        dailyTask2: document.getElementById('dailyTask2'),
        dailyScore2: document.getElementById('dailyScore2'),
        claimReward2: document.getElementById('claimReward2'),
        achievement1: document.getElementById('achievement1'),
        achievementScore1: document.getElementById('achievementScore1'),
        claimAchievement1: document.getElementById('claimAchievement1'),
        achievement2: document.getElementById('achievement2'),
        levelProgress: document.getElementById('levelProgress'),
        claimAchievement2: document.getElementById('claimAchievement2'),
        puzzleSelect: document.getElementById('puzzleSelect'),
        puzzleProgress: document.getElementById('puzzleProgress'),
        piecesCollected: document.getElementById('piecesCollected'),
        buyPieceButton: document.getElementById('buyPieceButton'),
        puzzleMessage: document.getElementById('puzzleMessage'),
        puzzlePieces: [
            document.getElementById('puzzlePiece1'),
            document.getElementById('puzzlePiece2'),
            document.getElementById('puzzlePiece3'),
            document.getElementById('puzzlePiece4'),
            document.getElementById('puzzlePiece5'),
            document.getElementById('puzzlePiece6'),
            document.getElementById('puzzlePiece7'),
            document.getElementById('puzzlePiece8'),
            document.getElementById('puzzlePiece9')
        ]
    };

    // Список пазлов с вашим файлом orig.jpeg
    const puzzleImages = [
        'data:image/jpeg;base64,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',    // Ваш файл в формате .jpeg
        'images/car.jpeg',     // Заглушка (замените, если есть другой файл)
        'images/flower.jpeg'   // Заглушка (замените, если есть другой файл)
    ];

    let state = {
        currentDifficulty: 'superEasy',
        currentQuestion: null,
        currentScore: 0,
        totalQuestions: 0,
        currentCoins: 100,     // Начальные 100 монет для тестирования пазла
        currentStreak: 0,
        dailyScore1: 0,
        dailyScore2: 0,
        dailyTask1Completed: false,
        dailyTask2Completed: false,
        achievement1Completed: false,
        achievement2Completed: false,
        playerXP: 0,
        playerLevel: 1,
        puzzlePiecesCollected: 0,
        currentPuzzle: 0
    };

    // Звуковые заглушки
    function playCorrectSound() {
        console.log('Правильный ответ: звук должен воспроизвестись');
    }

    function playIncorrectSound() {
        console.log('Неправильный ответ: звук должен воспроизвестись');
    }

    function showPage(page) {
        [elements.questionArea, elements.settingsArea, elements.rewardsArea, elements.puzzleArea].forEach(area => 
            area.classList.remove('active'));
        page.classList.add('active');
    }

    function generateQuestion() {
        let num1, num2, operator;
        switch (state.currentDifficulty) {
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
                num1 = Math.floor(Math.random() * 50);
                num2 = Math.floor(Math.random() * 50);
                operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
                if (operator === '-' && num1 < num2) [num1, num2] = [num2, num1];
                break;
            case 'hard':
                num1 = Math.floor(Math.random() * 100);
                num2 = Math.floor(Math.random() * 100);
                operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
                if (operator === '/' && num2 === 0) num2 = 1;
                if (operator === '/') num1 = num2 * Math.floor(Math.random() * 10 + 1);
                break;
        }

        state.currentQuestion = { num1, num2, operator };
        const correctAnswer = eval(`${num1} ${operator} ${num2}`);

        elements.question.textContent = `Сколько будет ${num1} ${operator} ${num2}?`;

        let answers = [correctAnswer];
        while (answers.length < 4) {
            const randomAnswer = correctAnswer + Math.floor(Math.random() * 20 - 10);
            if (!answers.includes(randomAnswer) && randomAnswer !== correctAnswer) answers.push(randomAnswer);
        }
        answers = shuffleArray(answers);

        elements.answerButtons.forEach((button, index) => {
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

    elements.answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            state.totalQuestions++;
            elements.totalQuestions.textContent = state.totalQuestions;
            const correctAnswer = eval(`${state.currentQuestion.num1} ${state.currentQuestion.operator} ${state.currentQuestion.num2}`);

            if (button.dataset.correct === 'true') {
                state.currentScore++;
                state.currentCoins += 10;
                state.currentStreak++;
                state.playerXP += 10;
                state.dailyScore1++;
                if (state.currentDifficulty === 'hard') state.dailyScore2++;
                checkLevelUp();
                elements.currentScore.textContent = state.currentScore;
                elements.currentCoins.textContent = state.currentCoins;
                elements.result.textContent = 'Правильно!';
                elements.result.style.color = 'green';
                elements.explanation.textContent = `Решение: ${state.currentQuestion.num1} ${state.currentQuestion.operator} ${state.currentQuestion.num2} = ${correctAnswer}`;
                playCorrectSound();
            } else {
                elements.result.textContent = `Неправильно. Правильный ответ: ${correctAnswer}`;
                elements.result.style.color = 'red';
                elements.explanation.textContent = `Решение: ${state.currentQuestion.num1} ${state.currentQuestion.operator} ${state.currentQuestion.num2} = ${correctAnswer}. ${getOperationExplanation(state.currentQuestion.operator)}`;
                playIncorrectSound();
                state.currentStreak = 0;
            }

            updateRewards();
            elements.hintButton.style.display = 'none';
            elements.nextQuestionButton.style.display = 'block';
            elements.answerButtons.forEach(answer => answer.disabled = true);
        });
    });

    elements.nextQuestionButton.addEventListener('click', function() {
        elements.result.textContent = '';
        elements.explanation.textContent = '';
        elements.nextQuestionButton.style.display = 'none';
        elements.hintButton.style.display = 'block';
        elements.answerButtons.forEach(answer => answer.disabled = false);
        generateQuestion();
    });

    elements.hintButton.addEventListener('click', function() {
        const { num1, num2, operator } = state.currentQuestion;
        let hint = '';
        switch (state.currentDifficulty) {
            case 'superEasy':
                hint = `Подсказка: ${'🍏'.repeat(num1)} ${operator} ${'🍏'.repeat(num2)}`;
                break;
            case 'easy':
                hint = operator === '+' ? `Сложи ${num1} и ${num2}` : `Вычти ${num2} из ${num1}`;
                break;
            case 'medium':
                hint = operator === '*' ? `Умножь ${num1} на ${num2}` : `Попробуй ${getOperationExplanation(operator)}`;
                break;
            case 'hard':
                hint = operator === '/' ? `Раздели ${num1} на ${num2}` : `Попробуй ${getOperationExplanation(operator)}`;
                break;
        }
        elements.explanation.textContent = hint;
        elements.explanation.style.color = 'blue';
    });

    function checkLevelUp() {
        const xpForNextLevel = state.playerLevel * 50;
        if (state.playerXP >= xpForNextLevel) {
            state.playerLevel++;
            state.currentCoins += 50;
            elements.currentCoins.textContent = state.currentCoins;
            alert(`Поздравляем! Вы достигли уровня ${state.playerLevel}! +50 монет`);
            updateRewards();
        }
    }

    function updateRewards() {
        elements.dailyScore1.textContent = state.dailyScore1;
        if (state.dailyScore1 >= 5 && !state.dailyTask1Completed) {
            elements.dailyTask1.classList.add('completed');
            elements.claimReward1.style.display = 'block';
        }

        elements.dailyScore2.textContent = state.dailyScore2;
        if (state.dailyScore2 >= 10 && !state.dailyTask2Completed) {
            elements.dailyTask2.classList.add('completed');
            elements.claimReward2.style.display = 'block';
        }

        elements.achievementScore1.textContent = state.currentScore;
        if (state.currentScore >= 50 && !state.achievement1Completed) {
            elements.achievement1.classList.add('completed');
            elements.claimAchievement1.style.display = 'block';
        }

        elements.levelProgress.textContent = state.playerLevel;
        if (state.playerLevel >= 5 && !state.achievement2Completed) {
            elements.achievement2.classList.add('completed');
            elements.claimAchievement2.style.display = 'block';
        }
    }

    elements.claimReward1.addEventListener('click', function() {
        if (state.dailyScore1 >= 5 && !state.dailyTask1Completed) {
            state.currentCoins += 50;
            state.dailyTask1Completed = true;
            elements.currentCoins.textContent = state.currentCoins;
            elements.claimReward1.style.display = 'none';
            elements.dailyTask1.textContent = 'Задание выполнено! +50 монет';
            saveProgress();
        }
    });

    elements.claimReward2.addEventListener('click', function() {
        if (state.dailyScore2 >= 10 && !state.dailyTask2Completed) {
            state.currentCoins += 100;
            state.dailyTask2Completed = true;
            elements.currentCoins.textContent = state.currentCoins;
            elements.claimReward2.style.display = 'none';
            elements.dailyTask2.textContent = 'Задание выполнено! +100 монет';
            saveProgress();
        }
    });

    elements.claimAchievement1.addEventListener('click', function() {
        if (state.currentScore >= 50 && !state.achievement1Completed) {
            state.currentCoins += 200;
            state.achievement1Completed = true;
            elements.currentCoins.textContent = state.currentCoins;
            elements.claimAchievement1.style.display = 'none';
            elements.achievement1.textContent = 'Достижение выполнено! +200 монет';
            saveProgress();
        }
    });

    elements.claimAchievement2.addEventListener('click', function() {
        if (state.playerLevel >= 5 && !state.achievement2Completed) {
            state.currentCoins += 300;
            state.achievement2Completed = true;
            elements.currentCoins.textContent = state.currentCoins;
            elements.claimAchievement2.style.display = 'none';
            elements.achievement2.textContent = 'Достижение выполнено! +300 монет';
            saveProgress();
        }
    });

    // Мини-игра "Собери пазл"
    function updatePuzzleProgress() {
        console.log('Current puzzle image:', puzzleImages[state.currentPuzzle]); // Для отладки
        elements.piecesCollected.textContent = state.puzzlePiecesCollected;
        const currentImage = puzzleImages[state.currentPuzzle];
        elements.puzzlePieces.forEach(piece => piece.setAttribute('xlink:href', currentImage));
        for (let i = 0; i < elements.puzzlePieces.length; i++) {
            elements.puzzlePieces[i].style.display = i < state.puzzlePiecesCollected ? 'block' : 'none';
        }
        if (state.puzzlePiecesCollected >= 9) {
            state.currentCoins += 250;
            elements.currentCoins.textContent = state.currentCoins;
            elements.puzzleMessage.textContent = 'Пазл собран! Вы получили 250 монет!';
            elements.puzzleMessage.style.color = 'green';
            state.puzzlePiecesCollected = 0;
            setTimeout(() => elements.puzzleMessage.textContent = '', 3000);
            saveProgress();
        }
    }

    elements.buyPieceButton.addEventListener('click', function() {
        if (state.currentCoins >= 20) {
            state.currentCoins -= 20;
            state.puzzlePiecesCollected++;
            elements.currentCoins.textContent = state.currentCoins;
            updatePuzzleProgress();
            elements.puzzleMessage.textContent = `Часть добавлена! Осталось: ${9 - state.puzzlePiecesCollected}`;
            elements.puzzleMessage.style.color = 'blue';
            saveProgress();
        } else {
            elements.puzzleMessage.textContent = 'Недостаточно монет!';
            elements.puzzleMessage.style.color = 'red';
        }
    });

    elements.puzzleSelect.addEventListener('change', function() {
        state.currentPuzzle = parseInt(this.value);
        state.puzzlePiecesCollected = 0; // Сброс прогресса при смене пазла
        updatePuzzleProgress();
        saveProgress();
    });

    elements.playButton.addEventListener('click', () => { generateQuestion(); showPage(elements.questionArea); });
    elements.settingsButton.addEventListener('click', () => showPage(elements.settingsArea));
    elements.rewardsButton.addEventListener('click', () => { updateRewards(); showPage(elements.rewardsArea); });
    elements.puzzleButton.addEventListener('click', () => { updatePuzzleProgress(); showPage(elements.puzzleArea); });

    elements.saveSettings.addEventListener('click', () => {
        state.currentDifficulty = elements.difficultySelect.value;
        saveProgress();
        showPage(elements.questionArea);
    });

    function saveProgress() {
        try {
            localStorage.setItem('gameState', JSON.stringify(state));
        } catch (e) {
            console.error('Ошибка сохранения:', e);
        }
    }

    function loadProgress() {
        try {
            const savedState = localStorage.getItem('gameState');
            if (savedState) {
                Object.assign(state, JSON.parse(savedState));
                elements.currentCoins.textContent = state.currentCoins;
                elements.currentScore.textContent = state.currentScore;
                elements.totalQuestions.textContent = state.totalQuestions;
                elements.difficultySelect.value = state.currentDifficulty;
                elements.puzzleSelect.value = state.currentPuzzle;
                updateRewards();
                updatePuzzleProgress();
            }
        } catch (e) {
            console.error('Ошибка загрузки:', e);
        }
    }

    function getOperationExplanation(operator) {
        return {
            '+': 'Сложи два числа.',
            '-': 'Вычти второе число из первого.',
            '*': 'Умножь два числа.',
            '/': 'Раздели первое число на второе.'
        }[operator];
    }

    loadProgress();
    generateQuestion();
    updateRewards();
    showPage(elements.questionArea);
});