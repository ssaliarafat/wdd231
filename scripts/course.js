const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        completed: false
    }
];

const container = document.querySelector("#courses-container");
const totalCredits = document.querySelector("#total-credits");
const courseDetails = document.querySelector("#course-details");

function displayCourses(courseList) {

    container.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("div");

        card.textContent = `${course.subject} ${course.number}`;

        if (course.completed) {
            card.classList.add("completed");
        }

        card.addEventListener("click", () => {
            displayCourseDetails(course);
        });

        container.appendChild(card);

    });

    calculateCredits(courseList);
}

function calculateCredits(courseList) {

    const credits = courseList.reduce((total, course) => total + course.credits, 0);

    totalCredits.textContent = `Total Credits: ${credits}`;

}

document.querySelector("#all-courses").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#cse-courses").addEventListener("click", () => {

    const cseCourses = courses.filter(course => course.subject === "CSE");

    displayCourses(cseCourses);

});

document.querySelector("#wdd-courses").addEventListener("click", () => {

    const wddCourses = courses.filter(course => course.subject === "WDD");

    displayCourses(wddCourses);

});

displayCourses(courses);

// dialog box
function displayCourseDetails(course) {

    courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Status:</strong> ${course.completed ? "Completed ✅" : "In Progress ⏳"}</p>
    `;

    courseDetails.showModal();

    const closeModal = document.querySelector("#closeModal");

    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}