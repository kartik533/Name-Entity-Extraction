package com.scb.reimann.loans.ocr;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.springframework.stereotype.Service;
@Service
public class RuntimeExec {
	public StreamWrapper getStreamWrapper(InputStream is, String type) {
		return new StreamWrapper(is, type);
	}

	private class StreamWrapper extends Thread {
		InputStream is = null;
		String type = null;
		String message = null;

		public String getMessage() {
			return message;
		}

		StreamWrapper(InputStream is, String type) {
			this.is = is;
			this.type = type;
		}

		public void run() {
			try {
				BufferedReader br = new BufferedReader(new InputStreamReader(is));
				StringBuffer buffer = new StringBuffer();
				String line = null;
				while ((line = br.readLine()) != null) {
					buffer.append(line);// .append("\n");
				}
				message = buffer.toString();
			} catch (IOException ioe) {
				ioe.printStackTrace();
			}
		}
	}

// this is where the action is
	public String OcrtoJson(String filename) {
		Runtime rt = Runtime.getRuntime();
		RuntimeExec rte = new RuntimeExec();
		StreamWrapper error, output;
		String msg = new String();

		try {
			Process proc = rt.exec("python Passport.py "+filename);
			error = rte.getStreamWrapper(proc.getErrorStream(), "ERROR");
			output = rte.getStreamWrapper(proc.getInputStream(), "OUTPUT");
			int exitVal = 0;

			error.start();
			output.start();
			error.join(3000);
			output.join(3000);
			exitVal = proc.waitFor();
			System.out.println("Output: " + output.message + "\nError: " + error.message);
			msg = output.message;
		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return msg;
	}
}
