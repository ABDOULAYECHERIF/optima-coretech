// side bar start  
function openNav() {
    "use strict";
    const sidepanel = document.getElementById("mySidepanel");
    if (sidepanel) {
        sidepanel.style.left = "0";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

function closeNav() {
    "use strict";
    const sidepanel = document.getElementById("mySidepanel");
    if (sidepanel) {
        sidepanel.style.left = "-320px";
    } else {
        console.error("Error: Side panel element not found!");
    }
}


function toggleCollapse(elementId) {
    var element = document.getElementById(elementId);
    var button = document.querySelector('.collapse_btn a');

    // Toggle the 'show' class
    element.classList.toggle('show');

    // Toggle aria-expanded attribute
    var isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);
}

// search-bar
function open_search_bar() {
    "use strict";
    const sidepanel = document.getElementById("search-bar");
    if (sidepanel) {
        sidepanel.style.height = "100vh";
        sidepanel.style.borderRadius = "0";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

function close_search_bar() {
    "use strict";
    const sidepanel = document.getElementById("search-bar");
    if (sidepanel) {
        sidepanel.style.height = "0";
        sidepanel.style.borderTopLeftRadius = "100%";
        sidepanel.style.borderTopRightRadius = "100%";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

// right-sidebar
function open_right_side() {
    "use strict";
    const sidepanel = document.getElementById("right_side");
    if (sidepanel) {
        sidepanel.style.right = "0";
    } else {
        console.error("Error: Side panel element not found!");
    }
}

function close_right_sade() {
    "use strict";
    const sidepanel = document.getElementById("right_side");
    if (sidepanel) {
        sidepanel.style.right = "-355px";
    } else {
        console.error("Error: Side panel element not found!");
    }
}


function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

function scrollToTop() {
    const scrollToTopBtn = document.documentElement || document.body;
    scrollToTopBtn.scrollIntoView({
        behavior: "smooth"
    });
}



// portfolio gallary tab
function open_img(evt, cityName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove active class from all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab content and mark the corresponding tab link as active
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.classList.add("active");
}






// button back to top 
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTopBtn").style.display = "block";
    } else {
        document.getElementById("backToTopBtn").style.display = "none";
    }
}

function scrollToTop() {
    const scrollToTopBtn = document.documentElement || document.body;
    scrollToTopBtn.scrollIntoView({
        behavior: "smooth"
    });
}


// faq section
document.addEventListener("DOMContentLoaded", function () {
    let accordionButtons = document.querySelectorAll('.accordion-button');
    let acoimg = document.querySelectorAll('.accordion-button img');

    accordionButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            let collapse = this.parentElement.nextElementSibling;

            // Close all other accordion items
            accordionButtons.forEach(function (otherButton, otherIndex) {
                if (otherButton !== button) {
                    var otherCollapse = otherButton.parentElement.nextElementSibling;
                    otherCollapse.style.maxHeight = null;
                    // Reset the image source and rotation for other accordion items
                    acoimg[otherIndex].src = 'Images/icon/plus.png';
                    acoimg[otherIndex].style.transform = 'rotate(0deg)';
                    otherButton.style.backgroundColor = '#fff';
                }
            });

            // Toggle the clicked accordion item
            if (collapse.style.maxHeight) {
                collapse.style.maxHeight = null;
                // Reset the image source, rotation, and background color when collapsing
                acoimg[index].src = 'Images/icon/plus.png';
                acoimg[index].style.transform = 'rotate(90deg)';
                button.style.backgroundColor = '';
            } else {
                collapse.style.maxHeight = collapse.scrollHeight + "px";
                // Change the image source, set rotation, and background color when expanding
                acoimg[index].src = 'Images/icon/menus.png';
                acoimg[index].style.transform = 'rotate(180deg)';
                button.style.backgroundColor = '#c1b0d5';
            }
        });
    });
});





// footer validation start
const fom = document.getElementById('footer-form');
const footerMessage = document.getElementById('footer-message');

fom.addEventListener('submit', (event) => {
    event.preventDefault();
    footerMessage.innerHTML = '~ Form submitted success fully!';
    footerMessage.style.display = 'flex';
    fom.reset();
    setTimeout(() => {
        footerMessage.style.display = 'none';
    }, 3000);
});
// footer validation end





// responsive Logoipsum Slider
$('.sliderlogo').slick({
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
    ]
});


// responsive team Slider
$('.team-slider').slick({
    arrows: false,
    dots: true,
    infinite: false,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});


