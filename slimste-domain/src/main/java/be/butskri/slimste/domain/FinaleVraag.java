package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.List;

public class FinaleVraag implements Serializable {

	private String vraag;
	// list van 5 antwoorden
	private List<String> antwoorden;

	public FinaleVraag(String vraag, List<String> antwoorden) {
		this.vraag = vraag;
		this.antwoorden = antwoorden;
	}

	public String getVraag() {
		return vraag;
	}

	public List<String> getAntwoorden() {
		return antwoorden;
	}
}
