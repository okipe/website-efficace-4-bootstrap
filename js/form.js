const quizData = {
    questions: [
        {
            id: 1,
            text: "¿Puedes describir tu perfil profesional?",
            options: [
                {
                    text: "No tengo claridad aún sobre mi perfil.",
                    score: 1,
                },
                {
                    text: "Tengo algunas ideas, pero me cuesta definirlo con seguridad.",
                    score: 3,
                },
                {
                    text: "Tengo claridad sobre mi perfil, sé mis fortalezas y hacia dónde quiero ir.",
                    score: 6,
                },
            ],
            weight: 1,
        },
        {
            id: 2,
            text: "¿Cuál es tu nivel de experiencia laboral?",
            options: [
                { text: "No tengo experiencia laboral aún.", score: 1 },
                {
                    text: "He realizado prácticas pre-profesionales o voluntariados.",
                    score: 3,
                },
                {
                    text: "Tengo experiencia laboral formal o empleo a tiempo completo.",
                    score: 6,
                },
            ],
            weight: 1,
        },
        {
            id: 3,
            text: "¿Qué tan actualizado y estratégico está tu CV?",
            options: [
                { text: "No tengo un CV actualizado.", score: 1 },
                {
                    text: "Tengo un CV básico, sin muchos logros o diferenciadores.",
                    score: 3,
                },
                {
                    text: "Tengo un CV adaptado, enfocado en logros y con una buena presentación.",
                    score: 6,
                },
            ],
            weight: 1,
        },
        {
            id: 4,
            text: "¿Tu perfil de LinkedIn refleja bien quién eres como profesional?",
            options: [
                {
                    text: "No tengo perfil de LinkedIn.",
                    score: 1,
                },
                {
                    text: "Tengo un perfil, pero no lo uso ni lo he optimizado.",
                    score: 3,
                },
                {
                    text: "Mi perfil está completo, activo y con publicaciones o recomendaciones.",
                    score: 6,
                },
            ],
            weight: 1,
        },
        {
            id: 5,
            text: "¿Transmites tu propuesta de valor en las entrevistas laborales?",
            options: [
                {
                    text: "No sé qué es una propuesta de valor. Me pongo muy nervioso/a y no sé qué decir.",
                    score: 1,
                },
                {
                    text: "Tengo algunas ideas, pero no sé cómo comunicarlo. Me falta estructurar mejor mis respuestas.",
                    score: 3,
                },
                {
                    text: "Me siento seguro/a, tengo ejemplos preparados y entiendo qué buscan.",
                    score: 6,
                },
            ],
            weight: 1,
        },
        {
            id: 6,
            text: "¿Cuántas entrevistas laborales has tenido últimamente?",
            options: [
                { text: "Ninguna.", score: 1 },
                { text: "1-3 entrevistas", score: 3 },
                { text: "Más de 3 entrevistas", score: 6 },
            ],
            weight: 1,
        },
        {
            id: 7,
            text: "¿Cuánto tiempo dedicas semanalmente a tu desarrollo profesional?",
            options: [
                { text: "Menos de 1 hora", score: 1 },
                { text: "Entre 1-3 horas", score: 3 },
                { text: "Más de 3 horas", score: 6 },
            ],
            weight: 1,
        },
    ],

    profiles: {
        beginner: {
            range: [0, 13],
            title: "Perfil Inicial – Estoy comenzando 🌱",
            description:
                "Estás iniciando tu camino profesional. Es el momento perfecto para construir bases sólidas y descubrir tu verdadero potencial.",
            recommendations: [
                "IN SIGHT SESSION: Descubre tu potencial desde adentro",
                "CV DE IMPACTO: Convierte tu CV en una herramienta de éxito",
                "SÚPER IN-TERVIEW: Destaca y domina las entrevistas laborales",
                "LINKEDIN PRO: Lidera tu marca personal con LinkedIn",
            ],
            services: [
                {
                    name: "IN SIGHT SESSION",
                    description: "Descubre tu potencial desde adentro",
                },
                {
                    name: "CV DE IMPACTO",
                    description: "Convierte tu CV en una herramienta de éxito",
                },
            ],
        },
        intermediate: {
            range: [14, 25],
            title: "Perfil Intermedio – Estoy en proceso de mejorar 🚀",
            description:
                "Tienes buenos fundamentos. Ahora es momento de enfocarte en destacar y llevar tu carrera al siguiente nivel.",
            recommendations: [
                "IN SIGHT SESSION: Descubre tu potencial desde adentro",
                "CV DE IMPACTO: Convierte tu CV en una herramienta de éxito",
                "SÚPER IN-TERVIEW: Destaca y domina las entrevistas laborales",
                "LINKEDIN PRO: Lidera tu marca personal con LinkedIn",
            ],
            services: [
                {
                    name: "SÚPER IN-TERVIEW",
                    description: "Destaca y domina las entrevistas laborales",
                },
                {
                    name: "LINKEDIN PRO",
                    description: "Lidera tu marca personal con LinkedIn",
                },
            ],
        },
        advanced: {
            range: [26, 42],
            title: "Perfil Avanzado – Estoy listo/a para destacar⭐",
            description:
                "¡Felicitaciones! Tienes una base sólida. Es momento de potenciar tu liderazgo y destacarte en el mercado laboral.",
            recommendations: [
                "Servicio exclusivo de outplacement y recolocación laboral",
                "Taller de coaching ejecutivo",
                "Estrategia de networking y liderazgo profesional",
            ],
            services: [
                {
                    name: "Outplacement y Recolocación",
                    description:
                        "Encuentra oportunidades alineadas a tu perfil",
                },
                {
                    name: "Coaching Ejecutivo",
                    description:
                        "Potencia tu liderazgo y posicionamiento profesional",
                },
            ],
        },
    },
};

