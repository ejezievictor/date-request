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

    // Send email update when she says "Yes" to any question
    sendResponseEmail();

    // Play sound effect
    const sound = document.getElementById('yesSound');
    if (sound) {
        sound.play().catch(e => console.log('Audio play failed:', e));
    }
    
    showQuestion('finalScreen');

    // Add heart animation to the container
    const container = document.querySelector('.container');
    container.classList.add('heart-animation');

    // Show the "please hold" text after reading time
    setTimeout(() => {
        const pleaseHoldText = document.querySelector('.please-hold-text');
        if (pleaseHoldText) {
            pleaseHoldText.style.opacity = '0';
            pleaseHoldText.style.display = 'block';
            pleaseHoldText.style.animation = 'fadeIn 1s ease-in-out forwards';
        }
    }, 3000);

    // Show the final animation after a short delay
    setTimeout(() => {
        showFinalAnimation();
    }, 1500);

    // Show follow-up question after animation (increased duration)
    setTimeout(() => {
        showFollowUpQuestion();
    }, 8000);
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
    // Hide the "please hold" text
    const pleaseHoldText = document.querySelector('.please-hold-text');
    if (pleaseHoldText) {
        pleaseHoldText.style.display = 'none';
    }

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

    // Mark as completed (not abandoned)
    responseData.completed = true;

    // Send SUCCESS email with all responses
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

// Send automated email notifications - ONLY SUCCESS EMAILS
function sendResponseEmail() {
    // Always send as SUCCESS email with all available data
    sendToNetlifyForms(responseData);

    // Store in localStorage as backup
    localStorage.setItem('queenResponses_' + responseData.sessionId, JSON.stringify(responseData));
    console.log('💾 Data saved to localStorage as backup');

    // Log for debugging
    console.log('📧 Success email sent for session:', responseData.sessionId);
}

// Send to Netlify Forms - SIMPLIFIED TO ONE FORM ONLY
function sendToNetlifyForms(data) {
    // Get the hidden form
    const form = document.querySelector('form[name="queen-responses"]');

    // Format the data for email - always as complete response
    const emailContent = formatEmailContent(data);

    // Create subject based on completion status
    let subject = '👑 Queen Response Received';
    if (data.finalAnswer) {
        subject = '🎉 QUEEN COMPLETED EVERYTHING! All Answers Inside';
    } else if (data.responses.length > 0) {
        subject = `📝 Queen Answered ${data.responses.length} Questions`;
    }

    // Fill the form fields
    form.querySelector('input[name="form-name"]').value = 'queen-responses';
    form.querySelector('input[name="email"]').value = 'ejezievictor7@gmail.com';
    form.querySelector('input[name="subject"]').value = subject;
    form.querySelector('input[name="sessionId"]').value = data.sessionId;
    form.querySelector('input[name="timestamp"]').value = new Date(data.timestamp).toLocaleString();
    form.querySelector('input[name="finalAnswer"]').value = data.finalAnswer || 'Not answered yet';
    form.querySelector('textarea[name="responses"]').value = JSON.stringify(data.responses, null, 2);
    form.querySelector('textarea[name="emailContent"]').value = emailContent;
    form.querySelector('input[name="type"]').value = 'RESPONSE';

    // Submit the form using proper Netlify method
    const formData = new FormData(form);

    fetch('/', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            console.log('✅ Queen response email sent successfully');
        } else {
            console.log('❌ Email failed with status:', response.status);
        }
    }).catch(error => {
        console.log('❌ Email failed:', error);
    });
}

// Webhook services removed - Netlify Forms is working perfectly
// If you want to add webhooks later, you can set up real URLs in:
// - Zapier: https://zapier.com/
// - Make.com: https://make.com/
// - Or any other webhook service

// Format email content - SIMPLE AND ALWAYS POSITIVE
function formatEmailContent(data) {
    let content = `👑 QUEEN'S RESPONSE 👑\n\n`;

    // Show completion status
    if (data.finalAnswer) {
        content += `🎉 SHE COMPLETED EVERYTHING!\n\n`;
    } else if (data.responses.length >= 4) {
        content += `✅ SHE ANSWERED ALL MAIN QUESTIONS!\n\n`;
    } else {
        content += `📝 PARTIAL RESPONSE RECEIVED\n\n`;
    }

    content += `📅 Date: ${new Date(data.timestamp).toLocaleString()}\n`;
    content += `🆔 Session: ${data.sessionId}\n\n`;

    content += `📝 HER ANSWERS:\n`;
    content += `===============\n\n`;

    data.responses.forEach((response, index) => {
        content += `${index + 1}. ${response.questionText}\n`;
        content += `   Her response: ${response.answer}\n\n`;
    });

    if (data.finalAnswer) {
        content += `🔥 FINAL SPICY QUESTION:\n`;
        content += `"Do you think your King will get the chance to eat the Queen? 👅👑"\n`;
        content += `   Her response: "${data.finalAnswer}"\n\n`;
        content += `🎉 CONGRATULATIONS! Your Queen is ready for the date! 👑💕`;
    } else {
        content += `📊 SUMMARY:\n`;
        content += `===========\n`;
        content += `Questions Answered: ${data.responses.length}\n`;
        if (data.responses.length > 0) {
            content += `\n💕 She's engaging with your proposal! Keep an eye out for more responses.`;
        }
    }

    return content;
}

// Simplified tracking - no abandonment, just interaction logging
let hasInteracted = false;

// Track user interactions for analytics only
function trackInteraction() {
    hasInteracted = true;
    // Removed console log to reduce noise
}

// Add event listeners for basic interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track basic interactions for analytics
    document.addEventListener('click', trackInteraction);
    document.addEventListener('keydown', trackInteraction);
    document.addEventListener('touchstart', trackInteraction);
});

// Welcome message
console.log('👑 Royal Date Proposal Active - Email notifications enabled! 💖');
