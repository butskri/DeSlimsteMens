package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.List;

public class Galerij implements Serializable {

	private String baseUrl;
	// list van 10 fotos
	private List<Foto> fotos;
	
	public Galerij(String baseUrl, List<Foto> fotos) {
		this.baseUrl = baseUrl;
		this.fotos = fotos;
	}

	public String getBaseUrl() {
		return baseUrl;
	}

	public List<Foto> getFotos() {
		return fotos;
	}

}
