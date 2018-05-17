package com.lee.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.zuul.filters.route.FallbackProvider;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class HelloController {
    private final Logger logger = LoggerFactory.getLogger(FallbackProvider.class);

    @Autowired
    private RestTemplate restTemplate;
    @RequestMapping("/hello")
    public String index(@RequestParam String name) {
        logger.info("request one  name is "+name);
        return "hello "+name+"，this is a service write by java spring boot framework!!!";
    }
    @RequestMapping("/java-user")
    public String JavaUser() {
    	
    	return "{'username': 'java','password': 'java'}";
    }
    
    
    @RequestMapping("/python-user")
    public String PythonUser() {
    	
    	return restTemplate.getForEntity("http://python-sidecar/getUser", String.class).getBody();
    }    
}