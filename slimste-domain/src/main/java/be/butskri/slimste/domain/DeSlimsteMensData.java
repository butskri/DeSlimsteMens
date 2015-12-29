package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class DeSlimsteMensData implements Serializable {

	private String titel;
	private Map<String, DrieZesNegenVraag> drieZesNegen;
	private Opendeur opendeur;
	private List<Puzzel> puzzels;
	private List<Galerij> galerijen;
	private CollectiefGeheugen collectiefGeheugen;
	private List<FinaleVraag> finale;
	
	public DeSlimsteMensData(String titel, Map<String, DrieZesNegenVraag> drieZesNegen, Opendeur opendeur, List<Puzzel> puzzels, 
			List<Galerij> galerijen, CollectiefGeheugen collectiefGeheugen, List<FinaleVraag> finale) {
		this.titel = titel;
		this.drieZesNegen = drieZesNegen;
		this.opendeur = opendeur;
		this.puzzels = puzzels;
		this.galerijen = galerijen;
		this.collectiefGeheugen = collectiefGeheugen;
		this.finale = finale;
	}

	public String getTitel() {
		return titel;
	}

	public Map<String, DrieZesNegenVraag> getDrieZesNegen() {
		return drieZesNegen;
	}

	public Opendeur getOpendeur() {
		return opendeur;
	}

	public List<Puzzel> getPuzzels() {
		return puzzels;
	}

	public List<Galerij> getGalerijen() {
		return galerijen;
	}

	public CollectiefGeheugen getCollectiefGeheugen() {
		return collectiefGeheugen;
	}

	public List<FinaleVraag> getFinale() {
		return finale;
	}

}
