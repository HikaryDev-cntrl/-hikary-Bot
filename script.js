
       const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.style.display = 'none';

        document.getElementById('sendButton').addEventListener('click', async () => {
            const userInput = document.getElementById('userInput').value;
            if (userInput.trim() === '') return;

            
            displayMessage(userInput, 'user-message');

            
            document.getElementById('userInput').value = '';

            
            typingIndicator.style.display = 'flex';

            
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Appel à l'API Deku
            try {
                const randomNumber = Math.floor(Math.random() * 1000) + 50; // Générer un UID unique
                const apiURL = `https://deku-rest-api.gleeze.com/gpt4?prompt=${encodeURIComponent(userInput)}&uid=${randomNumber}`;
                
                const response = await fetch(apiURL);
                const responseData = await response.json();

              
                typingIndicator.style.display = 'none';

                // Affiche la réponse du bot
                displayMessage(responseData.gpt4, 'bot-message');
            } catch (error) {
                console.error('Erreur:', error);
                typingIndicator.style.display = 'none'; 
                displayMessage('An error has occurred. Contact Metoushela to resolve this little problem.', 'bot-message');
            }
        });

        function displayMessage(text, className) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${className}`;
            messageElement.textContent = text;

            if (className === 'bot-message') {
                const copyButton = document.createElement('button');
                copyButton.className = 'copy-button';
                copyButton.textContent = '📋';
                copyButton.onclick = () => {
                    navigator.clipboard.writeText(text);
                };
                messageElement.appendChild(copyButton);
            }

            document.getElementById('chatWindow').appendChild(messageElement);
 
            document.getElementById('chatWindow').scrollTop = document.getElementById('chatWindow').scrollHeight;
        }

        document.getElementById('clearButton').addEventListener('click', () => {
            const chatWindow = document.getElementById('chatWindow');
            chatWindow.innerHTML = '';
            typingIndicator.style.display = 'none';
        });
