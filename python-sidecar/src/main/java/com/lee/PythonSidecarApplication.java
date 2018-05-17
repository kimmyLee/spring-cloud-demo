package com.lee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.sidecar.EnableSidecar;

@EnableSidecar
@SpringBootApplication
public class PythonSidecarApplication {

	public static void main(String[] args) {
		SpringApplication.run(PythonSidecarApplication.class, args);
	}
}
