
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
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;

import java.io.FileNotFoundException;
import java.text.ParseException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

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
    static String getAddressByGpsCoordinates(String lng, String lat) throws IOException, org.json.simple.parser.ParseException {
        URL url = new URL("http://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat + "," + lng + "&sensor=true");
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
    
    public static void main(String[] args) throws IOException, InterruptedException,org.json.simple.parser.ParseException, ApiException {
    	System.out.println("Working Directory = " + System.getProperty("user.dir"));
        String csvFile = "src/main/resources/Accidents.csv";
        FileWriter file = new FileWriter("src/main/resources/Accidents.JSON");
        JSONArray tableau = new JSONArray();
        CSVReader reader = null;
       
        try {
            reader = new CSVReader(new FileReader(csvFile));
            String[] line;
            String region;
            int i = 0;
            while (((line = reader.readNext()) != null) && ( i < 10)) {
               if(line[4].length() == 1)
            	{
            		region = "0" + line[4] + "000";
            	}
            	else
            	{
            		region = line[4] + "000";
            	}
            		
            	GeoApiContext context = new GeoApiContext.Builder().apiKey("AIza").build();
                	GeocodingResult[] results =  GeocodingApi.geocode(context, line[1] + " " + region).await();
                	Gson gson = new GsonBuilder().setPrettyPrinting().create();
  
                	if (results.length != 0 && (gson.toJson(results[0].geometry.viewport.northeast.lng) != null) && (gson.toJson(results[0].geometry.viewport.northeast.lat) != null)) {
                            JSONObject obj = new JSONObject();
                            obj.put("adresse", line[1]);
                            obj.put("departement", line[4]);
                            obj.put("gravite", line[5]);
                            obj.put("lon", results[0].geometry.viewport.northeast.lng);
                            obj.put("lat", results[0].geometry.viewport.northeast.lat);
                            obj.put("accidentId", line[0]);
                            tableau.add(obj);
                            file.write(obj.toJSONString());
                            file.write(",");
                            System.out.println("\nGoogle Object: " + obj);
                   }
                i++; 
            }
            file.write(tableau.toJSONString());
            file.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
       
    }
}