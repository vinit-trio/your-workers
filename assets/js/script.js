// -------------------------------------
// Back to top button JS 
// -------------------------------------

function backToTop() {
    return {
        visible: false,

        init() {
            const toggle = () => {
                this.visible = window.scrollY > 300;
            };

            toggle();
            window.addEventListener("scroll", toggle);
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
}

// -----------------------------
// Gallery slider
// -----------------------------

document.querySelectorAll("[data-gallery]").forEach((gallery, i) => {
    const thumbs = new Swiper(gallery.querySelector(".thumbs-slider"), {
        spaceBetween: 32,
        slidesPerView: 4,
        watchSlidesProgress: false,
        breakpoints: {
            320: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 32,
            },
        },
    });
    const main = new Swiper(gallery.querySelector(".main-slider"), {
        spaceBetween: 32,
        effect: "fade",
        navigation: {
            nextEl: gallery.querySelector(".swiper_button_next"),
            prevEl: gallery.querySelector(".swiper_button_prev"),
        },
        thumbs: {
            swiper: thumbs,
        },
    });
});

// -----------------------------
// Load google map
// -----------------------------

if (document.getElementById("loadMapBtn")) {
    document.getElementById("loadMapBtn").addEventListener("click", function () {
        document.getElementById("google_map").innerHTML = `
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.2480362618803!2d7.852373276857274!3d51.04850774412271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47beac8c5a07c74d%3A0xc94d8a01bf807361!2sKoch%20Immobilien%20GmbH!5e0!3m2!1sen!2sin!4v1765172976077!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        `;
    });
}

// -----------------------------
// Auto active link
// -----------------------------

document.addEventListener("alpine:init", () => {
    Alpine.data("scrollSpy", () => ({
        active: null,
        init() {
            const sections = document.querySelectorAll("section");
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.active = entry.target.id;
                        }
                    });
                },
                { threshold: 0.6 }
            );
            sections.forEach((sec) => observer.observe(sec));
        }
    }));
});


// -----------------------------
// Fixed header based on scroll
// -----------------------------

document.addEventListener('alpine:init', () => {
    Alpine.store('sticky', {
        last: 0,
        active: false,
    });

    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        let current = window.scrollY;

        if (current > 150) {
            Alpine.store('sticky').active = current < Alpine.store('sticky').last;
            header.classList.toggle('fixed_header', Alpine.store('sticky').active);
        } else {
            Alpine.store('sticky').active = false;
            header.classList.remove('fixed_header');
        }

        Alpine.store('sticky').last = current;
    });
});