document.addEventListener('DOMContentLoaded', function() {
    // Initialize grade filter
    const gradeFilter = document.getElementById('gradeFilter');
    gradeFilter.addEventListener('change', filterActivities);

    // Initialize activity registration
    const joinButtons = document.querySelectorAll('.join-activity');
    joinButtons.forEach(button => {
        button.addEventListener('click', showRegistrationModal);
    });

    // Initialize registration form
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', handleRegistration);
});

function filterActivities() {
    const selectedGrade = document.getElementById('gradeFilter').value;
    const activities = document.querySelectorAll('.activity-card');

    activities.forEach(activity => {
        const grades = activity.dataset.grades.split(',');
        
        if (selectedGrade === 'all' || grades.includes(selectedGrade)) {
            activity.style.display = 'block';
        } else {
            activity.style.display = 'none';
        }
    });
}

function showRegistrationModal() {
    const activityName = this.closest('.activity-card').querySelector('h3').textContent;
    const modal = document.getElementById('registrationModal');
    modal.querySelector('h3').textContent = `Register for ${activityName}`;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('registrationModal').classList.add('hidden');
}

function handleRegistration(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        grade: formData.get('grade'),
        email: formData.get('email')
    };

    // In a real application, you would send this data to a server
    console.log('Registration data:', data);

    // Show success message
    alert('Registration successful! You will receive a confirmation email shortly.');
    
    // Close modal and reset form
    closeModal();
    event.target.reset();
}

// Add animation when scrolling into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.activity-card').forEach(card => {
    observer.observe(card);
});
