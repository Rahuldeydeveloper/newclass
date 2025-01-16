// Grade-subject mapping
const gradeSubjects = {
    1: ['English', 'Maths', 'GK', 'Hindi', 'Telugu', 'EVS'],
    2: ['English', 'Maths', 'GK', 'Hindi', 'Telugu', 'EVS'],
    3: ['English', 'Maths', 'GK', 'Hindi', 'Telugu', 'EVS'],
    4: ['English', 'Maths', 'GK', 'Hindi', 'Telugu', 'EVS'],
    5: ['English', 'Maths', 'Science', 'Hindi', 'Telugu', 'Social'],
    6: ['English', 'Maths', 'Science', 'Hindi', 'Telugu', 'Social'],
    7: ['English', 'Maths', 'Science', 'Hindi', 'Telugu', 'Social'],
    8: ['English', 'Maths', 'Physics', 'Hindi', 'Telugu', 'Biology', 'Geography', 'History'],
    9: ['English', 'Maths', 'Physics', 'Hindi', 'Telugu', 'Biology', 'Geography', 'History'],
    10: ['English', 'Maths', 'Physics', 'Hindi', 'Telugu', 'Biology', 'Geography', 'History']
};

let currentGrade = null;
let currentSubject = null;
let timer = null;
let timeLeft = 1800; // 30 minutes in seconds

// Initialize grade selection
window.onload = function() {
    const gradeSelection = document.getElementById('gradeSelection');
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement('button');
        button.className = 'p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-lg font-medium';
        button.textContent = `Grade ${i}`;
        button.onclick = () => selectGrade(i);
        gradeSelection.appendChild(button);
    }
};

function selectGrade(grade) {
    currentGrade = grade;
    const subjectSection = document.getElementById('subjectSection');
    const subjectSelection = document.getElementById('subjectSelection');
    subjectSelection.innerHTML = '';
    
    gradeSubjects[grade].forEach(subject => {
        const button = document.createElement('button');
        button.className = 'p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-lg font-medium';
        button.textContent = subject;
        button.onclick = () => selectSubject(subject);
        subjectSelection.appendChild(button);
    });
    
    subjectSection.classList.remove('hidden');
    document.getElementById('examSection').classList.add('hidden');
}

function selectSubject(subject) {
    currentSubject = subject;
    loadExam();
    document.getElementById('examSection').classList.remove('hidden');
    startTimer();
}

function loadExam() {
    const examTitle = document.getElementById('examTitle');
    examTitle.textContent = `Grade ${currentGrade} - ${currentSubject} Exam`;
    
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';
    
    // Sample questions (in a real application, these would come from a database)
    const questions = generateSampleQuestions();
    
    questions.forEach((question, index) => {
        const questionElement = createQuestionElement(question, index);
        questionContainer.appendChild(questionElement);
    });
    
    document.getElementById('submitExam').classList.remove('hidden');
}

function generateSampleQuestions() {
    // This would typically come from a backend/database
    return [
        {
            question: ` question 1 what you know about ${currentSubject}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 0
        },
        {
            question: `Sample question 2 for ${currentSubject}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 1
        },
        {
            question: `Sample question 3 for ${currentSubject}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 2
        }
    ];
}

function createQuestionElement(question, index) {
    const div = document.createElement('div');
    div.className = 'question-container p-4 bg-gray-50 rounded-lg';
    div.innerHTML = `
        <p class="font-medium mb-4">Q${index + 1}. ${question.question}</p>
        <div class="space-y-2">
            ${question.options.map((option, i) => `
                <div class="flex items-center">
                    <input type="radio" id="q${index}_${i}" name="q${index}" value="${i}" class="mr-2">
                    <label for="q${index}_${i}">${option}</label>
                </div>
            `).join('')}
        </div>
    `;
    return div;
}

function startTimer() {
    timeLeft = 1800; // Reset timer to 30 minutes
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitExam();
        }
    }, 1000);
    
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function submitExam() {
    clearInterval(timer);
    
    // Calculate score (in a real application, this would be more sophisticated)
    const score = Math.floor(Math.random() * 41) + 60; // Random score between 60-100
    
    // Show result modal
    const resultModal = document.getElementById('resultModal');
    const resultScore = document.getElementById('resultScore');
    resultScore.textContent = `Your score: ${score}%`;
    resultModal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('resultModal').classList.add('hidden');
    // Reset to grade selection
    currentGrade = null;
    currentSubject = null;
    document.getElementById('subjectSection').classList.add('hidden');
    document.getElementById('examSection').classList.add('hidden');
}
