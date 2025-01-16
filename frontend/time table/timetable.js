document.addEventListener('DOMContentLoaded', function() {
    const gradeSelection = document.getElementById('gradeSelection');
    gradeSelection.addEventListener('change', generateTimetable);

    // Initial timetable generation for the first grade
    generateTimetable();
});

function generateTimetable() {
    const grade = document.getElementById('gradeSelection').value;
    const timetable = document.getElementById('timetable');
    timetable.innerHTML = '';

    const subjects = getSubjectsForGrade(grade);
    const times = getTimes();

    let table = '<table class="min-w-full bg-white">';
    table += '<thead><tr><th class="py-2 px-4 border-b">Time</th><th class="py-2 px-4 border-b">Subject</th></tr></thead><tbody>';

    subjects.forEach((subject, index) => {
        const time = times[index % times.length];
        table += '<tr>';
        table += `<td class="py-2 px-4 border-b">${time}</td>`;
        table += `<td class="py-2 px-4 border-b">${subject}</td>`;
        table += '</tr>';
    });

    table += '</tbody></table>';
    timetable.innerHTML = table;
}

function getSubjectsForGrade(grade) {
    switch (grade) {
        case '1':
        case '2':
        case '3':
        case '4':
            return ['English', 'Maths', 'GK', 'Hindi', 'Telugu', 'EVS'];
        case '5':
        case '6':
        case '7':
            return ['English', 'Maths', 'Science', 'Hindi', 'Telugu', 'Social'];
        case '8':
        case '9':
        case '10':
            return ['English', 'Maths', 'Physics', 'Hindi', 'Telugu', 'Biology', 'Geography', 'History'];
        default:
            return [];
    }
}

function getTimes() {
    return [
        '09:00 - 09:40',
        '09:50 - 10:30',
        '10:40 - 11:20',
        '11:30 - 12:10',
        '12:20 - 13:00',
        '13:10 - 13:50',
        '14:00 - 14:40',
        '14:50 - 15:30',
        '15:40 - 16:20',
        '16:30 - 17:10'
    ];
}
