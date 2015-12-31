package be.butskri.slimste.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

public class DrieZesNegenVraag {
	
	private String vraag;
	private String antwoord;
	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private String link;
	
	public DrieZesNegenVraag(String vraag, String antwoord, String link) {
		this.vraag = vraag;
		this.antwoord = antwoord;
		this.link = link;
	}

	public String getVraag() {
		return vraag;
	}
	
	public String getAntwoord() {
		return antwoord;
	}
	
	public String getLink() {
		return link;
	}

}
