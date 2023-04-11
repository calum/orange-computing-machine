package com.example.demo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

/**
 * The chinese language translation controller.
 * 
 * Responds to the /translate endpoint with a translated message.
 * 
 * Uses ChatGPT to translate the message.
 *
 */
@RestController
public class TranslationController {
    
    /**
     * The Translation service.
     */
    private final TranslationService translationService = new TranslationService();

    /**
     * Translation string.
     *
     * @param message the message
     * @return the string
     */
    @PostMapping("/translate")
    public ResponseEntity<?> translation(@RequestBody TranslationMessage message) {
        
        String translatedMessage = translationService.translation(message.message);

        return ResponseEntity.ok(translatedMessage);
    }  
}
