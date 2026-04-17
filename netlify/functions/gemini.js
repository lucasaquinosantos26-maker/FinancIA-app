exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
        }

          const GEMINI_KEY = process.env.GEMINI_API_KEY;
            if (!GEMINI_KEY) {
                return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
                  }

                    try {
                        const body = JSON.parse(event.body);
                            const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

                                const response = await fetch(GEMINI_URL, {
                                      method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                                  body: JSON.stringify(body),
                                                      });

                                                          const data = await response.json();

                                                              return {
                                                                    statusCode: response.status,
                                                                          headers: {
                                                                                  'Content-Type': 'application/json',
                                                                                          'Access-Control-Allow-Origin': '*',
                                                                                                },
                                                                                                      body: JSON.stringify(data),
                                                                                                          };
                                                                                                            } catch (err) {
                                                                                                                return {
                                                                                                                      statusCode: 500,
                                                                                                                            body: JSON.stringify({ error: err.message }),
                                                                                                                                };
                                                                                                                                  }
                                                                                                                                  };
