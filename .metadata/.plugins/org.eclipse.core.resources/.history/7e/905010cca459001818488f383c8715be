package com.lee.remote;



import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(name="nodejs-service")
public interface NodeJsRemote {
	@RequestMapping(value= "/books")
	public List<Books> books();
}
