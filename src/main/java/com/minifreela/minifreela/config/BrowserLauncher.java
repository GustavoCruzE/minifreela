package com.minifreela.minifreela.config;

import java.io.IOException;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class BrowserLauncher{

    @EventListener(ApplicationReadyEvent.class)
    public void launchBrowser() {
        try {
        String url = "http://localhost:8080";
        String os = System.getProperty("os.name").toLowerCase();

        if (os.contains("win")) {
            Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + url);
        } else if (os.contains("mac")) {
            Runtime.getRuntime().exec("open " + url);
        } else if (os.contains("nix") || os.contains("nux")) {
            Runtime.getRuntime().exec("xdg-open " + url);
        } else {
            System.err.println("Sistema operacional desconhecido para abertura de navegador.");
        }
    } catch (IOException e) {
        e.printStackTrace();
    }}
}

