package com.lee.remote;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

@FeignClient(name="NETCORE-ORDER")
public interface NetcoreRemote {
	@RequestMapping(value= "/api/values")
	public String orders();
}
