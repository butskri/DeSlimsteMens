package be.butskri.slimste.domain;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

public class GalerijImage {

	private File file;
	private int width;
	private int height;

	public GalerijImage(File file) {
		this.file = file;
		BufferedImage bufferedImage;
		try {
			bufferedImage = ImageIO.read(file);
			this.width = bufferedImage.getWidth();
			this.height = bufferedImage.getHeight();
		} catch (IOException e) {
			throw new RuntimeException("fout bij het lezen van " + file.getAbsolutePath(), e);
		}
	}

	public int getWidth() {
		return width;
	}

	public int getHeight() {
		return height;
	}

	public boolean isVerticalImageRelativeTo(int referentieWidth, int referentieHeight) {
		Double referentieVerhouding = bepaalVerhouding(referentieWidth, referentieHeight);
		Double eigenVerhouding = bepaalVerhouding(width, height);
		return eigenVerhouding.compareTo(referentieVerhouding) < 0;
	}

	private double bepaalVerhouding(int referentieWidth, int referentieHeight) {
		return (double) referentieWidth / (double) referentieHeight;
	}

	public String getName() {
		return file.getName();
	}

}
