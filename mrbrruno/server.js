const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Read API key and model from mr-bruno.txt
function getConfig() {
    try {
        const configPath = path.join(__dirname, 'mr-bruno.txt');
        if (!fs.existsSync(configPath)) {
            console.error('ERROR: mr-bruno.txt file not found!');
            return { apiKey: null, model: 'mistralai/mistral-7b-instruct' };
        }
        
        const content = fs.readFileSync(configPath, 'utf8');
        const lines = content.split('\n');
        
        let apiKey = null;
        let model = 'mistralai/mistral-7b-instruct';
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('OPENAI_API_KEY=')) {
                apiKey = trimmedLine.replace('OPENAI_API_KEY=', '').trim().replace(/["']/g, '');
            } else if (trimmedLine.startsWith('MODEL=')) {
                model = trimmedLine.replace('MODEL=', '').trim().replace(/["']/g, '');
            }
        }
        
        if (apiKey) {
            console.log('✓ API key loaded successfully');
            console.log(`✓ Model: ${model}`);
            return { apiKey, model };
        } else {
            console.error('ERROR: No API key found in mr-bruno.txt');
            return { apiKey: null, model };
        }
        
    } catch (error) {
        console.error('Error reading mr-bruno.txt:', error.message);
        return { apiKey: null, model: 'mistralai/mistral-7b-instruct' };
    }
}

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ 
                response: 'Please provide a valid message.' 
            });
        }
        
        const config = getConfig();
        
        if (!config.apiKey) {
            return res.status(500).json({ 
                response: 'AI service is not configured. Please check server logs.' 
            });
        }
        
        console.log(`Processing message: "${message}"`);
        console.log(`Using model: ${config.model}`);
        
        // Call OpenRouter API (compatible with OpenAI format)
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`,
                'HTTP-Referer': 'http://localhost:3000', // Required by OpenRouter
                'X-Title': 'Bruno AI' // Optional but good practice
            },
            body: JSON.stringify({
                model: config.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are Bruno, a helpful AI assistant. Keep responses concise, friendly, and helpful.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });
        
        if (!response.ok) {
            const errorData = await response.text();
            console.error('OpenRouter API Error:', errorData);
            
            let errorMessage = 'Sorry, there was an issue with the AI service. ';
            
            if (response.status === 401) {
                errorMessage = 'API key is invalid or expired. Please check your OpenRouter API key.';
            } else if (response.status === 429) {
                errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
            }
            
            return res.status(500).json({ 
                response: errorMessage 
            });
        }
        
        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            const aiResponse = data.choices[0].message.content;
            console.log(`AI Response (${data.usage?.total_tokens || '?'} tokens):`, aiResponse.substring(0, 100) + '...');
            
            return res.json({ 
                response: aiResponse 
            });
        } else {
            console.error('Invalid response format:', data);
            throw new Error('Invalid response from AI service');
        }
        
    } catch (error) {
        console.error('Server Error:', error.message);
        return res.status(500).json({ 
            response: 'Sorry, I encountered an error. Please try again.' 
        });
    }
});

// Serve static files
app.use(express.static('.'));

// Health check endpoint
app.get('/health', (req, res) => {
    const config = getConfig();
    res.json({ 
        status: config.apiKey ? 'configured' : 'misconfigured',
        model: config.model,
        server: 'running'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Bruno AI Server running on http://localhost:${PORT}`);
    console.log(`📁 Make sure mr-bruno.txt contains your OpenRouter API key`);
    console.log(`🔗 OpenRouter API: https://openrouter.ai/`);
    console.log(`\n📝 To test the API: curl -X POST http://localhost:${PORT}/chat -H "Content-Type: application/json" -d '{"message":"Hello"}'`);
    
    // Check config on startup
    const config = getConfig();
    if (!config.apiKey) {
        console.error('\n❌ ERROR: No API key found in mr-bruno.txt');
        console.error('Please create mr-bruno.txt with:');
        console.error('OPENAI_API_KEY=sk-or-v1-xxxxxxxxxxxx');
        console.error('MODEL=mistralai/devstral-2512:free');
    }
});