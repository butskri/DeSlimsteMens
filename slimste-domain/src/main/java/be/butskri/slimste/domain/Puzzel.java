package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.List;

public class Puzzel implements Serializable {
	
	// list van 3 antwoorden
	private List<PuzzelAntwoord> antwoorden;

	public Puzzel(List<PuzzelAntwoord> antwoorden) {
		this.antwoorden = antwoorden;
	}

	public List<PuzzelAntwoord> getAntwoorden() {
		return antwoorden;
	}
}
