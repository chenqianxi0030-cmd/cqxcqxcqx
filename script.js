document.addEventListener("DOMContentLoaded", function () {
  const heroScroll = document.querySelector(".hero-scroll");
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const transitionText = document.querySelector(".transition-text");
  const doodles = document.querySelectorAll(".doodle");
  const scrollText = document.querySelector(".scroll-text");

  const dinnerVideo = document.getElementById("dinnerVideo");
  const videoChoices = document.getElementById("videoChoices");

  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");
  const chatMessages = document.getElementById("chatMessages");


  /* ===== HERO SCROLL ANIMATION ===== */

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function runHeroAnimation() {
    if (!heroScroll || !heroTitle || !transitionText) {
      return;
    }

    const rect = heroScroll.getBoundingClientRect();
    const totalScroll = Math.max(heroScroll.offsetHeight - window.innerHeight, 1);

    let progress = -rect.top / totalScroll;
    progress = clamp(progress, 0, 1);

    const isMobile = window.innerWidth <= 768;

    const titleMove = isMobile ? progress * 290 : progress * 470;
    const titleOpacity = clamp(1 - progress * 1.25, 0, 1);

    heroTitle.style.transform = `translate(-50%, calc(-50% + ${titleMove}px))`;
    heroTitle.style.opacity = titleOpacity;

    if (heroSubtitle) {
      if (isMobile) {
        heroSubtitle.style.opacity = 0;
      } else {
        heroSubtitle.style.opacity = clamp(1 - progress * 3, 0, 1);
      }
    }

    doodles.forEach(function (doodle) {
      const doodleOpacity = clamp(0.9 - progress * 1.15, 0, 0.9);
      doodle.style.opacity = doodleOpacity;
    });

    if (scrollText) {
      scrollText.style.opacity = clamp(1 - progress * 4, 0, 1);
    }

    if (isMobile) {
      if (progress < 0.16) {
        transitionText.style.opacity = 0;
        transitionText.style.transform = "translate(-50%, 55px)";
      }

      else if (progress >= 0.16 && progress < 0.32) {
        const appearProgress = (progress - 0.16) / 0.16;

        transitionText.style.opacity = appearProgress;
        transitionText.style.transform = "translate(-50%, -50%)";
      }

      else if (progress >= 0.32 && progress < 0.96) {
        transitionText.style.opacity = 1;
        transitionText.style.transform = "translate(-50%, -50%)";
      }

      else {
        const disappearProgress = (progress - 0.96) / 0.04;

        transitionText.style.opacity = clamp(1 - disappearProgress, 0, 1);
        transitionText.style.transform = `translate(-50%, calc(-50% + ${disappearProgress * 70}px))`;
      }
    }

    else {
      if (progress < 0.14) {
        transitionText.style.opacity = 0;
        transitionText.style.transform = "translate(-50%, 50px)";
      }

      else if (progress >= 0.14 && progress < 0.28) {
        const appearProgress = (progress - 0.14) / 0.14;

        transitionText.style.opacity = appearProgress;
        transitionText.style.transform = "translate(-50%, -50%)";
      }

      else if (progress >= 0.28 && progress < 0.96) {
        transitionText.style.opacity = 1;
        transitionText.style.transform = "translate(-50%, -50%)";
      }

      else {
        const disappearProgress = (progress - 0.96) / 0.04;

        transitionText.style.opacity = clamp(1 - disappearProgress, 0, 1);
        transitionText.style.transform = `translate(-50%, calc(-50% + ${disappearProgress * 90}px))`;
      }
    }
  }

  window.addEventListener("scroll", runHeroAnimation);
  window.addEventListener("resize", runHeroAnimation);
  runHeroAnimation();


  /* ===== INTERACTIVE VIDEO ===== */

  if (dinnerVideo && videoChoices) {
    videoChoices.style.display = "none";

    dinnerVideo.addEventListener("ended", function () {
      const currentVideoName = dinnerVideo.currentSrc.split("/").pop();

      if (currentVideoName === "video1.mp4") {
        videoChoices.style.display = "flex";
      } else {
        videoChoices.style.display = "none";
      }
    });
  }


  /* ===== DINNERBOT CHATBOT ===== */

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


/* ===== VIDEO BUTTON FUNCTIONS ===== */

function playDinnerVideo(videoPath) {
  const dinnerVideo = document.getElementById("dinnerVideo");
  const videoChoices = document.getElementById("videoChoices");

  if (!dinnerVideo) {
    return;
  }

  dinnerVideo.pause();

  const source = dinnerVideo.querySelector("source");

  if (source) {
    source.src = videoPath;
    dinnerVideo.removeAttribute("src");
  } else {
    dinnerVideo.src = videoPath;
  }

  dinnerVideo.load();

  dinnerVideo.addEventListener(
    "loadedmetadata",
    function () {
      dinnerVideo.currentTime = 0;

      const playPromise = dinnerVideo.play();

      if (playPromise !== undefined) {
        playPromise.catch(function () {
          console.log("Autoplay was blocked. Please press play manually.");
        });
      }
    },
    { once: true }
  );

  if (videoChoices) {
    videoChoices.style.display = "none";
  }
}

function changeVideo(videoPath) {
  playDinnerVideo(videoPath);
}

function restartVideo() {
  playDinnerVideo("video1.mp4");
}
