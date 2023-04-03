package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * The type Greeting controller.
 * 
 * Responds to the /hello?name=calum endpoint with a welcome message.
 */
@RestController
public class GreetingController {

    /**
     * The Greeting service.
     */
    private final GreetingService greetingService = new GreetingService();


    /**
     * Greeting string.
     *
     * @param name the name
     * @return the string
     */
    @GetMapping("/hello")
    public String greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return greetingService.greeting(name);
    }
}