let currentQuestion = 0;
let userAnswers = [];

function initQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    showQuestion();
    updateProgressBar();
}

function showQuestion() {
    const question = quizData.questions[currentQuestion];
    const container = document.getElementById("questionContainer");

    container.innerHTML = `
  <h3 class="mb-4">${question.text}</h3>
  <div class="options-container">
      ${question.options
          .map(
              (option, index) => `
          <button 
              class="btn btn-outline-primary w-100 mb-3 p-3 text-start rounded-pill option-btn"
              onclick="selectAnswer(${index})"
          >
              ${option.text}
          </button>
      `,
          )
          .join("")}
  </div>
`;
}

function selectAnswer(optionIndex) {
    const question = quizData.questions[currentQuestion];
    userAnswers.push({
        questionId: question.id,
        score: question.options[optionIndex].score,
        weight: question.weight,
    });

    if (currentQuestion < quizData.questions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgressBar();
    } else {
        showResults();
    }
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
    document.querySelector(".progress-bar").style.width = `${progress}%`;
}

function calculateScore() {
    const totalWeight = quizData.questions.reduce(
        (sum, q) => sum + q.weight,
        0,
    );
    const weightedScore = userAnswers.reduce((sum, answer) => {
        return sum + answer.score * answer.weight;
    }, 0);

    const maxPossibleScore = 6 * totalWeight; // 6 es max score por pregunta
    return (weightedScore / maxPossibleScore) * 100;
}

function getProfile(score) {
    const totalRawScore = userAnswers.reduce((sum, answer) => {
        return sum + answer.score;
    }, 0);

    // Determinar el perfil basado en la puntuación total (sin ponderación de porcentaje)
    if (totalRawScore <= 13) {
        return quizData.profiles.beginner;
    } else if (totalRawScore <= 25) {
        return quizData.profiles.intermediate;
    } else {
        return quizData.profiles.advanced;
    }
}

function showResults() {
    const score = calculateScore();
    const profile = getProfile(score);

    document.getElementById("questionContainer").classList.add("d-none");
    document.getElementById("resultsContainer").classList.remove("d-none");

    // Create score circle
    const scoreCircle = document.getElementById("scoreCircle");
    scoreCircle.innerHTML = `
  <div class="score-circle">
      <div class="score-number">${Math.round(score)}%</div>
      <div class="score-label">Nivel de Empleabilidad</div>
  </div>
`;

    // Show recommendations
    const recommendationsContainer = document.getElementById("recommendations");
    recommendationsContainer.innerHTML = `
  <div class="card mb-4">
      <div class="card-body">
          <h3 class="card-title">${profile.title}</h3>
          <p class="card-text">${profile.description}</p>
          
          <h4 class="mt-4">Recomendaciones Efficace:</h4>
          <ul class="list-group list-group-flush">
              ${profile.recommendations
                  .map(
                      (rec) => `
                  <li class="list-group-item">✨ ${rec}</li>
              `,
                  )
                  .join("")}
          </ul>
          
          <!--<h4 class="mt-4">Servicios recomendados:</h4>
          <div class="row">
              ${profile.services
                  .map(
                      (service) => `
                  <div class="col-md-6 mb-3">
                      <div class="card h-100">
                          <div class="card-body">
                              <h5 class="card-title">${service.name}</h5>
                              <p class="card-text">${service.description}</p>
                          </div>
                      </div>
                  </div>
              `,
                  )
                  .join("")}
          </div> -->
      </div>
  </div>
`;
}

function showContactForm() {
    // Redirigir a la ruta empleable
    window.open("https://wa.me/+51994348408", "_blank");
    $("#quizModal").modal("hide");
}

// Initialize quiz when modal is shown
document
    .getElementById("quizModal")
    .addEventListener("show.bs.modal", initQuiz);
