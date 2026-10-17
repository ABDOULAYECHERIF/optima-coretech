// Safira AI chatbot (moved out of index.html for the Orisa redesign)
  $(document).ready(function() {
    // Chatbot variables
    let chatState = {
      step: 'name',
      data: {
        name: '',
        company: '',
        businessType: '',
        need: '',
        websiteType: '',
        email: ''
      }
    };

    // Voice recognition variables
    let recognition = null;
    let isListening = false;

    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = function() {
        isListening = true;
        $('#voice-input').addClass('listening');
        $('#voice-feedback').fadeIn();
      };

      recognition.onresult = function(event) {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        $('#chatbot-input').val(finalTranscript || interimTranscript);

        if (finalTranscript) {
          setTimeout(() => {
            sendMessage();
          }, 500);
        }
      };

      recognition.onerror = function(event) {
        console.error('Speech recognition error', event.error);
        stopVoiceRecognition();
      };

      recognition.onend = function() {
        stopVoiceRecognition();
      };
    } else {
      // Browser doesn't support speech recognition
      $('#voice-input').hide();
    }

    function startVoiceRecognition() {
      if (recognition) {
        try {
          recognition.start();
        } catch (error) {
          console.error('Speech recognition start failed', error);
        }
      }
    }

    function stopVoiceRecognition() {
      if (recognition) {
        try {
          recognition.stop();
        } catch (error) {
          console.error('Speech recognition stop failed', error);
        }
        isListening = false;
        $('#voice-input').removeClass('listening');
        $('#voice-feedback').fadeOut();
      }
    }

    // DOM elements
    const $chatbotButton = $('.chatbot-button');
    const $chatbotWindow = $('.chatbot-window');
    const $chatbotClose = $('.chatbot-close');
    const $chatbotMessages = $('#chatbot-messages');
    const $chatbotInput = $('#chatbot-input');
    const $chatbotSend = $('#chatbot-send');
    const $voiceInput = $('#voice-input');

    // Toggle chat window
    $chatbotButton.on('click', function() {
      $chatbotWindow.toggleClass('active');
      $chatbotButton.toggleClass('active');
      if ($chatbotWindow.hasClass('active')) {
        $chatbotInput.focus();
      }
    });

    $chatbotClose.on('click', function() {
      $chatbotWindow.removeClass('active');
      $chatbotButton.removeClass('active');
      stopVoiceRecognition();
    });

    // Voice input handler
    $voiceInput.on('click', function() {
      if (isListening) {
        stopVoiceRecognition();
      } else {
        startVoiceRecognition();
      }
    });

    // Send message function
    function sendMessage() {
      const message = $chatbotInput.val().trim();
      if (message === '') return;

      // Add user message to chat
      addMessage(message, 'user');
      $chatbotInput.val('');

      // Process the message based on current step
      processUserResponse(message);
    }

    // Send message on button click
    $chatbotSend.on('click', sendMessage);

    // Send message on Enter key
    $chatbotInput.on('keypress', function(e) {
      if (e.which === 13) {
        sendMessage();
      }
    });

    // Add message to chat
    function addMessage(text, type) {
      const now = new Date();
      const time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

      const messageElement = $('<div>').addClass('message').addClass(type + '-message').text(text);
      messageElement.append($('<div>').addClass('message-time').text(time));

      $chatbotMessages.append(messageElement);
      $chatbotMessages.scrollTop($chatbotMessages[0].scrollHeight);
    }

    // Add typing indicator
    function showTypingIndicator() {
      const typingElement = $('<div>').addClass('typing-indicator');
      typingElement.append($('<div>').addClass('typing-dot'));
      typingElement.append($('<div>').addClass('typing-dot'));
      typingElement.append($('<div>').addClass('typing-dot'));
      $chatbotMessages.append(typingElement);
      $chatbotMessages.scrollTop($chatbotMessages[0].scrollHeight);
      return typingElement;
    }

    // Remove typing indicator
    function removeTypingIndicator(typingElement) {
      typingElement.remove();
    }

    // Process user response based on current step
    function processUserResponse(response) {
      switch(chatState.step) {
        case 'name':
          chatState.data.name = response;
          chatState.step = 'company';
          setTimeout(function() {
            const typingElement = showTypingIndicator();
            setTimeout(function() {
              removeTypingIndicator(typingElement);
              addMessage(`Nice to meet you, ${response}! What's your company name?`, 'bot');
            }, 1000);
          }, 500);
          break;

        case 'company':
          chatState.data.company = response;
          chatState.step = 'businessType';
          setTimeout(function() {
            const typingElement = showTypingIndicator();
            setTimeout(function() {
              removeTypingIndicator(typingElement);
              addMessage('Great! What kind of business does your company do?', 'bot');
            }, 1000);
          }, 500);
          break;

        case 'businessType':
          chatState.data.businessType = response;
          chatState.step = 'need';
          setTimeout(function() {
            const typingElement = showTypingIndicator();
            setTimeout(function() {
              removeTypingIndicator(typingElement);
              addMessage('Thanks! How can we help you today?', 'bot');
              // Add quick options
              const optionsContainer = $('<div>').addClass('options-container');
              optionsContainer.append($('<button>').addClass('option-button').text('Website Development'));
              optionsContainer.append($('<button>').addClass('option-button').text('Mobile App'));
              optionsContainer.append($('<button>').addClass('option-button').text('IT Consulting'));
              optionsContainer.append($('<button>').addClass('option-button').text('Other'));

              const messageElement = $('<div>').addClass('message bot-message');
              messageElement.append('You can choose one of these options or describe your needs:');
              messageElement.append(optionsContainer);
              $chatbotMessages.append(messageElement);
              $chatbotMessages.scrollTop($chatbotMessages[0].scrollHeight);

              // Add event listeners to option buttons
              $('.option-button').on('click', function() {
                $chatbotInput.val($(this).text());
                sendMessage();
              });
            }, 1000);
          }, 500);
          break;

        case 'need':
          chatState.data.need = response;
          if (response.toLowerCase().includes('website')) {
            chatState.step = 'websiteType';
            setTimeout(function() {
              const typingElement = showTypingIndicator();
              setTimeout(function() {
                removeTypingIndicator(typingElement);
                addMessage('What type of website are you looking for?', 'bot');
                // Add website type options
                const optionsContainer = $('<div>').addClass('options-container');
                optionsContainer.append($('<button>').addClass('option-button').text('Static Website'));
                optionsContainer.append($('<button>').addClass('option-button').text('Landing Page'));
                optionsContainer.append($('<button>').addClass('option-button').text('E-commerce'));
                optionsContainer.append($('<button>').addClass('option-button').text('Web Application'));

                const messageElement = $('<div>').addClass('message bot-message');
                messageElement.append(optionsContainer);
                $chatbotMessages.append(messageElement);
                $chatbotMessages.scrollTop($chatbotMessages[0].scrollHeight);

                // Add event listeners to option buttons
                $('.option-button').on('click', function() {
                  $chatbotInput.val($(this).text());
                  sendMessage();
                });
              }, 1000);
            }, 500);
          } else {
            chatState.step = 'email';
            setTimeout(function() {
              const typingElement = showTypingIndicator();
              setTimeout(function() {
                removeTypingIndicator(typingElement);
                addMessage('Thanks for sharing! Could you please provide your email address so our team can contact you?', 'bot');
              }, 1000);
            }, 500);
          }
          break;

        case 'websiteType':
          chatState.data.websiteType = response;
          chatState.step = 'email';
          setTimeout(function() {
            const typingElement = showTypingIndicator();
            setTimeout(function() {
              removeTypingIndicator(typingElement);
              addMessage('Perfect! Lastly, could you please provide your email address so our team can contact you with a tailored proposal?', 'bot');
            }, 1000);
          }, 500);
          break;

        case 'email':
          // Simple email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(response)) {
            chatState.data.email = response;

            // Submit the data to Formspree
            submitToFormspree();

            setTimeout(function() {
              const typingElement = showTypingIndicator();
              setTimeout(function() {
                removeTypingIndicator(typingElement);
                addMessage('Thank you! Our team will contact you shortly. Is there anything else I can help you with?', 'bot');
                chatState.step = 'completed';
              }, 1000);
            }, 500);
          } else {
            setTimeout(function() {
              const typingElement = showTypingIndicator();
              setTimeout(function() {
                removeTypingIndicator(typingElement);
                addMessage('That doesn\'t look like a valid email address. Please provide a valid email.', 'bot');
              }, 1000);
            }, 500);
          }
          break;

        case 'completed':
          // Handle any follow-up questions
          setTimeout(function() {
            const typingElement = showTypingIndicator();
            setTimeout(function() {
              removeTypingIndicator(typingElement);
              addMessage('I\'m here if you need anything else!', 'bot');
            }, 1000);
          }, 500);
          break;
      }
    }

    // Submit data to Formspree
    function submitToFormspree() {
      // Replace with your actual Formspree endpoint
      const formspreeEndpoint = "https://formspree.io/f/xovnyjve";

      // Create form data
      const formData = new FormData();
      formData.append('name', chatState.data.name);
      formData.append('company', chatState.data.company);
      formData.append('businessType', chatState.data.businessType);
      formData.append('need', chatState.data.need);
      formData.append('websiteType', chatState.data.websiteType);
      formData.append('email', chatState.data.email);
      formData.append('_subject', 'New lead from Safira chatbot');

      // Submit using fetch
      fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
              .then(response => {
                if (response.ok) {
                  console.log('Form submitted successfully');
                } else {
                  console.error('Form submission error');
                }
              })
              .catch(error => {
                console.error('Error:', error);
              });
    }

    // Auto-open chatbot after 5 seconds
    setTimeout(function() {
      $chatbotWindow.addClass('active');
      $chatbotButton.addClass('active');
    }, 5000);
  });