// Enhanced Safira AI Chatbot with Robust Formspree Integration
class SafiraAI {
    constructor() {
        // Formspree endpoint - Replace with your actual Formspree ID
        this.formspreeEndpoint = 'https://formspree.io/f/xanypoyl';

        this.state = {
            active: false,
            conversation: [],
            context: {
                step: 'welcome',
                name: '',
                company: '',
                businessType: '',
                needs: [],
                websiteType: '',
                email: '',
                otherInquiry: ''
            },
            thinking: false,
            isMobile: window.innerWidth <= 768
        };

        this.initElements();
        this.initEventListeners();
        this.handleResize();
        this.initWelcomeMessage();
    }

    initElements() {
        this.container = document.getElementById('safiraChatbot');
        this.messagesContainer = document.getElementById('safiraMessages');
        this.userInput = document.getElementById('safiraUserInput');
        this.sendBtn = document.getElementById('safiraSendBtn');
        this.micBtn = document.getElementById('safiraMicBtn');
        this.suggestionsContainer = document.getElementById('safiraSuggestions');
        this.toggleBtn = document.getElementById('safiraToggleBtn');
        this.closeBtn = document.getElementById('safiraCloseBtn');
    }

    initEventListeners() {
        // Toggle button event
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        } else {
            console.error('Toggle button not found');
        }

