package com.example.activitytracker.activity;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class DurationDeserializer extends JsonDeserializer<Duration> {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Override
    public Duration deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        String timeString = p.getText();
        try {
            LocalTime localTime = LocalTime.parse(timeString, TIME_FORMATTER);
            return Duration.ofHours(localTime.getHour())
                    .plusMinutes(localTime.getMinute())
                    .plusSeconds(localTime.getSecond());
        } catch (Exception e) {
            throw new IOException("Failed to deserialize java.time.Duration: " + e.getMessage(), e);
        }
    }
}
