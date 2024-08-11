exports.handler = async function(event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ note: process.env.LOVE_NOTE || "Your love note will appear here" })
    };
  };