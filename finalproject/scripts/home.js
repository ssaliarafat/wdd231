// ===============================
// Fifth Version Studios - Home Page
// Home page functionality:
// 1) Responsive hamburger navigation
// 2) LocalStorage for the news feed preference
// 3) Fetch tech stories from the Hacker News API
// 4) Render story cards dynamically
// ===============================


// ---------- DOM ELEMENTS ----------
const menuButton = document.querySelector(".menu-button");
const primaryNav = document.querySelector(".primary-nav");
const yearSpan = document.querySelector("#year");
const storyFeedSelect = document.querySelector("#story-feed");
const newsFeed = document.querySelector("#news-feed");


// ---------- CONSTANTS ----------
const HN_API_BASE = "https://hacker-news.firebaseio.com/v0";

const FEED_ENDPOINTS = {
    top: "topstories",
    new: "newstories",
    best: "beststories"
};

const STORAGE_KEY = "fv-news-feed";


// ---------- MOBILE NAVIGATION ----------
if (menuButton && primaryNav) {

    menuButton.addEventListener("click", () => {

        const isOpen = primaryNav.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));

    });

}


// ---------- FOOTER YEAR ----------
if (yearSpan) {

    yearSpan.textContent = new Date().getFullYear();

}


// ---------- LOCAL STORAGE ----------
const savedFeed = localStorage.getItem(STORAGE_KEY) || "top";

if (storyFeedSelect) {

    storyFeedSelect.value = savedFeed;

}


// ---------- NEWS FEED FETCHING ----------
if (storyFeedSelect) {

    storyFeedSelect.addEventListener("change", () => {

        localStorage.setItem(STORAGE_KEY, storyFeedSelect.value);

        loadNewsStories(storyFeedSelect.value);

    });

}


// Fetch the chosen story feed and render the first 6 items
async function loadNewsStories(feedType = "top") {

    if (!newsFeed) return;

    const endpoint = FEED_ENDPOINTS[feedType] || FEED_ENDPOINTS.top;

    const feedUrl = `${HN_API_BASE}/${endpoint}.json`;

    try {

        newsFeed.innerHTML = `<p class="status">Loading tech stories…</p>`;


        // Step 1: fetch story IDs
        const response = await fetch(feedUrl);

        if (!response.ok) {

            throw new Error(`Could not load feed: ${response.status}`);

        }

        const storyIds = await response.json();


        // Step 2: fetch FIRST 6 STORIES
        const topStoryIds = storyIds.slice(0, 6);


        const storyRequests = topStoryIds.map(async (id) => {

            const storyResponse = await fetch(`${HN_API_BASE}/item/${id}.json`);

            if (!storyResponse.ok) {

                throw new Error(`Could not load story ${id}`);

            }

            return storyResponse.json();

        });


        // FIX: prevent crashes if one story fails
        const stories = (await Promise.allSettled(storyRequests))
            .filter(result => result.status === "fulfilled")
            .map(result => result.value);


        renderNewsStories(stories, feedType);

    }

    catch (error) {

        console.error("News feed error:", error);

        newsFeed.innerHTML = `
        <p class="status">
        Sorry, the learning resources could not load right now.
        </p>
        `;

    }

}


// Render story cards
function renderNewsStories(stories, feedType) {

    if (!newsFeed) return;


    const feedLabel =
        feedType === "new"
            ? "Newest"
            : feedType === "best"
                ? "Best"
                : "Top";


    newsFeed.innerHTML = stories.map((story, index) => {

        const storyUrl =
            story.url ||
            `https://news.ycombinator.com/item?id=${story.id}`;


        const published =
            new Date(story.time * 1000).toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                }
            );


        return `

        <article class="news-card">

            <p class="eyebrow">
                ${feedLabel} Story ${index + 1}
            </p>

            <h3>

                <a href="${storyUrl}" target="_blank" rel="noopener">

                    ${story.title}

                </a>

            </h3>

            <p>
                ${story.by ? `By ${story.by}` : "Author unavailable"}
            </p>

            <div class="news-meta">

                <span>Score: ${story.score ?? "0"}</span>

                <span>Date: ${published}</span>

                <span>Comments: ${story.descendants ?? 0}</span>

            </div>

            <a class="source-link"
               href="${storyUrl}"
               target="_blank"
               rel="noopener">

               Read more

            </a>

        </article>

        `;

    }).join("");

}


// Initial page load
loadNewsStories(savedFeed);



/* ===============================
   PROJECT MODAL FUNCTIONALITY
================================= */


const modal = document.querySelector("#project-modal");

const modalContent = document.querySelector("#modal-content");

const closeModalButton = document.querySelector("#close-modal");

const projectButtons = document.querySelectorAll(".open-modal");


// Project data object
const projectData = {

    weight: {

        title: "Live-ACtion",

        description:
            "Live-action filmmaking focuses on authentic human performance captured in real environments. These productions emphasize emotional storytelling, grounded characters, and cinematic realism."

    },

    city: {

        title: "Animation",

        description:
            "Animation allows stories to move beyond physical limitations into stylized cinematic worlds shaped entirely by imagination. Characters, environments, and visual effects can be designed with complete creative freedom."
    },

    signal: {

        title: "Comic Storytelling",

        description:
            "graphic stories often serve as the foundation for future animated or live-action adaptations, allowing ideas to grow into larger story worlds over time.."

    },

    intro: {

        title: "AI Cinema",

        description:
            "AI Cinema at Fifth Version Studios explores a new frontier of filmmaking where artificial intelligence assists in visual development, scene creation, concept storytelling, and experimental production workflows."

    }

};


// Attach modal listeners safely
projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const projectKey = button.dataset.project;

        const project = projectData[projectKey];

        if (!project) return;


        modalContent.innerHTML = `

        <h2>${project.title}</h2>

        <p>${project.description}</p>

        `;


        if (modal) {

            modal.showModal();

        }

    });

});


// Safe close button listener
if (closeModalButton && modal) {

    closeModalButton.addEventListener("click", () => {

        modal.close();

    });

}


// Safe outside-click close listener
if (modal) {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            modal.close();

        }

    });

}