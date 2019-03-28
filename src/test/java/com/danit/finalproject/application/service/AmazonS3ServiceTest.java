package com.danit.finalproject.application.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.io.InputStream;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AmazonS3ServiceTest {

  @Autowired
  private AmazonS3Service amazonS3Service;

  @MockBean
  private AmazonS3 amazonS3;

  @Test
  public void verifyS3CalledAndKeyIsGenerated() {
    int expectedKeyLength = 36;
    String objectKey = amazonS3Service.putObject(new File(""));

    assertNotNull(objectKey);
    assertEquals(expectedKeyLength, objectKey.length());
    verify(amazonS3, times(1))
        .putObject(eq(AmazonS3Service.S3_BUCKET_NAME), any(), any(File.class));
  }

  @Test
  public void verifyS3GetCalled() {
    when(amazonS3.getObject(eq(AmazonS3Service.S3_BUCKET_NAME), anyString()))
        .thenReturn(new S3Object());

    amazonS3Service.getObject("");

    verify(amazonS3, times(1))
        .getObject(eq(AmazonS3Service.S3_BUCKET_NAME), anyString());
  }

  @Test
  public void verifyS3DeleteCalled() {
    amazonS3Service.deleteObject("");
    verify(amazonS3, times(1))
        .deleteObject(eq(AmazonS3Service.S3_BUCKET_NAME), anyString());
  }

}