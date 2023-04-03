package com.example.demo;

/**
 * The type Greeting service.
 */
public class GreetingService {

    /**
     * Greeting string.
     *
     * @param name the name
     * @return the string
     */
    public String greeting(String name) {
        return String.format("Hello, %s!", name);
    }
}
