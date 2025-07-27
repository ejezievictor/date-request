let noClickCount = 0;
let currentQuestion = 1;

// Track all responses for email
let responseData = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    responses: [],
    finalAnswer: '',
    sessionId: 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
};

// Hide all questions except the first one
function hideAllQuestions() {
    const questions = document.querySelectorAll('.question-container');
    questions.forEach(q => q.classList.add('hidden'));
}

// Show specific question
function showQuestion(questionId) {
    hideAllQuestions();
    document.getElementById(questionId).classList.remove('hidden');
}

// Go to Question 2
function goToQuestion2() {
    // Track the response
    responseData.responses.push({
        question: 1,
        questionText: "My Queen 👑, shall we bless the world with our royal presence this weekend?",
        answer: "No",
        timestamp: new Date().toISOString()
    });

    currentQuestion = 2;
    showQuestion('question2');
    setupMovingNoButton();
}

// Go to Question 3
function goToQuestion3() {
    // Track the response if coming from Question 2 moving button
    if (currentQuestion === 2) {
        responseData.responses.push({
            question: 2,
            questionText: "Your King is requesting your royal company… don't keep him waiting 😌",
            answer: "No (tried to click/hover but button moved)",
            timestamp: new Date().toISOString()
        });
    }

    currentQuestion = 3;
    showQuestion('question3');
}

// Go to Question 4
function goToQuestion4() {
    // Track the response
    responseData.responses.push({
        question: 3,
        questionText: "You can't resist me forever, my Queen… even the stars are rooting for this date ✨😉",
        answer: "No",
        timestamp: new Date().toISOString()
    });

    currentQuestion = 4;
    showQuestion('question4');
}

// Global variable to track moving button state
let movingNoCount = 0;

// Handle the moving No button clicks
function handleMovingNo() {
    const movingNo = document.getElementById('movingNo');
    movingNoCount++;

    if (movingNoCount < 3) {
        // Move the button to a random position
        moveButtonRandomly(movingNo);

        // Change button text to be more playful
        if (movingNoCount === 1) {
            movingNo.innerHTML = "Wait, come back! 😅";
        } else if (movingNoCount === 2) {
            movingNo.innerHTML = "You can't escape! 😏";
        }
    } else {
        // After 3 attempts, go to question 3
        goToQuestion3();
    }
}

// Move button to random position
function moveButtonRandomly(button) {
    const container = button.parentElement;
    const containerRect = container.getBoundingClientRect();

    // Get random position within container bounds
    const maxX = Math.max(0, containerRect.width - 200); // Account for button width
    const maxY = Math.max(0, containerRect.height - 60); // Account for button height

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.transform = 'scale(0.9)';

    // Add a little bounce animation
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Setup the moving No button for Question 2
function setupMovingNoButton() {
    const movingNo = document.getElementById('movingNo');
    if (!movingNo) return;

    // Reset the counter when setting up
    movingNoCount = 0;

    // Reset button position and text
    movingNo.style.position = 'relative';
    movingNo.style.left = 'auto';
    movingNo.style.top = 'auto';
    movingNo.innerHTML = "No";

    // Add hover effect to make it move
    movingNo.addEventListener('mouseenter', function() {
        if (movingNoCount < 2) {
            moveButtonRandomly(this);
            movingNoCount++;

            if (movingNoCount === 1) {
                this.innerHTML = "Hey, no hovering! 😆";
            } else if (movingNoCount === 2) {
                this.innerHTML = "Nice try! 😉";
                // After 2 hover attempts, go to next question
                setTimeout(() => {
                    goToQuestion3();
                }, 1500);
            }
        }
    });
}

// Go to final screen
function goToFinal() {
    // Track the "Yes" response
    let questionText = "";
    switch(currentQuestion) {
        case 1:
            questionText = "My Queen 👑, shall we bless the world with our royal presence this weekend?";
            break;
        case 2:
            questionText = "Your King is requesting your royal company… don't keep him waiting 😌";
            break;
        case 3:
            questionText = "You can't resist me forever, my Queen… even the stars are rooting for this date ✨😉";
            break;
        case 4:
            questionText = "Be honest… you've already picked an outfit in your head, haven't you? 😏";
            break;
    }

    responseData.responses.push({
        question: currentQuestion,
        questionText: questionText,
        answer: "Yes",
        timestamp: new Date().toISOString()
    });

    // Play sound effect
    const sound = document.getElementById('yesSound');
    if (sound) {
        sound.play().catch(e => console.log('Audio play failed:', e));
    }
    
    showQuestion('finalScreen');

    // Add heart animation to the container
    const container = document.querySelector('.container');
    container.classList.add('heart-animation');

    // Show the final animation after a short delay
    setTimeout(() => {
        showFinalAnimation();
    }, 1500);

    // Show follow-up question after animation
    setTimeout(() => {
        showFollowUpQuestion();
    }, 5000);
}

// Show the final king and queen animation
function showFinalAnimation() {
    const animationContainer = document.getElementById('animationContainer');

    // Create the 3D animation HTML
    animationContainer.innerHTML = `
        <div class="king-queen-animation">
            <div class="character king">
                <div class="king-3d">
                    <div class="king-head"></div>
                    <div class="king-crown"></div>
                    <div class="king-body"></div>
                    <div class="king-arms king-arm-left"></div>
                    <div class="king-arms king-arm-right"></div>
                    <div class="king-legs king-leg-left"></div>
                    <div class="king-legs king-leg-right"></div>
                </div>
            </div>
            <div class="character queen">
                <div class="queen-3d">
                    <div class="queen-head"></div>
                    <div class="queen-hair"></div>
                    <div class="queen-crown"></div>
                    <div class="queen-body"></div>
                    <div class="queen-arms queen-arm-left"></div>
                    <div class="queen-arms queen-arm-right"></div>
                    <div class="queen-dress-bottom"></div>
                </div>
            </div>
        </div>
    `;

    // Start kissing animation immediately
    setTimeout(() => {
        const queen = animationContainer.querySelector('.queen');
        const king = animationContainer.querySelector('.king');
        const kingQueenAnimation = animationContainer.querySelector('.king-queen-animation');

        // Add romantic glow effect
        const romanticGlow = document.createElement('div');
        romanticGlow.className = 'romantic-glow';
        kingQueenAnimation.appendChild(romanticGlow);

        // Add floating hearts during the kiss
        startKissingHearts(kingQueenAnimation);

    }, 500);

    // Add some sparkle effects
    setTimeout(() => {
        addSparkleEffect();
    }, 3000);
}

// Add sparkle effect
function addSparkleEffect() {
    const animationContainer = document.getElementById('animationContainer');

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '2rem';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = 'fadeIn 0.5s ease-in-out, float 2s ease-in-out infinite';
            sparkle.style.pointerEvents = 'none';

            animationContainer.appendChild(sparkle);

            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }, i * 200);
    }
}

