package be.butskri.slimste.domain;

import static org.fest.assertions.Assertions.assertThat;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.junit.Before;
import org.junit.Test;

public class PropertiesToDeSlimsteMensDataMapperTest {

	private PropertiesToDeSlimsteMensDataMapper mapper = new PropertiesToDeSlimsteMensDataMapper();

	@Before
	public void setUp() {
		mapper.setReferentieWidth(20);
		mapper.setReferentieHeight(20);
	}
	
	@Test
	public void titelWordtCorrectGemapt() {
		DeSlimsteMensData data = mapper.map(properties());

		assertThat(data.getTitel()).isEqualTo("De slimste mens van 2014");
	}

	@Test
	public void drieZesNegenWordtCorrectGemapt() {
		DeSlimsteMensData data = mapper.map(properties());

		Map<String, String> links = data.getDrieZesNegen().getLinks();
		assertThat(links).hasSize(5);
		assertThat(links.get("vraag1")).isEqualTo("slimsteMensVan2014/driezesnegen/opgave_1.html");
		assertThat(links.get("vraag6")).isEqualTo("slimsteMensVan2014/driezesnegen/filmpje_3-6-9.mp4");
		assertThat(links.get("vraag8")).isEqualTo("slimsteMensVan2014/driezesnegen/Kerstboom.png");
		assertThat(links.get("vraag11")).isEqualTo("slimsteMensVan2014/driezesnegen/Song_3-6-9.mp3");
		assertThat(links.get("vraag15")).isEqualTo("slimsteMensVan2014/driezesnegen/opgave_15.html");
	}

	@Test
	public void opendeurWordtCorrectGemapt() {
		DeSlimsteMensData data = mapper.map(properties());

		Opendeur opendeur = data.getOpendeur();
		assertThat(opendeur.getVragen()).hasSize(3);
		assertThat(opendeur.getVragen().get(0).getUrlFoto()).isEqualTo("slimsteMensVan2014/opendeur/stefan.jpg");
		assertThat(opendeur.getVragen().get(0).getUrlFilm()).isEqualTo("slimsteMensVan2014/opendeur/stefan.mp4");
		assertThat(opendeur.getVragen().get(0).getAntwoorden()).containsOnly("Remake", "Erik Van Looy", "Bart de Pauw",
				"Matthias Schoenaerts");

		assertThat(opendeur.getVragen().get(1).getUrlFoto()).isEqualTo("slimsteMensVan2014/opendeur/Hanne_en_Yara.jpg");
		assertThat(opendeur.getVragen().get(1).getUrlFilm()).isEqualTo("slimsteMensVan2014/opendeur/Hanne_en_Yara.avi");
		assertThat(opendeur.getVragen().get(1).getAntwoorden()).containsOnly("Judoka", "Comeback", "Cocaïne", "Geschorst");

		assertThat(opendeur.getVragen().get(2).getUrlFoto()).isEqualTo("slimsteMensVan2014/opendeur/tim.jpg");
		assertThat(opendeur.getVragen().get(2).getUrlFilm()).isEqualTo("slimsteMensVan2014/opendeur/tim.mp4");
		assertThat(opendeur.getVragen().get(2).getAntwoorden()).containsOnly("Zanger", "Gorki", "Mia", "Schrijver");
	}

	@Test
	public void puzzelsWordenCorrectGemapt() {
		DeSlimsteMensData data = mapper.map(properties());

		List<Puzzel> puzzels = data.getPuzzels();
		assertThat(puzzels).hasSize(3);
		assertPuzzelAntwoord(puzzels.get(0), 0, "Jack Bauer", "24 uren", "Geen broer van Bob", "CTU", "De wereld redden");
		assertPuzzelAntwoord(puzzels.get(0), 1, "Philippe Geubels", "Colruyt", "Geen broer van Joseph", "Komiek", "Kaal");
		assertPuzzelAntwoord(puzzels.get(0), 2, "Pharrell Williams", //
				"Geen broer van Venus", "Geen broer van Serena", "Geen broer van Robbie", "Happy");

		assertPuzzelAntwoord(puzzels.get(1), 0, "Electrabel", "het", "is", "jouw", "energie");
		assertPuzzelAntwoord(puzzels.get(1), 1, "Jetair", "de mooiste", "tijd", "van", "het jaar");
		assertPuzzelAntwoord(puzzels.get(1), 2, "Mediamarkt", "ik", "ben", "toch", "niet gek");

		assertPuzzelAntwoord(puzzels.get(2), 0, "Take me to church",//
				"I was born sick", "But I love it", "Command me to be well", "Amen (4x) ...");
		assertPuzzelAntwoord(puzzels.get(2), 1, "Sexy als ik dans", "Ze zegt:", "weet je wat het is", "baby", "Ik voel me ...");
		assertPuzzelAntwoord(puzzels.get(2), 2, "Home", //
				"Through the warmth,", "through the cold,", "keep running till we're there.", "We're coming ... now");
	}

