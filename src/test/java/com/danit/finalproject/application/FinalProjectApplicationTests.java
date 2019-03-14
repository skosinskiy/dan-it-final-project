package com.danit.finalproject.application;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class FinalProjectApplicationTests {

	@Autowired
	private TestRestTemplate testRestTemplate;

	@Value("${server.port}")
	private String port;
	private String host = "localhost";

	@Test
	public void contextLoads() {
		String endpoint = String.format("http://%s:%s", host, port);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

		ResponseEntity<String> responseEntity = testRestTemplate.exchange(endpoint,
				HttpMethod.GET, requestEntity, String.class);

		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

}
