package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.response.S3UploadResponse;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/s3")
public class AmazonS3Controller {

  private AmazonS3Service s3Service;

  @Autowired
  public AmazonS3Controller(@Lazy AmazonS3Service s3Service) {
    this.s3Service = s3Service;
  }

  @PostMapping("upload/image")
  public ResponseEntity<S3UploadResponse> uploadImageToS3(@RequestBody MultipartFile imageFile) throws IOException {
    return new ResponseEntity<>(s3Service.putImage(imageFile), HttpStatus.OK);
  }

}