        // Close button event
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.toggle());
        }

        // Message input events
        this.sendBtn.addEventListener('click', () => this.handleUserMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserMessage();
        });

        // Voice recognition if available
        if ('webkitSpeechRecognition' in window) {
            this.initVoiceRecognition();
        } else {
            this.micBtn.style.display = 'none';
        }

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
    }

    initVoiceRecognition() {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.userInput.value = transcript;
            this.handleUserMessage();
        };

        this.recognition.onerror = (event) => {
            console.error('Voice recognition error', event.error);
            this.addAIMessage("Sorry, I couldn't understand that. Could you type your message instead?");
        };

        this.recognition.onend = () => {
            this.micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            this.micBtn.style.color = '#00f0ff';
        };

        this.micBtn.addEventListener('click', () => this.toggleVoiceInput());
    }

    toggleVoiceInput() {
        if (this.recognition) {
            this.micBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            this.micBtn.style.color = '#ff2d7b';
            try {
                this.recognition.start();
            } catch (e) {
                console.error('Voice recognition failed:', e);
                this.addAIMessage("Voice input isn't working right now. Please type your message instead.");
            }
        }
    }

    handleResize() {
        this.state.isMobile = window.innerWidth <= 768;
    }

    initWelcomeMessage() {
        // Clear any existing messages
        this.messagesContainer.innerHTML = '';

        // Add welcome animation
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'safira-welcome-message';
        welcomeDiv.innerHTML = `
      <div class="safira-message-bubble ai-message">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
        this.messagesContainer.appendChild(welcomeDiv);
        this.scrollToBottom();

        // Show actual message after delay
        setTimeout(() => {
            welcomeDiv.remove();
            this.addAIMessage("Hello! I'm Safira, your AI assistant from Optima CoreTech. How can I help you today?", [
                "I need a new website",
                "I want to improve my existing site",
                "Discuss digital marketing",
                "Other inquiry"
            ]);
        }, 2000);
    }

    toggle() {
        this.state.active = !this.state.active;
        this.container.classList.toggle('active');

        if (this.state.active) {
            this.userInput.focus();
            // Mark notifications as read
            const badge = document.querySelector('.notification-badge');
            if (badge) badge.style.display = 'none';

            // On mobile, add a close button at the bottom
            if (this.state.isMobile) {
                this.addMobileCloseButton();
            }
        } else {
            // Remove mobile close button if exists
            const existingCloseBtn = document.querySelector('.safira-mobile-close');
            if (existingCloseBtn) {
                existingCloseBtn.remove();
            }
        }
    }

    addMobileCloseButton() {
        if (!this.state.isMobile) return;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'safira-mobile-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i> Close';
        closeBtn.addEventListener('click', () => this.toggle());

        this.container.appendChild(closeBtn);
    }

    addAIMessage(text, quickReplies = [], isThinking = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'safira-message-bubble ai-message new-message';

        if (isThinking) {
            messageDiv.innerHTML = `
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
        } else {
            messageDiv.textContent = text;

            if (quickReplies.length > 0) {
                const quickRepliesDiv = document.createElement('div');
                quickRepliesDiv.className = 'safira-quick-replies';

                quickReplies.forEach(reply => {
                    const replyBtn = document.createElement('div');
                    replyBtn.className = 'safira-quick-reply';
                    replyBtn.textContent = reply;
                    replyBtn.addEventListener('click', () => this.handleQuickReply(reply));
                    quickRepliesDiv.appendChild(replyBtn);
                });

                messageDiv.appendChild(quickRepliesDiv);
            }
        }

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Add to conversation history
        if (!isThinking) {
            this.state.conversation.push({
                sender: 'ai',
                message: text,
                timestamp: new Date()
            });
        }
    }

    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'safira-message-bubble user-message new-message';
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Add to conversation history
        this.state.conversation.push({
            sender: 'user',
            message: text,
            timestamp: new Date()
        });
    }

    handleQuickReply(reply) {
        this.addUserMessage(reply);
        this.processUserResponse(reply);
    }

    handleUserMessage() {
        const message = this.userInput.value.trim();
        if (message) {
            this.addUserMessage(message);
            this.userInput.value = '';
            this.processUserResponse(message);
        }
    }

    showThinkingIndicator() {
        this.state.thinking = true;
        this.addAIMessage('', [], true);
    }

    hideThinkingIndicator() {
        this.state.thinking = false;
        const indicators = document.querySelectorAll('.typing-indicator');
        if (indicators.length > 0) {
            indicators[indicators.length - 1].parentElement.remove();
        }
    }

    processUserResponse(response) {
        this.showThinkingIndicator();

        // Simulate AI thinking delay
        setTimeout(() => {
            this.hideThinkingIndicator();

            switch(this.state.context.step) {
                case 'welcome':
                    this.handleWelcomeResponse(response);
                    break;
                case 'get_name':
                    this.handleNameResponse(response);
                    break;
                case 'get_company':
                    this.handleCompanyResponse(response);
                    break;
                case 'get_business_type':
                    this.handleBusinessTypeResponse(response);
                    break;
                case 'get_website_type':
                    this.handleWebsiteTypeResponse(response);
                    break;
                case 'get_email':
                    this.handleEmailResponse(response);
                    break;
                case 'confirm':
                    this.handleConfirmationResponse(response);
                    break;
                case 'other_inquiry':
                    this.handleOtherInquiryResponse(response);
                    break;
                default:
                    this.addAIMessage("I'm not sure how to respond to that. Could you rephrase?");
            }
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    handleWelcomeResponse(response) {
        if (response.includes('website') || response.includes('site') || response.includes('web')) {
            this.state.context.needs.push('website');
            this.state.context.step = 'get_name';
            this.addAIMessage("Great! Let's get started. What's your name?", [], false);
        } else if (response.includes('market') || response.includes('promot')) {
            this.state.context.needs.push('marketing');
            this.state.context.step = 'get_name';
            this.addAIMessage("Excellent choice! Digital marketing can really boost your business. May I have your name?", [], false);
        } else {
            this.state.context.step = 'other_inquiry';
            this.addAIMessage("I'd be happy to help with that. Could you please describe what you're looking for in more detail?", [], false);
        }
    }

    handleNameResponse(response) {
        this.state.context.name = response;
        this.state.context.step = 'get_company';
        this.addAIMessage(`Nice to meet you, ${response}! What's the name of your company or organization?`, [], false);
    }

    handleCompanyResponse(response) {
        this.state.context.company = response;
        this.state.context.step = 'get_business_type';

        this.addAIMessage(`Thanks! What industry is ${response} in?`, [
            "E-commerce",
            "Professional Services",
            "Healthcare",
            "Education",
            "Non-profit",
            "Other"
        ], false);
    }

    handleBusinessTypeResponse(response) {
        this.state.context.businessType = response;
        this.state.context.step = 'get_website_type';

        if (this.state.context.needs.includes('website')) {
            this.addAIMessage("What type of website are you looking for?", [
                "Static Website (Basic information)",
                "Landing Page (For campaigns)",
                "E-commerce (Online store)",
                "Web Application (Interactive)",
                "Not sure"
            ], false);
        } else {
            this.state.context.step = 'get_email';
            this.addAIMessage("Almost done! What's your email address so we can send you more information?", [], false);
        }
    }

    handleWebsiteTypeResponse(response) {
        this.state.context.websiteType = response;
        this.state.context.step = 'get_email';
        this.addAIMessage("Got it! Finally, what's your email address so we can send you a tailored proposal?", [], false);
    }

    handleEmailResponse(response) {
        if (this.validateEmail(response)) {
            this.state.context.email = response;
            this.state.context.step = 'confirm';

            // Prepare summary
            let summary = `Thank you, ${this.state.context.name}! Here's what we've gathered:\n\n`;
            summary += `• Company: ${this.state.context.company}\n`;
            summary += `• Industry: ${this.state.context.businessType}\n`;

            if (this.state.context.websiteType) {
                summary += `• Website Needs: ${this.state.context.websiteType}\n`;
            } else if (this.state.context.needs.includes('marketing')) {
                summary += `• Interest: Digital Marketing\n`;
            }

            summary += `• Email: ${this.state.context.email}\n\n`;
            summary += "One of our experts will contact you shortly. Is there anything else I can help with?";

            this.addAIMessage(summary, [
                "Yes, I have another question",
                "No, that's all for now"
            ], false);

            // Send data to Formspree
            this.sendDataToServer();
        } else {
            this.addAIMessage("That doesn't look like a valid email address. Could you please check and enter it again?", [], false);
        }
    }

    handleConfirmationResponse(response) {
        if (response.toLowerCase().includes('yes') || response.includes('another')) {
            this.state.context.step = 'welcome';
            this.addAIMessage("What else would you like to discuss?", [
                "Website development",
                "Digital marketing",
                "Other services"
            ], false);
        } else {
            this.addAIMessage("Thank you for chatting with me! If you need anything else, just click on my icon. Have a great day!", [], false);
            this.state.context.step = 'complete';
        }
    }

    handleOtherInquiryResponse(response) {
        this.state.context.otherInquiry = response;
        this.state.context.step = 'get_email';
        this.addAIMessage("Thank you for sharing that. Could you please provide your email address so we can follow up?", [], false);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async sendDataToServer() {
        // Show loading state
        const loadingMsg = this.addAIMessage("Sending your information...", [], true);

        try {
            // Prepare form data with required Formspree fields
            const formData = new FormData();
            formData.append('_replyto', this.state.context.email);
            formData.append('_subject', `New inquiry from ${this.state.context.name || 'a visitor'}`);

            // Add all collected data
            formData.append('name', this.state.context.name);
            formData.append('company', this.state.context.company);
            formData.append('business_type', this.state.context.businessType);
            formData.append('email', this.state.context.email);
            formData.append('needs', this.state.context.needs.join(', '));

            if (this.state.context.websiteType) {
                formData.append('website_type', this.state.context.websiteType);
            }

            if (this.state.context.otherInquiry) {
                formData.append('message', this.state.context.otherInquiry);
            }

            // Debug: Log form data
            console.log('Submitting to Formspree:', {
                endpoint: this.formspreeEndpoint,
                data: Object.fromEntries(formData.entries())
            });

            // Submit to Formspree
            const response = await fetch(this.formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Origin': window.location.origin
                }
            });

            // Remove loading message
            loadingMsg.remove();

            // Handle response
            if (response.ok) {
                const data = await response.json();
                console.log('Formspree success:', data);
                this.addAIMessage("✓ Thank you! Your information has been submitted successfully. We'll contact you soon.");
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Formspree submission failed:', {
                    status: response.status,
                    error: errorData
                });

                // Show user-friendly error
                let errorMessage = "⚠️ We encountered an issue submitting your information. ";

                if (response.status === 429) {
                    errorMessage += "Our system is receiving too many requests. Please try again later.";
                } else if (response.status === 403) {
                    errorMessage += "Please verify your email address with Formspree to enable submissions.";
                } else {
                    errorMessage += "Please email us directly at contact@example.com or try again later.";
                }

                this.addAIMessage(errorMessage);

                // Show collected data as fallback
                const summary = this.generateSummaryText();
                this.addAIMessage(`For your records, here's what we collected:\n\n${summary}`);
            }
        } catch (error) {
            console.error('Network error submitting to Formspree:', error);

            // Remove loading message if it exists
            if (loadingMsg.parentNode) {
                loadingMsg.remove();
            }

            this.addAIMessage("⚠️ We're having connection issues. Please check your internet connection and try again.");

            // Fallback: Show collected data
            const summary = this.generateSummaryText();
            this.addAIMessage(`You can copy this information to email us:\n\n${summary}`);
        }
    }

    // Helper function to generate summary text
    generateSummaryText() {
        let summary = `Name: ${this.state.context.name}\n`;
        summary += `Company: ${this.state.context.company}\n`;
        summary += `Business Type: ${this.state.context.businessType}\n`;
        summary += `Email: ${this.state.context.email}\n`;

        if (this.state.context.websiteType) {
            summary += `Website Type: ${this.state.context.websiteType}\n`;
        }

        if (this.state.context.otherInquiry) {
            summary += `Message: ${this.state.context.otherInquiry}\n`;
        }

        return summary;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize Safira AI when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    try {
        // Create SafiraAI instance
        window.safiraAI = new SafiraAI();
        console.log('SafiraAI instance created');

        // Make toggle function globally available
        window.toggleSafira = function() {
            window.safiraAI.toggle();
        };

        // Show notification badge after delay
        setTimeout(() => {
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'flex';
                badge.textContent = '1';
            }
        }, 10000);

    } catch (error) {
        console.error('Error initializing SafiraAI:', error);
    }
});

// Fallback in case DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('DOM already ready');
    window.safiraAI = new SafiraAI();
}
