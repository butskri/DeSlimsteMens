package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.Map;

public class DrieZesNegen implements Serializable {
	
	private Map<String, String> links;
	
	public DrieZesNegen(Map<String, String> links) {
		this.links = links;
	}

	public Map<String, String> getLinks() {
		return links;
	}
}