// Create floating hearts during kissing
function startKissingHearts(container) {
    let heartCount = 0;
    const maxHearts = 15;

    const heartInterval = setInterval(() => {
        if (heartCount >= maxHearts) {
            clearInterval(heartInterval);
            return;
        }

        const heart = document.createElement('div');
        heart.className = 'kiss-heart';
        heart.innerHTML = ['💖', '💕', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)];

        // Position hearts around the kissing couple
        const centerX = 50; // Center of the animation
        const centerY = 60; // Slightly below center
        const radius = 30; // Radius around the couple

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;

        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        heart.style.left = x + '%';
        heart.style.top = y + '%';

        container.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);

        heartCount++;
    }, 300);
}

// Add some interactive effects on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add click effect to floating elements
    const floatingElements = document.querySelectorAll('.floating-elements div');
    floatingElements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.animation = 'heartBeat 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = 'float 6s ease-in-out infinite';
            }, 500);
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('moving-btn')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// Add keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        // Only respond to keyboard on question screens, not final screens
        const questionScreens = ['question1', 'question2', 'question3', 'question4'];
        const currentScreen = questionScreens.find(id => {
            const element = document.getElementById(id);
            return element && !element.classList.contains('hidden');
        });

        if (currentScreen) {
            goToFinal();
        }

        // Handle Enter key for follow-up input
        if (e.key === 'Enter') {
            const followUpScreen = document.getElementById('followUpScreen');
            if (followUpScreen && !followUpScreen.classList.contains('hidden')) {
                handleQueenResponse();
            }
        }
    }
});

// Prevent right-click context menu for a more immersive experience
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Show the follow-up question
function showFollowUpQuestion() {
    showQuestion('followUpScreen');

    // Focus on the input field
    setTimeout(() => {
        const input = document.getElementById('queenResponse');
        if (input) {
            input.focus();
        }
    }, 500);
}

// Handle the Queen's response
function handleQueenResponse() {
    const input = document.getElementById('queenResponse');
    const response = input.value.trim();

    if (response === '') {
        // Shake the input if empty
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
        return;
    }

    // Store the final answer
    responseData.finalAnswer = response;
    responseData.responses.push({
        question: "Follow-up",
        questionText: "Do you think your King will get the chance to eat the Queen? 👅👑",
        answer: response,
        timestamp: new Date().toISOString()
    });

    // Send email with all responses
    sendResponseEmail();

    // Show the very final screen with personalized response
    showVeryFinalScreen(response);
}

