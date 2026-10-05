const hugButton = document.querySelector("#hug-button");
const hugOptions = document.querySelector("#hug-options");
const hugMessage = document.querySelector("#hug-message");
const repellamiento = document.querySelector("#repellamiento");
const torticulis = document.querySelector("#torticulis");
const apretamiento = document.querySelector("#apretamiento");
const besistos = document.querySelector("#besistos");
const dragonBreath = document.querySelector("#dragon-breath");
const hugChoices = [repellamiento, torticulis, apretamiento, besistos, dragonBreath];
const bookingActions = document.querySelector("#booking-actions");
const bookingButton = document.querySelector("#booking-button");
const hugSelection = document.querySelector("#hug-selection");
const schedule = document.querySelector("#schedule");
const signoff = document.querySelector(".signoff");
const hugDay = document.querySelector("#hug-day");
const hugTime = document.querySelector("#hug-time");
const scheduleConfirm = document.querySelector("#schedule-confirm");
const scheduleConfirmation = document.querySelector("#schedule-confirmation");
const choiceMessages = {
  repellamiento: "Ufff pensé que me iba a quedar sin arrecostarte el pipito",
  torticulis: "Esos abrazos son los mejores... mejores dolores de cuellos",
  apretamiento: "Estás acabando popinnnn, toda una popin atrevida.",
  besistos: "Esa opción te sacará una sonrisa en el momento... siempre lo hace",
  "dragon-breath": "¡Dracarys!",
};
let selectedChoiceOrder = [];
let messageTransition;
let scheduleCountdown;
let reminderTimer;
let reminderShown = false;
const messageTransitionDuration = 180;
const impatientMessage = "dale!! marca algo popin me tienes impaciente, no puede ser un abrazo pelado";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", () => {
  window.clearTimeout(messageTransition);
  window.clearInterval(scheduleCountdown);
  window.clearTimeout(reminderTimer);
  selectedChoiceOrder = [];
  reminderShown = false;
  hugButton.hidden = false;
  hugButton.setAttribute("aria-expanded", "false");
  hugOptions.hidden = true;
  bookingActions.hidden = true;
  hugChoices.forEach((choice) => {
    choice.checked = false;
  });
  bookingButton.disabled = true;
  hugMessage.hidden = true;
  hugMessage.textContent = "";
  hugMessage.classList.remove("hug__message--visible");
  schedule.hidden = true;
  scheduleConfirmation.hidden = true;
  scheduleConfirm.disabled = false;
  hugSelection.inert = false;
  hugSelection.setAttribute("aria-disabled", "false");
  hugSelection.classList.remove("hug__selection--disabled");
  window.scrollTo(0, 0);
});

hugButton.addEventListener("click", () => {
  hugButton.hidden = true;
  hugButton.setAttribute("aria-expanded", "true");
  hugOptions.hidden = false;
  bookingActions.hidden = false;
  reminderTimer = window.setTimeout(() => {
    if (hugChoices.every((choice) => !choice.checked)) {
      reminderShown = true;
      showMessage(impatientMessage);
    }
  }, 3000);
  hugSelection.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

function showMessage(message) {
  window.clearTimeout(messageTransition);

  if (hugMessage.hidden) {
    hugMessage.textContent = message;
    hugMessage.hidden = false;
    window.requestAnimationFrame(() => hugMessage.classList.add("hug__message--visible"));
    return;
  }

  if (hugMessage.textContent === message) {
    hugMessage.classList.add("hug__message--visible");
    return;
  }

  hugMessage.classList.remove("hug__message--visible");
  messageTransition = window.setTimeout(() => {
    hugMessage.textContent = message;
    hugMessage.classList.add("hug__message--visible");
  }, messageTransitionDuration);
}

function hideMessage() {
  window.clearTimeout(messageTransition);
  hugMessage.classList.remove("hug__message--visible");
  messageTransition = window.setTimeout(() => {
    hugMessage.hidden = true;
    hugMessage.textContent = "";
  }, messageTransitionDuration);
}

function updateHugMessage(event) {
  const changedChoice = event.currentTarget;
  selectedChoiceOrder = selectedChoiceOrder.filter((choice) => choice !== changedChoice);
  if (changedChoice.checked) {
    selectedChoiceOrder.push(changedChoice);
  }
  const allChoicesSelected = hugChoices.every((choice) => choice.checked);
  bookingButton.disabled = !allChoicesSelected;

  const activeChoice = [...selectedChoiceOrder].reverse().find((choice) => choice.checked);
  if (repellamiento.checked && torticulis.checked) {
    showMessage("ufff pense que me iba a quedar sin arrecostarte el pipito");
  } else if (!repellamiento.checked && torticulis.checked) {
    showMessage("Estoy bravo contigo, no quieres que te repelle el pipito");
  } else if (repellamiento.checked && !torticulis.checked) {
    showMessage("te salvaste de la totriculis severa que provocan mis abracitos");
  } else if (activeChoice) {
    showMessage(choiceMessages[activeChoice.id]);
  } else if (reminderShown) {
    showMessage(impatientMessage);
  } else {
    hideMessage();
  }
}

hugChoices.forEach((choice) => choice.addEventListener("change", updateHugMessage));

for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
  const hour = String(Math.floor(minutes / 60)).padStart(2, "0");
  const minute = String(minutes % 60).padStart(2, "0");
  const option = document.createElement("option");
  option.value = `${hour}:${minute}`;
  option.textContent = option.value;
  hugTime.append(option);
}

bookingButton.addEventListener("click", () => {
  if (!bookingButton.disabled) {
    schedule.hidden = false;
    scheduleConfirmation.hidden = true;
    hugSelection.inert = true;
    hugSelection.setAttribute("aria-disabled", "true");
    hugSelection.classList.add("hug__selection--disabled");
    const signoffBounds = signoff.getBoundingClientRect();
    const signoffTop = window.scrollY + signoffBounds.top;
    const centeredScrollTop = signoffTop - (window.innerHeight - signoffBounds.height) / 2;
    window.scrollTo({ top: centeredScrollTop, behavior: "instant" });
  }
});

scheduleConfirm.addEventListener("click", () => {
  const dayLabels = ["hoy", "mañana", "pasado mañana"];
  const selectedDay = dayLabels[Number(hugDay.value)];
  const message = `Popin, quiero agendar mi abrazo para ${selectedDay} a las ${hugTime.value}.`;
  const whatsappUrl = `https://wa.me/5355210171?text=${encodeURIComponent(message)}`;
  let secondsRemaining = 3;
  scheduleConfirmation.textContent = `Agendar cita en ${secondsRemaining}`;
  scheduleConfirmation.hidden = false;
  scheduleConfirm.disabled = true;
  scheduleCountdown = window.setInterval(() => {
    secondsRemaining -= 1;
    scheduleConfirmation.textContent = `Agendar cita en ${secondsRemaining}`;
    if (secondsRemaining === 0) {
      window.clearInterval(scheduleCountdown);
      window.location.href = whatsappUrl;
    }
  }, 1000);
});