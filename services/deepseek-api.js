// DeepSeek API integration
// Documentation: https://api-docs.deepseek.com/

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// Validazione API key all'avvio
if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'your-api-key-here') {
  console.warn('⚠️ DEEPSEEK_API_KEY non configurata. Le funzionalità AI saranno disabilitate.');
  console.warn('   Per abilitarle, imposta DEEPSEEK_API_KEY nel file .env');
}

/**
 * Verifica se l'API key è configurata correttamente
 * @returns {boolean} True se l'API key è valida
 */
const isApiKeyValid = () => {
  return DEEPSEEK_API_KEY && DEEPSEEK_API_KEY !== 'your-api-key-here';
};

/**
 * Call DeepSeek API to generate a response
 * @param {string} message - The user message to send to DeepSeek
 * @returns {Promise<Object>} The API response
 */
export const callDeepSeekAPI = async (message) => {
  // Verifica configurazione API key
  if (!isApiKeyValid()) {
    console.error('DeepSeek API non disponibile: API key non configurata');
    return {
      success: false,
      error: 'API DeepSeek non configurata. Imposta DEEPSEEK_API_KEY nel file .env per abilitare le funzionalità AI.'
    };
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: data.choices?.[0]?.message?.content || 'Nessuna risposta ricevuta',
      data: data
    };
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    return {
      success: false,
      error: error.message || 'Errore nella chiamata API DeepSeek'
    };
  }
};

/**
 * Test DeepSeek API connection
 * @returns {Promise<Object>} Test result
 */
export const testDeepSeekAPI = async () => {
  return await callDeepSeekAPI('Rispondi con "OK" se ricevi questo messaggio.');
};
