package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.List;

public class Video implements Serializable {
	
	private String urlVideo;
	private List<String> antwoorden;
	
	public Video(String urlVideo, List<String> antwoorden) {
		this.urlVideo = urlVideo;
		this.antwoorden = antwoorden;
	}
	
	public String getUrlVideo() {
		return urlVideo;
	}
	
	public List<String> getAntwoorden() {
		return antwoorden;
	}
}
