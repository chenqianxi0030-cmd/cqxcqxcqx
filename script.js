document.addEventListener("DOMContentLoaded", function () {
  const heroScroll = document.querySelector(".hero-scroll");
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const transitionText = document.querySelector(".transition-text");
  const doodles = document.querySelectorAll(".doodle");
  const scrollText = document.querySelector(".scroll-text");

  const dinnerVideo = document.getElementById("dinnerVideo");
  const videoChoices = document.getElementById("videoChoices");
  const videoError = document.getElementById("videoError");

  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");
  const chatMessages = document.getElementById("chatMessages");

  function handleHeroScroll() {
    if (!heroScroll || !heroTitle || !heroSubtitle || !transitionText) {
      return;
    }

    const rect = heroScroll.getBoundingClientRect();
    const totalScroll = heroScroll.offsetHeight - window.innerHeight;

    let progress = -rect.top / totalScroll;

    if (progress < 0) {
      progress = 0;
    }

    if (progress > 1) {
      progress = 1;
    }

    const titleMove = progress * 520;
    let titleOpacity = 1 - progress * 1.45;

    if (titleOpacity < 0) {
      titleOpacity = 0;
    }

    heroTitle.style.transform = `translate(-50%, calc(-50% + ${titleMove}px))`;
    heroTitle.style.opacity = titleOpacity;

    let subtitleOpacity = 1 - progress * 3.2;

    if (subtitleOpacity < 0) {
      subtitleOpacity = 0;
    }

    heroSubtitle.style.opacity = subtitleOpacity;

    doodles.forEach(function (doodle) {
      let doodleOpacity = 0.9 - progress * 1.25;

      if (doodleOpacity < 0) {
        doodleOpacity = 0;
      }

      doodle.style.opacity = doodleOpacity;
    });

    if (scrollText) {
      let scrollOpacity = 1 - progress * 5;

      if (scrollOpacity < 0) {
        scrollOpacity = 0;
      }

      scrollText.style.opacity = scrollOpacity;
    }

    if (progress < 0.15) {
      transitionText.style.opacity = 0;
      transitionText.style.transform = "translate(-50%, 40px)";
    }

    else if (progress >= 0.15 && progress < 0.28) {
      const appearProgress = (progress - 0.15) / 0.13;

      transitionText.style.opacity = appearProgress;
      transitionText.style.transform = `translate(-50%, ${40 - appearProgress * 90}px)`;
    }

    else if (progress >= 0.28 && progress < 0.76) {
      transitionText.style.opacity = 1;
      transitionText.style.transform = "translate(-50%, -50%)";
    }

    else {
      const disappearProgress = (progress - 0.76) / 0.24;

      transitionText.style.opacity = 1 - disappearProgress;
      transitionText.style.transform = `translate(-50%, calc(-50% + ${disappearProgress * 160}px))`;
    }
  }

  window.addEventListener("scroll", handleHeroScroll);
  window.addEventListener("resize", handleHeroScroll);
  handleHeroScroll();

  if (dinnerVideo && videoChoices) {
    dinnerVideo.addEventListener("ended", function () {
      videoChoices.style.display = "flex";
    });

    dinnerVideo.addEventListener("error", function () {
      if (videoError) {
        videoError.style.display = "block";
      }
    });

    dinnerVideo.addEventListener("loadedmetadata", function () {
      if (videoError) {
        videoError.style.display = "none";
      }
    });
  }

  if (sendBtn && userInput && chatMessages) {
    sendBtn.addEventListener("click", sendDinnerMessage);

    userInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        sendDinnerMessage();
      }
    });
  }

  function sendDinnerMessage() {
    const userText = userInput.value.trim();

    if (userText === "") {
      return;
    }

    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = userText;
    chatMessages.appendChild(userMessage);

    const botReply = getDinnerReply(userText);

    setTimeout(function () {
      const botMessage = document.createElement("div");
      botMessage.className = "message bot";
      botMessage.textContent = botReply;
      chatMessages.appendChild(botMessage);

      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 400);

    userInput.value = "";
  }

  function getDinnerReply(text) {
    const message = text.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! Tell me your mood, budget, or craving, and I will help you choose dinner.";
    }

    if (message.includes("what can you do")) {
      return "I can recommend dinner based on your mood, budget, food preference, and cravings.";
    }

    if (message.includes("cheap") || message.includes("budget")) {
      return "For a cheap dinner, I recommend egg fried rice, chicken rice, noodles, or a simple takeaway meal.";
    }

    if (message.includes("spicy")) {
      return "You could try tteokbokki, mala, hotpot, spicy ramen, or Korean spicy noodles.";
    }

    if (message.includes("tteokbokki")) {
      return "Tteokbokki is a great choice if you want something spicy, chewy, and comforting.";
    }

    if (message.includes("egg fried rice")) {
      return "Egg fried rice is simple, filling, and affordable. It is a good comfort food choice.";
    }

    if (message.includes("healthy")) {
      return "For a healthy dinner, try salad, grilled chicken, soup, poke bowl, or a vegetable rice bowl.";
    }

    if (message.includes("noodle") || message.includes("noodles")) {
      return "Noodles are a good choice. You could try ramen, pho, laksa, beef noodles, or spicy Korean noodles.";
    }

    if (message.includes("rice")) {
      return "Rice dishes are filling. You could try egg fried rice, curry rice, chicken rice, bibimbap, or nasi lemak.";
    }

    if (message.includes("korean")) {
      return "For Korean food, I recommend tteokbokki, bibimbap, kimchi stew, Korean fried chicken, or spicy noodles.";
    }

    if (message.includes("japanese")) {
      return "For Japanese food, you could try ramen, curry rice, udon, sushi, or donburi.";
    }

    if (message.includes("chinese")) {
      return "For Chinese food, you could try fried rice, dumplings, noodles, hotpot, or stir-fried dishes.";
    }

    if (message.includes("fast food")) {
      return "Fast food is good when you want something quick. You could choose burgers, fried chicken, fries, or wraps.";
    }

    if (message.includes("dessert") || message.includes("sweet")) {
      return "If you want something sweet after dinner, try cake, ice cream, waffles, or bubble tea.";
    }

    if (message.includes("alone")) {
      return "If you are eating alone, choose something simple and comforting, like ramen, fried rice, or a rice bowl.";
    }

    if (message.includes("friends")) {
      return "If you are eating with friends, hotpot, Korean BBQ, pizza, or shared dishes would be fun.";
    }

    if (message.includes("takeaway") || message.includes("take away")) {
      return "For takeaway, choose food that travels well, such as fried rice, burgers, noodles, or chicken rice.";
    }

    if (message.includes("dine in")) {
      return "For dine-in, you can choose hotpot, ramen, Korean food, or anything that tastes better fresh.";
    }

    if (message.includes("warm")) {
      return "If you want something warm, try soup noodles, hotpot, ramen, curry rice, or kimchi stew.";
    }

    if (message.includes("light")) {
      return "For a light dinner, try salad, soup, sushi, fruit bowl, or grilled vegetables.";
    }

    if (message.includes("very hungry")) {
      return "If you are very hungry, choose something filling like fried rice, ramen, burger set, hotpot, or curry rice.";
    }

    if (message.includes("not hungry")) {
      return "If you are not very hungry, choose something small like soup, toast, sushi, salad, or dessert.";
    }

    if (message.includes("random")) {
      return "Random choice: try tteokbokki tonight! It is spicy, fun, and perfect for dinner.";
    }

    if (message.includes("what should i eat") || message.includes("don't know") || message.includes("dont know")) {
      return "If you cannot decide, I suggest choosing between noodles, rice, something spicy, or something light.";
    }

    if (message.includes("bye")) {
      return "Goodbye! I hope you enjoy your dinner.";
    }

    return "I am not sure yet. Try asking about cheap food, spicy food, healthy food, noodles, rice, Korean food, or dinner ideas.";
  }
});

function changeVideo(videoPath) {
  const dinnerVideo = document.getElementById("dinnerVideo");
  const videoChoices = document.getElementById("videoChoices");
  const videoError = document.getElementById("videoError");

  if (videoError) {
    videoError.style.display = "none";
  }

  dinnerVideo.src = videoPath;
  dinnerVideo.load();

  const playPromise = dinnerVideo.play();

  if (playPromise !== undefined) {
    playPromise.catch(function () {
      console.log("Video autoplay was blocked. Please click play.");
    });
  }

  videoChoices.style.display = "none";
}

function restartVideo() {
  const dinnerVideo = document.getElementById("dinnerVideo");
  const videoChoices = document.getElementById("videoChoices");
  const videoError = document.getElementById("videoError");

  if (videoError) {
    videoError.style.display = "none";
  }

  dinnerVideo.src = "./videos/video1.mp4";
  dinnerVideo.load();

  const playPromise = dinnerVideo.play();

  if (playPromise !== undefined) {
    playPromise.catch(function () {
      console.log("Video autoplay was blocked. Please click play.");
    });
  }

  videoChoices.style.display = "none";
}