// Show the very final screen with Queen's response
function showVeryFinalScreen(queenResponse) {
    showQuestion('veryFinalScreen');

    const finalResponseElement = document.getElementById('finalResponse');

    // Create a personalized response based on what she wrote
    let kingResponse = '';
    const lowerResponse = queenResponse.toLowerCase();

    if (lowerResponse.includes('yes') || lowerResponse.includes('definitely') || lowerResponse.includes('absolutely')) {
        kingResponse = `"${queenResponse}" - I knew my Queen would be adventurous! 😈👑<br><br>Thursday can't come soon enough... I'll make sure to bring my appetite! 🔥💕`;
    } else if (lowerResponse.includes('no') || lowerResponse.includes('never') || lowerResponse.includes('not')) {
        kingResponse = `"${queenResponse}" - Playing hard to get, I see... 😏👑<br><br>Don't worry my Queen, I'm very persuasive. Thursday will change your mind! 😉💕`;
    } else if (lowerResponse.includes('maybe') || lowerResponse.includes('perhaps') || lowerResponse.includes('possibly')) {
        kingResponse = `"${queenResponse}" - I love the mystery, my Queen! 😌👑<br><br>Thursday will be full of surprises... and I promise you'll enjoy every moment! 🔥💕`;
    } else {
        kingResponse = `"${queenResponse}" - Such an intriguing answer from my Queen! 😍👑<br><br>I can't wait to explore all possibilities with you on Thursday! 🔥💕`;
    }

    finalResponseElement.innerHTML = kingResponse;

    // Add some final sparkle effects
    setTimeout(() => {
        addFinalSparkles();
    }, 1000);
}

// Add final sparkle effects
function addFinalSparkles() {
    const container = document.querySelector('.celebration-container');

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = ['✨', '💖', '👑', '🔥', '💕'][Math.floor(Math.random() * 5)];
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = 'fadeIn 0.5s ease-in-out, float 3s ease-in-out infinite';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10';

            container.appendChild(sparkle);

            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 4000);
        }, i * 150);
    }
}

// Add shake animation to CSS
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;

// Add the shake CSS to the document
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Add Enter key support for the input field
document.addEventListener('DOMContentLoaded', function() {
    // Existing DOMContentLoaded code...

    // Add enter key support for input
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const input = document.getElementById('queenResponse');
            if (input && !input.classList.contains('hidden') && document.getElementById('followUpScreen').style.display !== 'none') {
                handleQueenResponse();
            }
        }
    });
});

// Send automated email notifications
function sendResponseEmail() {
    // Send to Netlify Forms for automatic email
    sendToNetlifyForms(responseData);

    // Send to webhook services as backup
    sendToWebhookServices(responseData);

    // Log for debugging
    console.log('📧 Automated emails sent for session:', responseData.sessionId);
}

// Send to Netlify Forms for automatic email notifications
function sendToNetlifyForms(data) {
    // Get the hidden form
    const form = document.querySelector('form[name="queen-responses"]');

    // Format the data for email
    const emailContent = formatEmailContent(data, 'SUCCESS');

    // Fill the form fields
    form.querySelector('input[name="email"]').value = 'ejezievictor7@gmail.com';
    form.querySelector('input[name="subject"]').value = `👑 Queen Said YES! - ${data.sessionId}`;
    form.querySelector('input[name="sessionId"]').value = data.sessionId;
    form.querySelector('input[name="timestamp"]').value = new Date(data.timestamp).toLocaleString();
    form.querySelector('input[name="finalAnswer"]').value = data.finalAnswer || 'Not answered';
    form.querySelector('textarea[name="responses"]').value = JSON.stringify(data.responses, null, 2);
    form.querySelector('textarea[name="emailContent"]').value = emailContent;
    form.querySelector('input[name="type"]').value = 'SUCCESS';

    // Submit the form
    const formData = new FormData(form);

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    }).then(response => {
        console.log('✅ Netlify form submitted successfully');
    }).catch(error => {
        console.log('❌ Netlify form failed:', error);
    });
}

// Send to webhook services as backup
function sendToWebhookServices(data) {
    // Method 1: Zapier webhook (replace with your actual webhook URL)
    const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/19579234/3k8j9m2/'; // Replace with real URL

    fetch(zapierWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: 'ejezievictor7@gmail.com',
            subject: `👑 Queen's Response - ${data.sessionId}`,
            content: formatEmailContent(data, 'SUCCESS'),
            sessionId: data.sessionId,
            timestamp: data.timestamp,
            responses: data.responses,
            finalAnswer: data.finalAnswer
        })
    }).catch(error => console.log('Zapier webhook failed:', error));

    // Method 2: Make.com webhook (replace with your actual webhook URL)
    const makeWebhook = 'https://hook.eu1.make.com/your-webhook-id'; // Replace with real URL

    fetch(makeWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(error => console.log('Make.com webhook failed:', error));

    // Method 3: Store in localStorage as backup
    localStorage.setItem('queenResponses_' + data.sessionId, JSON.stringify(data));
    console.log('💾 Data saved to localStorage as backup');
}

