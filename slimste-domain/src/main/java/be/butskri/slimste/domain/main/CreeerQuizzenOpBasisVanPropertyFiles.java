package be.butskri.slimste.domain.main;

import be.butskri.slimste.domain.DeSlimsteMensData;
import be.butskri.slimste.domain.PropertiesToDeSlimsteMensDataMapper;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.RegexFileFilter;
import org.apache.commons.lang.StringUtils;

import java.io.*;
import java.util.*;

public class CreeerQuizzenOpBasisVanPropertyFiles {

    public static final String BEGIN_IMPORT_VAN_GEGENEREERDE_SCRIPTS = "<!-- BEGIN IMPORT VAN GEGENEREERDE SCRIPTS -->";
    public static final String EINDE_IMPORT_VAN_GEGENEREERDE_SCRIPTS = "<!-- EINDE IMPORT VAN GEGENEREERDE SCRIPTS -->";
    private File rootFolder;
    private PropertiesToDeSlimsteMensDataMapper mapper;

    public static void main(String[] args) throws IOException {
        new CreeerQuizzenOpBasisVanPropertyFiles(new File(".")).nu();
    }

    public CreeerQuizzenOpBasisVanPropertyFiles(File rootFolder) {
        mapper = new PropertiesToDeSlimsteMensDataMapper();
        mapper.setReferentieHeight(1080);
        mapper.setReferentieWidth(1920);
        this.rootFolder = rootFolder;
    }

    private void nu() throws IOException {
        List<File> jsFiles = new ArrayList<File>();
        List<File> propertyFiles = findPropertyFiles();
        for (File propertyFile : propertyFiles) {
            jsFiles.add(createJsFileOpBasisVanPropertyFile(propertyFile));
        }
        updateJsImports(new File(rootFolder, "parent.html"), jsFiles);
        updateJsImports(new File(rootFolder, "DeSlimsteMens.html"), jsFiles);
        log("druk op een knop om verder te gaan...");
        System.in.read();
    }

    private void updateJsImports(File htmlFile, List<File> jsFiles) throws IOException {
        log("bezig met het updaten van %s", htmlFile);
        List<String> lines = FileUtils.readLines(htmlFile);
        verwijderVoordienGeimporteerdeJsFiles(lines);
        insertNieuwGeimporteerdeJsFiles(lines, jsFiles);
        FileUtils.writeLines(htmlFile, lines);
    }

    private void verwijderVoordienGeimporteerdeJsFiles(List<String> lines) {
        int indexBegin = findLineIndex(lines, BEGIN_IMPORT_VAN_GEGENEREERDE_SCRIPTS);
        int indexEinde = findLineIndex(lines, EINDE_IMPORT_VAN_GEGENEREERDE_SCRIPTS);
        for (int i = indexEinde - 1; i > indexBegin; i--) {
            lines.remove(i);
        }
    }

    private void insertNieuwGeimporteerdeJsFiles(List<String> lines, List<File> jsFiles) {
        int indexBegin = findLineIndex(lines, BEGIN_IMPORT_VAN_GEGENEREERDE_SCRIPTS);
        List<String> jsLines = new ArrayList<String>();
        for (File jsFile : jsFiles) {
            jsLines.add(String.format("<script src=\"quizzen/%s/%s\"></script>", jsFile.getParentFile().getName(), jsFile.getName()));
        }
        lines.addAll(indexBegin + 1, jsLines);
    }

    private int findLineIndex(List<String> lines, String string) {
        for (int i = 0; i < lines.size(); i++) {
            if (lines.get(i).contains(string)) {
                return i;
            }
        }
        throw new RuntimeException("kan geen lijn vinden waarin volgende string voorkomt: " + string);
    }

    private File createJsFileOpBasisVanPropertyFile(File propertyFile) throws IOException {
        Properties properties = loadProperties(propertyFile);
        DeSlimsteMensData slimsteMensData = mapper.map(properties);
        File jsFile = bepaalJsFileOpBasisVan(propertyFile);
        maakJsFileAan(jsFile, slimsteMensData);
        return jsFile;
    }

    private void maakJsFileAan(File jsFile, DeSlimsteMensData slimsteMensData) throws IOException {
        log("bezig met aanmaken %s", jsFile);
        String json = mapper.toJson(slimsteMensData);
        String data = String.format("slimsteQuizzen.registerQuiz(%s);", json);
        FileUtils.write(jsFile, data);
    }

    private File bepaalJsFileOpBasisVan(File propertyFile) {
        return new File(propertyFile.getParent(), StringUtils.replace(propertyFile.getName(), ".properties", ".js"));
    }

    private Properties loadProperties(File propertyFile) throws IOException {
        Properties properties = new Properties();
        properties.load(new FileInputStream(propertyFile));
        return properties;
    }

    private List<File> findPropertyFiles() {
        List<File> result = new ArrayList<File>();
        List<File> quizFolders = bepaalQuizFolders();
        for (File quizFolder : quizFolders) {
            result.addAll(findAllPropertyFilesIn(quizFolder));
        }
        return result;
    }

    private Collection<File> findAllPropertyFilesIn(File quizFolder) {
        File[] files = quizFolder.listFiles((FilenameFilter) new RegexFileFilter(".*\\.properties"));
        return Arrays.asList(files);
    }

    private List<File> bepaalQuizFolders() {
        List<File> result = new ArrayList<File>();
        File rootQuizFolder = new File(rootFolder, "quizzen");
        for (File file : rootQuizFolder.listFiles()) {
            if (file.isDirectory()) {
                result.add(file);
            }
        }
        return result;
    }

    private void log(String string, Object... args) {
        System.out.println(String.format(string, args));
    }


}
