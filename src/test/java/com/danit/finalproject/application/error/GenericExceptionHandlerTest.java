package com.danit.finalproject.application.error;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class GenericExceptionHandlerTest {

  @Autowired
  private TestRestTemplate testRestTemplate;

  @Test
  public void handleUnknownException() {

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

    ResponseEntity<String> responseEntity = testRestTemplate.exchange("http://localhost:8080/testUnknownExc",
        HttpMethod.GET, requestEntity, String.class);

    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    assertEquals("UNKNOWN EXCEPTION", responseEntity.getBody());
  }

  @Test
  public void handleKnownException() {

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Object> requestEntity = new HttpEntity<>(headers);

    ResponseEntity<String> responseEntity = testRestTemplate.exchange("http://localhost:8080/testKnownExc",
        HttpMethod.GET, requestEntity, String.class);

    assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    assertEquals("KNOWN EXCEPTION", responseEntity.getBody());
  }
}