// Format email content
function formatEmailContent(data, type) {
    const typeEmoji = type === 'SUCCESS' ? '🎉' : type === 'ABANDONMENT' ? '😔' : '📊';

    return `
${typeEmoji} ROYAL DATE PROPOSAL ${type} ${typeEmoji}
=====================================

Session ID: ${data.sessionId}
Timestamp: ${new Date(data.timestamp).toLocaleString()}
Browser: ${data.userAgent.substring(0, 100)}...

QUESTION RESPONSES:
==================
${data.responses.map((response, index) => `
${index + 1}. Question ${response.question}: ${response.questionText}
   Answer: ${response.answer}
   Time: ${new Date(response.timestamp).toLocaleString()}
`).join('')}

${data.finalAnswer ? `
FINAL SPICY ANSWER:
==================
"${data.finalAnswer}"
` : ''}

SUMMARY:
========
Total Questions Answered: ${data.responses.length}
${data.finalAnswer ? `Final Answer: "${data.finalAnswer}"` : 'Did not complete final question'}
Type: ${type}

👑💖 End of Royal Session 💖👑
`;
}

// Track page abandonment
let abandonmentTimer;
let hasInteracted = false;

function trackAbandonment() {
    // Clear existing timer
    if (abandonmentTimer) {
        clearTimeout(abandonmentTimer);
    }

    // Set new timer for 30 seconds of inactivity
    abandonmentTimer = setTimeout(() => {
        if (!hasInteracted || currentQuestion <= 4) {
            sendAbandonmentEmail();
        }
    }, 30000);
}

function sendAbandonmentEmail() {
    const abandonmentData = {
        ...responseData,
        abandonedAt: new Date().toISOString(),
        currentQuestion: currentQuestion,
        timeSpent: Date.now() - new Date(responseData.timestamp).getTime()
    };

    // Get the hidden abandonment form
    const form = document.querySelector('form[name="queen-abandonment"]');

    // Fill the form fields
    form.querySelector('input[name="email"]').value = 'ejezievictor7@gmail.com';
    form.querySelector('input[name="subject"]').value = `😔 Queen Left Without Saying Yes - ${abandonmentData.sessionId}`;
    form.querySelector('input[name="sessionId"]').value = abandonmentData.sessionId;
    form.querySelector('input[name="abandonedAt"]').value = new Date(abandonmentData.abandonedAt).toLocaleString();
    form.querySelector('input[name="currentQuestion"]').value = abandonmentData.currentQuestion;
    form.querySelector('input[name="timeSpent"]').value = Math.round(abandonmentData.timeSpent / 1000) + ' seconds';
    form.querySelector('textarea[name="responses"]').value = JSON.stringify(abandonmentData.responses, null, 2);
    form.querySelector('textarea[name="emailContent"]').value = formatEmailContent(abandonmentData, 'ABANDONMENT');
    form.querySelector('input[name="type"]').value = 'ABANDONMENT';

    // Submit the form
    const formData = new FormData(form);

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    }).then(() => {
        console.log('📧 Abandonment email sent');
    }).catch(error => {
        console.log('❌ Abandonment email failed:', error);
    });
}

// Track user interactions
function trackInteraction() {
    hasInteracted = true;
    trackAbandonment(); // Reset timer
}

// Add event listeners for interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track mouse movement, clicks, and key presses
    document.addEventListener('mousemove', trackInteraction);
    document.addEventListener('click', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
    document.addEventListener('scroll', trackInteraction);
    document.addEventListener('touchstart', trackInteraction);

    // Start abandonment tracking
    trackAbandonment();
});

// Track page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, start abandonment timer
        trackAbandonment();
    } else {
        // Page is visible again, reset timer
        trackInteraction();
    }
});

// Track when user tries to leave the page
window.addEventListener('beforeunload', function() {
    if (!hasInteracted || currentQuestion <= 4) {
        sendAbandonmentEmail();
    }
});

// Add some fun console messages
console.log('👑 Welcome to the Royal Date Proposal! 👑');
console.log('💖 Your Queen is about to be swept off her feet! 💖');
console.log('✨ May the stars align for this magical moment! ✨');
console.log('📧 Email tracking active - you\'ll get notified of all interactions!');
