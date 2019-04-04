package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.response.S3UploadResponse;
import com.danit.finalproject.application.service.AmazonS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/s3")
public class S3Controller {

  private AmazonS3Service amazonS3Service;

  @Autowired
  public S3Controller(AmazonS3Service amazonS3Service) {
    this.amazonS3Service = amazonS3Service;
  }

//  @PostMapping("upload/image")
//  public ResponseEntity<S3UploadResponse> putObject(@RequestParam MultipartFile file) throws IOException {
//    return new ResponseEntity<>(amazonS3Service.putImage(file), HttpStatus.OK);
//  }

  @GetMapping("/file-resource")
  public ResponseEntity<String> getUrlFromFileKey(@RequestParam String fileKey) {
    return new ResponseEntity<>(amazonS3Service.getUrlFromFileKey(fileKey), HttpStatus.OK);
  }

  @DeleteMapping("delete")
  public ResponseEntity<String> deleteObject(@RequestParam String fileKey) {
    amazonS3Service.deleteObject(fileKey);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
