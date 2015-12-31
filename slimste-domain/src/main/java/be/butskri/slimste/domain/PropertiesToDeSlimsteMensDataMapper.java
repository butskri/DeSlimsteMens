package be.butskri.slimste.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.commons.lang.StringUtils;

import java.io.File;
import java.util.*;

public class PropertiesToDeSlimsteMensDataMapper {
	
	private int referentieWidth;
	private int referentieHeight;
	private ObjectMapper objectMapper = new ObjectMapper();

	public void setReferentieWidth(int referentieWidth) {
		this.referentieWidth = referentieWidth;
	}
	
	public void setReferentieHeight(int referentieHeight) {
		this.referentieHeight = referentieHeight;
	}

	public String toJson(DeSlimsteMensData deSlimsteMensData) {
		try {
			return objectMapper.writeValueAsString(deSlimsteMensData);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}
	
	public DeSlimsteMensData map(Properties properties) {
		String titel = titel(properties);
		Map<String, DrieZesNegenVraag> drieZesNegen = drieZesNegen(properties);
		Opendeur opendeur = opendeur(properties);
		List<Puzzel> puzzels = puzzels(properties);
		List<Galerij> galerijen = galerijen(properties);
		CollectiefGeheugen collectieGeheugen = collectiefGeheugen(properties);
		List<FinaleVraag> finale = finale(properties);
		return new DeSlimsteMensData(titel, drieZesNegen, opendeur, puzzels, galerijen, collectieGeheugen, finale);
	}

	private String titel(Properties properties) {
		return properties.getProperty("titel");
	}
	
	private Map<String, DrieZesNegenVraag> drieZesNegen(Properties properties) {
		HashMap<String, DrieZesNegenVraag> result = new HashMap<String, DrieZesNegenVraag>();
		for (int i=1;i < 16; i++) {
			DrieZesNegenVraag drieZesNegenVraag = drieZesNegenVraag(properties, i);
			result.put(String.format("vraag%s", i), drieZesNegenVraag);
		}
		return result;
	}

	private DrieZesNegenVraag drieZesNegenVraag(Properties properties, int i) {
		String vraag = properties.getProperty(String.format("driezesnegen.vraag%s", i));
		String antwoord = properties.getProperty(String.format("driezesnegen.vraag%s.antwoord", i));
		String link = properties.getProperty(String.format("driezesnegen.vraag%s.link", i));
		DrieZesNegenVraag drieZesNegenVraag = new DrieZesNegenVraag(vraag, antwoord, link);
		return drieZesNegenVraag;
	}

	private Opendeur opendeur(Properties properties) {
		List<OpendeurVraag> vragen = new ArrayList<OpendeurVraag>();
		for (int i=1;i < 4;i++) {
			vragen.add(opendeurVraag(properties, i));
		}
		return new Opendeur(vragen);
	}

	private OpendeurVraag opendeurVraag(Properties properties, int i) {
		String foto = properties.getProperty(String.format("opendeur.vraag%s.foto", i));
		String film= properties.getProperty(String.format("opendeur.vraag%s.film", i));
		List<String> antwoorden = stringList(properties, String.format("opendeur.vraag%s", i) + ".antwoord%s", 1, 4);
		return new OpendeurVraag(foto, film, antwoorden);
	}

	private List<String> stringList(Properties properties, String template, int van, int tot) {
		List<String> result = new ArrayList<String>();
		for (int i=van;i <= tot;i++) {
			result.add(properties.getProperty(String.format(template, i)));
		}
		return result;
	}

	private List<Puzzel> puzzels(Properties properties) {
		List<Puzzel> result = new ArrayList<Puzzel>();
		for (int i=1;i < 4;i++) {
			result.add(puzzel(properties, i));
		}
		return result;
	}

	private Puzzel puzzel(Properties properties, int puzzelNummer) {
		List<PuzzelAntwoord> antwoorden = Arrays.asList(
				puzzelAntwoord(properties, puzzelNummer, 1),
				puzzelAntwoord(properties, puzzelNummer, 2),
				puzzelAntwoord(properties, puzzelNummer, 3));
		return new Puzzel(antwoorden);
	}

	private PuzzelAntwoord puzzelAntwoord(Properties properties,int puzzelNummer, int antwoordnr) {
		String antwoord = properties.getProperty(String.format("puzzels.puzzel%s.antwoord%s", puzzelNummer, antwoordnr));
		List<String> hints = this.stringList(properties, String.format("puzzels.puzzel%s.antwoord%s", puzzelNummer, antwoordnr) + ".hint%s", 1, 4);
		return new PuzzelAntwoord(antwoord, hints);
	}

	private List<Galerij> galerijen(Properties properties) {
		List<Galerij> result = new ArrayList<Galerij>();
		int i=1;
		Galerij galerij = galerij(properties, i);
		while(galerij != null) {
			result.add(galerij);
			i++;
			galerij = galerij(properties, i);
		}
		return result;
	}

	private Galerij galerij(Properties properties, int i) {
		String baseUrl = properties.getProperty(String.format("galerij%s", i));
		if (StringUtils.isEmpty(baseUrl)) {
			return null;
		}
		return new Galerij(formatBaseUrl(baseUrl), fotos(baseUrl));
	}

	private String formatBaseUrl(String baseUrl) {
		if (baseUrl.endsWith("/")) {
			return baseUrl;
		}
		return baseUrl + "/";
	}

	private List<Foto> fotos(String baseUrl) {
		File folder = new File(baseUrl);
		List<Foto> result = new ArrayList<Foto>();
		if (!folder.exists()) {
			return result;
		}
		for (File file: folder.listFiles()) {
			result.add(toFoto(file));
		}
		return result;
	}

	private Foto toFoto(File file) {
		GalerijImage galerijImage = new GalerijImage(file);
		return new Foto(galerijImage.getName(), galerijImage.isVerticalImageRelativeTo(referentieWidth, referentieHeight));
	}

	private CollectiefGeheugen collectiefGeheugen(Properties properties) {
		List<Video> videos = new ArrayList<Video>();
		videos.add(video(properties, 1));
		videos.add(video(properties, 2));
		videos.add(video(properties, 3));
		return new CollectiefGeheugen(videos);
	}

	private Video video(Properties properties, int nummer) {
		String key = String.format("collectiefgeheugen.video%s", nummer);
		String urlVideo = properties.getProperty(key);
		List<String> antwoorden = this.stringList(properties, key + ".antwoord%s", 1, 5);
		return new Video(urlVideo, antwoorden);
	}

	private List<FinaleVraag> finale(Properties properties) {
		List<FinaleVraag> result = new ArrayList<FinaleVraag>();
		int i = 1;
		FinaleVraag vraag = finaleVraag(properties, i);
		while (vraag != null) {
			result.add(vraag);
			i++;
			vraag = finaleVraag(properties, i);
		}
		return result;
	}

	private FinaleVraag finaleVraag(Properties properties, int i) {
		String key = String.format("finale.vraag%s", i);
		String vraag = properties.getProperty(key);
		if (StringUtils.isEmpty(vraag)) {
			return null;
		}
		List<String> antwoorden = this.stringList(properties, key + ".antwoord%s", 1, 5);
		return new FinaleVraag(vraag, antwoorden);
	}
}