	@Test
	public void galerijenWordenCorrectGemapt() {
		DeSlimsteMensData data = mapper.map(properties());

		List<Galerij> galerijen = data.getGalerijen();
		assertThat(galerijen).hasSize(3);
		assertGalerij(galerijen.get(0), "galerijen/galerij1",
				Arrays.asList("picture01.png", "picture02.jpg", "picture03.jpg", "picture04.jpg", "picture05.png", "picture06.bmp"),
				Arrays.asList(false, false, true, false, true, false));
		assertGalerij(galerijen.get(1), "galerijen/andereGalerij",
				Arrays.asList("a.png", "b.jpg", "c.jpg", "d.jpg", "e.png", "f.bmp"),
				Arrays.asList(false, false, true, false, true, false));
		assertGalerij(galerijen.get(2), "galerijen/nogEenAndereGalerij",
				Arrays.asList("picture01.png", "picture02.jpg", "picture03.jpg", "picture04.jpg", "picture05.png", "picture06.bmp"),
				Arrays.asList(false, false, true, false, true, false));
	}

	private void assertGalerij(Galerij galerij, String baseUrl, List<String> urls, List<Boolean> verticaleFotos) {
		assertThat(galerij.getBaseUrl()).isEqualTo(baseUrl);
		for (int i=0;i < galerij.getFotos().size();i++) {
			Foto foto = galerij.getFotos().get(i);
			assertThat(foto.getUrl()).isEqualTo(urls.get(i));
			assertThat(foto.isVerticaleFoto()).isEqualTo(verticaleFotos.get(i));
		}
	}

	@Test
	public void collectiefGeheugenWordtCorrectGemapt() {
		DeSlimsteMensData data = mapper.map(properties());

		List<Video> videos = data.getCollectiefGeheugen().getVideos();
		assertThat(videos).hasSize(3);
		assertVideo(videos.get(0), "slimsteMensVan2014/collectiefgeheugen/Collectief_Geheugen_1.mp4",//
				"Belgian Bullets", "Elfje Willemsen", "Hanna Mariën", "6de plaats", "Sotsji");
		assertVideo(videos.get(1), "slimsteMensVan2014/collectiefgeheugen/Collectief_Geheugen_2.mp4", //
				"Oscar-uitreiking", "Ellen De Generes", "Group-selfie", "Twitter-record", "Meryl Streep");
		assertVideo(videos.get(2), "slimsteMensVan2014/collectiefgeheugen/Collectief_Geheugen_3.mp4",//
				"Cordon", "Antwerpen", "Dodelijk virus", "Tom Dewispelaere", "Sven De Ridder");
	}

	@Test
	public void finaleVragenWordenCorrectGemapt() {
		DeSlimsteMensData data = mapper.map(properties());

		List<FinaleVraag> finaleVragen = data.getFinale();
		assertThat(finaleVragen).hasSize(4);

		assertFinaleVraag(finaleVragen.get(0), "Wie zijn de laatste 5 winnaars van de quiz 'De slimste mens ter wereld'?",
				"Freek Braeckman", "Linda De Win", "Tomas Van Den Spiegel", "Gilles De Coster", "Adil El Arbi");
		assertFinaleVraag(finaleVragen.get(1), "Wat zijn de 5 belangrijkste goede voornemens?", "Afvallen", "Minder druk maken",
				"Meer sporten /meer bewegen", "Zuiniger met geld omgaan", "Beter voor mezelf opkomen / vaker nee zeggen");
		assertFinaleVraag(finaleVragen.get(2), "Wat weet je over Nafi(ssatou) Thiam?", //
				"Sportvrouw van het jaar", "7-kamp (hepthatlon)", "Hoogspringen", "Belgische recordhoudster", "Senegalese roots");
		assertFinaleVraag(finaleVragen.get(3), "Welke waren volgens Febiac de 5 best verkochte automerken in België?", //
				"Volkswagen", "Renault", "Peugeot", "Citroën", "Opel");
	}

	private void assertFinaleVraag(FinaleVraag finaleVraag, String vraag, String... antwoorden) {
		assertThat(finaleVraag.getVraag()).isEqualTo(vraag);
		assertThat(finaleVraag.getAntwoorden()).containsOnly((Object[]) antwoorden);

	}

	private void assertVideo(Video video, String url, String... antwoorden) {
		assertThat(video.getUrlVideo()).isEqualTo(url);
	}

	private void assertPuzzelAntwoord(Puzzel puzzel, int antwoordIndex, String antwoord, String... hints) {
		PuzzelAntwoord puzzelAntwoord = puzzel.getAntwoorden().get(antwoordIndex);
		assertThat(puzzelAntwoord.getAntwoord()).isEqualTo(antwoord);
		assertThat(puzzelAntwoord.getHints()).containsExactly((Object[]) hints);

	}

	private Properties properties() {
		try {
			Properties properties = new Properties();
			properties.load(getClass().getResourceAsStream("slimste.properties"));
			return properties;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

}
