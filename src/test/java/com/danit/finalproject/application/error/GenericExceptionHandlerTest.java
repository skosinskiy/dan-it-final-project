package com.danit.finalproject.application.error;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class GenericExceptionHandlerTest {

  @Value("${server.port}")
  private String port;
  private String host = "localhost";

  @Autowired
  private TestRestTemplate testRestTemplate;

  @Test
  public void handleUnknownException() {
    String endpoint = String.format("http://%s:%s/testUnknownExc", host, port);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Object> requestEntity = new HttpEntity<>(headers);


    ResponseEntity<String> responseEntity = testRestTemplate
        .withBasicAuth("first.user@test.com", "admin")
        .exchange(endpoint,
        HttpMethod.GET, requestEntity, String.class);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    assertEquals("UNKNOWN EXCEPTION", responseEntity.getBody());
  }

  @Test
  public void handleKnownException() {
    String endpoint = String.format("http://%s:%s/testKnownExc", host, port);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

    ResponseEntity<String> responseEntity = testRestTemplate
        .withBasicAuth("first.user@test.com", "admin")
        .exchange(endpoint,
        HttpMethod.GET, requestEntity, String.class);

    assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    assertEquals("KNOWN EXCEPTION", responseEntity.getBody());
  }
}