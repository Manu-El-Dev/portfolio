export class HeroCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);

        if (!this.container) {
            return;
        }

        this.slides = [
            {
                tag: "GUÍA TÉCNICA",
                title: "Curso de Electricidad & Sistemas",
                description:
                    "Instalaciones eléctricas, cuadros de protección, magnetotérmicos y fotovoltaica.",
                actionText: "Explorar Guía →",
                actionUrl: "#laboratorio"
            },
            {
                tag: "SEGURIDAD INDUSTRIAL",
                title: "PRL: Construcción, Altura y Carpintería",
                description:
                    "Módulos de prevención de riesgos específicos para entornos técnicos y de obra.",
                actionText: "Ver Documentación →",
                actionUrl: "#laboratorio"
            },
            {
                tag: "NORMATIVA",
                title: "Guía Examen Teórico DGT",
                description:
                    "Tiempos de reacción, factores físicos y manual 'Aprender a conducir'.",
                actionText: "Revisar Test →",
                actionUrl: "#laboratorio"
            },
            {
                tag: "PROYECTO ESTRELLA",
                title: "TécnicoLab — Cuaderno Técnico",
                description:
                    "Plataforma modular de desarrollo, esquemas y arquitectura limpia.",
                actionText: "Ver Proyecto →",
                actionUrl: "#proyectos"
            }
        ];

        this.currentIndex = 0;
        this.interval = null;

        this.init();
    }

    init() {
        this.render();
        this.startAutoPlay();
    }

    render() {
        this.container.innerHTML = `
            <div class="hero-slider-wrapper">

                <div class="hero-cards-track">

                    ${this.slides
                        .map(
                            (slide, index) => `
                                <article
                                    class="hero-mini-card ${
                                        index === this.currentIndex
                                            ? "active"
                                            : ""
                                    }"
                                    data-index="${index}"
                                >

                                    <span class="mini-card-tag">
                                        ${slide.tag}
                                    </span>

                                    <h3 class="mini-card-title">
                                        ${slide.title}
                                    </h3>

                                    <p class="mini-card-desc">
                                        ${slide.description}
                                    </p>

                                    <a
                                        href="${slide.actionUrl}"
                                        class="mini-card-link"
                                    >
                                        ${slide.actionText}
                                    </a>

                                </article>
                            `
                        )
                        .join("")}

                </div>


                <div
                    class="carousel-indicators"
                    role="tablist"
                    aria-label="Navegación del carrusel"
                >

                    ${this.slides
                        .map(
                            (slide, index) => `
                                <button
                                    class="indicator-dot ${
                                        index === this.currentIndex
                                            ? "active"
                                            : ""
                                    }"
                                    type="button"
                                    data-index="${index}"
                                    role="tab"
                                    aria-selected="${
                                        index === this.currentIndex
                                    }"
                                    aria-label="Mostrar ${slide.title}"
                                ></button>
                            `
                        )
                        .join("")}

                </div>

            </div>
        `;

        this.attachEvents();
    }

    nextSlide() {
        this.currentIndex =
            (this.currentIndex + 1) % this.slides.length;

        this.update();
    }

    goToSlide(index) {
        if (
            index < 0 ||
            index >= this.slides.length
        ) {
            return;
        }

        this.currentIndex = index;

        this.update();
    }

    update() {
        const cards =
            this.container.querySelectorAll(
                ".hero-mini-card"
            );

        const indicators =
            this.container.querySelectorAll(
                ".indicator-dot"
            );

        cards.forEach((card, index) => {
            card.classList.toggle(
                "active",
                index === this.currentIndex
            );
        });

        indicators.forEach((indicator, index) => {
            const isActive =
                index === this.currentIndex;

            indicator.classList.toggle(
                "active",
                isActive
            );

            indicator.setAttribute(
                "aria-selected",
                String(isActive)
            );
        });
    }

    startAutoPlay() {
        this.stopAutoPlay();

        this.interval = setInterval(() => {
            this.nextSlide();
        }, 6000);
    }

    stopAutoPlay() {
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    attachEvents() {
        const cards =
            this.container.querySelectorAll(
                ".hero-mini-card"
            );

        cards.forEach((card) => {

            card.addEventListener(
                "mouseenter",
                () => {
                    this.stopAutoPlay();

                    const index = Number(
                        card.dataset.index
                    );

                    this.goToSlide(index);
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {
                    this.startAutoPlay();
                }
            );
        });


        const indicators =
            this.container.querySelectorAll(
                ".indicator-dot"
            );

        indicators.forEach((indicator) => {

            indicator.addEventListener(
                "click",
                () => {

                    const index = Number(
                        indicator.dataset.index
                    );

                    this.goToSlide(index);
                    this.startAutoPlay();
                }
            );

        });
    }
}