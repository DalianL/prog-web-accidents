
import com.opencsv.CSVReader;
import java.io.*;
import java.io.File;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.rmi.RemoteException;
import java.util.logging.Level;
import java.util.logging.Logger;

import java.io.IOException;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.FileNotFoundException;
import java.text.ParseException;
import com.google.gson.Gson;
import org.json.simple.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.io.FileReader;
import java.io.IOException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import java.util.concurrent.TimeUnit;
import java.io.FileWriter;





public class CSVReaderExample {

    static String getAddressByGpsCoordinates(String lng, String lat)
            throws IOException, org.json.simple.parser.ParseException {

        URL url = new URL("http://maps.googleapis.com/maps/api/geocode/json?latlng="
                + lat + "," + lng + "&sensor=true");
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        String formattedAddress = "";

        try {
            InputStream in = url.openStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            String result, line = reader.readLine();
            result = line;
            while ((line = reader.readLine()) != null) {
                result += line;
            }

            JSONParser parser = new JSONParser();
            JSONObject rsp = (JSONObject) parser.parse(result);

            if (rsp.containsKey("results")) {
                JSONArray matches = (JSONArray) rsp.get("results");
                JSONObject data = (JSONObject) matches.get(0); //TODO: check if idx=0 exists
                formattedAddress = (String) data.get("formatted_address");
            }

            return "";
        } finally {
            urlConnection.disconnect();
            return formattedAddress;
        }
    }










    public static void main(String[] args) throws IOException, InterruptedException,org.json.simple.parser.ParseException {

        String csvFile = "/Users/mezrigui/Desktop/accidentsparser/prog-web-accidents/AccidentsFilter/csvparser/src/main/resources/Accidents.csv";
        FileWriter file = new FileWriter("/Users/mezrigui/Desktop/accidentsparser/prog-web-accidents/AccidentsFilter/Accidents.JSON");
        JSONArray tableau = new JSONArray();
        CSVReader reader = null;
        try {
            reader = new CSVReader(new FileReader(csvFile));
            String[] line;
            int i = 0;

            while (((line = reader.readNext()) != null) && ( i < 10000)) {
                //if (((line[2].equals("")) && (line[3].equals(""))) || ((line[2].equals(null)) && (line[3].equals(null))) || ((line[2].equals("0")) && (line[3].equals("0")))) {

                    System.out.println(i);
                    Map<String, Double> coords;
                    coords = OpenStreetMapUtils.getInstance().getCoordinates(line[1]);
                    if ((coords.get("lat") != null) && (coords.get("lon") != null)) {
                        //System.out.println("ladresse  " + line[1] + "   a comme atitude :" + coords.get("lat") + "et longitude" + coords.get("lon"));
                        JSONObject obj = new JSONObject();



                        obj.put("garvite", line[5]);
                        obj.put("departement", line[4]);
                        obj.put("lon", coords.get("lon"));
                        obj.put("lat",coords.get("lat"));
                        obj.put("Adresse", line[1]);
                        obj.put("Accident-ID", line[0]);

                        tableau.add(obj);


                        //file.write(obj.toJSONString());
                        System.out.println("Successfully Copied JSON Object to File...");
                        System.out.println("\nJSON Object: " + obj);
                    }
                TimeUnit.SECONDS.sleep(1);
                    i++;

            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        file.write(tableau.toJSONString());
    }

}