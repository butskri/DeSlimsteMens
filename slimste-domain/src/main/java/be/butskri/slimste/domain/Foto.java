package be.butskri.slimste.domain;

import java.io.Serializable;

public class Foto implements Serializable{

	private String url;
	private boolean verticaleFoto;
	
	public Foto(String url, boolean verticaleFoto) {
		this.url = url;
		this.verticaleFoto = verticaleFoto;
	}

	public String getUrl() {
		return url;
	}

	public boolean isVerticaleFoto() {
		return verticaleFoto;
	}

}
