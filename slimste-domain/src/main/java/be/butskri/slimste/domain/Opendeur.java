package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.List;

public class Opendeur implements Serializable {

	// 3 vragen...
	private List<OpendeurVraag> vragen;

	public Opendeur(List<OpendeurVraag> vragen) {
		this.vragen = vragen;
	}
	
	public List<OpendeurVraag> getVragen() {
		return vragen;
	}
}
