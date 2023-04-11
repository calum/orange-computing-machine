package com.example.demo;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.ContentType;
import org.json.JSONObject;

/**
 * The Chinese Translation service.
 * 
 * Uses theChatGPT API to translate the message.
 */
public class TranslationService {

    private static final String API_KEY = "";

    // The default message to send to the ChatGPT API
    private static final String DEFAULT_MESSAGE = "Please respond to my next message in two parts. " +
            "The first part being an English translation of the Chinese text. The second part being " +
            "an explanation of how you arrived at that translation. Please separate the two parts " +
            "with 2 new lines. " +
            "Please translate the following Chinese message: ";

    private static final String CHATGPT_URL = "https://api.openai.com/v1/chat/completions";
    private static final String MODEL = "gpt-3.5-turbo";

    /**
     * Translate a Chinese message using the DEFAULT_MESSAGE.
     * 
     * Send a HTTP POST request to the ChatGPT API with the DEFAULT_MESSAGE.
     *
     * @param message the message
     * @return the string
     */
    public String translation(String message) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(CHATGPT_URL);
        post.setHeader("Authorization", "Bearer " + API_KEY);
        post.setHeader("Content-Type", "application/json");

        String body = """
                {
                    "model": "%s",
                    "messages": [
                        {
                            "role": "user", 
                            "content": "%s"
                        }
                    ]
                }
                """.formatted(MODEL, DEFAULT_MESSAGE + message);
        post.setEntity(new StringEntity(body, "UTF-8"));
        
        // Log the request to check for valid json
        System.out.println(body);

        try {
            // Extract the key choices[0].message.content
            String response = EntityUtils.toString(client.execute(post).getEntity());
            JSONObject json = new JSONObject(response);
            return json.getJSONArray("choices").getJSONObject(0).getJSONObject("message").getString("content");
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
        
    }
    
}
