const quizData = {
    questions: [
        {
            id: 1,
            text: "¿Cuál es tu nivel de experiencia laboral?",
            options: [
                {
                    text: "Aún no tengo experiencia laboral",
                    score: 1,
                },
                {
                    text: "Tengo experiencia en prácticas pre-profesionales",
                    score: 2,
                },
                {
                    text: "Tengo experiencia laboral profesional",
                    score: 3,
                },
            ],
            weight: 1.5,
        },
        {
            id: 2,
            text: "¿Cómo calificarías tu presencia en LinkedIn?",
            options: [
                { text: "No tengo perfil de LinkedIn", score: 1 },
                { text: "Tengo un perfil básico", score: 2 },
                {
                    text: "Mi perfil está optimizado y actualizado regularmente",
                    score: 3,
                },
            ],
            weight: 1.2,
        },
        {
            id: 3,
            text: "¿Cuántas entrevistas laborales has tenido en los últimos 6 meses?",
            options: [
                { text: "Ninguna", score: 1 },
                { text: "1-3 entrevistas", score: 2 },
                { text: "Más de 3 entrevistas", score: 3 },
            ],
            weight: 1.0,
        },
        {
            id: 4,
            text: "¿Cómo describes tu CV actual?",
            options: [
                {
                    text: "Necesito actualizarlo/No tengo CV",
                    score: 1,
                },
                {
                    text: "Está actualizado pero podría mejorarse",
                    score: 2,
                },
                {
                    text: "Está optimizado y personalizado para cada postulación",
                    score: 3,
                },
            ],
            weight: 1.3,
        },
        {
            id: 5,
            text: "¿Cuánto tiempo dedicas semanalmente a tu desarrollo profesional?",
            options: [
                { text: "Menos de 1 hora", score: 1 },
                { text: "Entre 1-3 horas", score: 2 },
                { text: "Más de 3 horas", score: 3 },
            ],
            weight: 1.1,
        },
    ],

    profiles: {
        beginner: {
            range: [0, 60],
            title: "Profesional en Desarrollo 🌱",
            description:
                "Estás comenzando tu camino profesional. Es el momento perfecto para construir bases sólidas.",
            recommendations: [
                "Crea un perfil de LinkedIn optimizado",
                "Desarrolla un CV profesional",
                "Practica técnicas de entrevista",
            ],
            services: [
                {
                    name: "Optimización de CV",
                    description: "Crea un CV que destaque tu potencial",
                },
                {
                    name: "LinkedIn Power",
                    description: "Construye tu marca personal desde cero",
                },
            ],
        },
        intermediate: {
            range: [61, 80],
            title: "Profesional Emergente 🚀",
            description:
                "Tienes buenos fundamentos. Es momento de destacar entre la competencia.",
            recommendations: [
                "Optimiza tu presencia digital",
                "Desarrolla habilidades de networking",
                "Mejora tus técnicas de entrevista",
            ],
            services: [
                {
                    name: "Training de Entrevistas",
                    description: "Domina el arte de las entrevistas laborales",
                },
                {
                    name: "LinkedIn Advanced",
                    description: "Lleva tu perfil al siguiente nivel",
                },
            ],
        },
        advanced: {
            range: [81, 100],
            title: "Profesional Destacado ⭐",
            description:
                "¡Felicitaciones! Tienes una base sólida. Enfócate en especializarte y destacar aún más.",
            recommendations: [
                "Desarrolla tu liderazgo",
                "Crea contenido profesional",
                "Amplía tu red de contactos",
            ],
            services: [
                {
                    name: "Personal Branding",
                    description: "Construye una marca personal poderosa",
                },
                {
                    name: "Mentoring Profesional",
                    description:
                        "Recibe guía personalizada para tu crecimiento",
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
      `
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
        0
    );
    const weightedScore = userAnswers.reduce((sum, answer) => {
        return sum + answer.score * answer.weight;
    }, 0);

    const maxPossibleScore = 3 * totalWeight; // 3 is max score per question
    return (weightedScore / maxPossibleScore) * 100;
}

function getProfile(score) {
    return Object.values(quizData.profiles).find(
        (profile) => score >= profile.range[0] && score <= profile.range[1]
    );
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
          
          <h4 class="mt-4">Recomendaciones principales:</h4>
          <ul class="list-group list-group-flush">
              ${profile.recommendations
                  .map(
                      (rec) => `
                  <li class="list-group-item">✨ ${rec}</li>
              `
                  )
                  .join("")}
          </ul>
          
          <h4 class="mt-4">Servicios recomendados:</h4>
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
              `
                  )
                  .join("")}
          </div>
      </div>
  </div>
`;
}

function showContactForm() {
    // Aquí puedes redirigir al formulario de contacto o mostrar un modal
    window.location.href = "#contacto";
    $("#quizModal").modal("hide");
}

// Initialize quiz when modal is shown
document
    .getElementById("quizModal")
    .addEventListener("show.bs.modal", initQuiz);
