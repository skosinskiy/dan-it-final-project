package com.danit.finalproject.application.service;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import java.io.File;

public class AmazonS3Service {

	public static void main(String[] args) {
		AWSCredentialsProvider provider = new AWSStaticCredentialsProvider(new BasicAWSCredentials("AKIAIBODLTWOTR6E6EGA", "5lpwBdhuSHnoqp5sBGAbBsUOnUFo0yvx700R3FyJ"));
		AmazonS3 s3 = AmazonS3ClientBuilder
				.standard()
				.withRegion("eu-central-1")
				.withCredentials(provider)
				.build();
		s3.putObject("rion-up-project", "test2", new File("src/main/resources/data.sql"));
	}

}
