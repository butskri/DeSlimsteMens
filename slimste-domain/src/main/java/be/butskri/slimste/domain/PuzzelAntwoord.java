package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.List;

public class PuzzelAntwoord implements Serializable {

	private String antwoord;
	// list van 4 strings
	private List<String> hints;
	
	public PuzzelAntwoord(String antwoord, List<String> hints) {
		this.antwoord = antwoord;
		this.hints = hints;
	}

	public String getAntwoord() {
		return antwoord;
	}
	
	public List<String> getHints() {
		return hints;
	}
}
