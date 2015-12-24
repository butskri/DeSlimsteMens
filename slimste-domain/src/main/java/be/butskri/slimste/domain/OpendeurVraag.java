package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.List;

public class OpendeurVraag implements Serializable {
	
	private String urlFoto;
	private String urlFilm;
	// Array van 4 Strings
	private List<String> antwoorden;
	
	public OpendeurVraag(String urlFoto, String urlFilm, List<String> antwoorden) {
		this.urlFoto = urlFoto;
		this.urlFilm = urlFilm;
		this.antwoorden = antwoorden;
	}

	public String getUrlFoto() {
		return urlFoto;
	}
	
	public String getUrlFilm() {
		return urlFilm;
	}
	
	public List<String> getAntwoorden() {
		return antwoorden;
	}
	

}
