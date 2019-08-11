package com.scb.reimann.loans.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.scb.reimann.loans.bean.Ocr;
import com.scb.reimann.loans.ocr.RuntimeExec;
@RestController
public class OcrController {
	
	@Autowired
	private RuntimeExec object;
	
	@PostMapping("/getjson")
	public String getjson(@RequestBody Ocr obj) {
		
		System.out.println("Getting JSON");
		return object.OcrtoJson(obj.getFilename());
	}
	
//	@GetMapping("/getjson")
//	public String getjson() {
//		System.out.println("Listing Customers");
//		return obj.OcrtoJson();
//	}

}
