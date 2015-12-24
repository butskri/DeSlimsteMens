package be.butskri.slimste.domain;

import java.io.Serializable;
import java.util.List;

public class CollectiefGeheugen implements Serializable {
	
	private List<Video> videos;

	public CollectiefGeheugen(List<Video> videos) {
		this.videos = videos;
	}

	public List<Video> getVideos() {
		return videos;
	}
}
