package com.example.activitytracker.activity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.Duration;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("CARDIO")
public class CardioActivity extends Activity{
    private Double distance;
    private Integer elevationGain;

    public CardioActivity(Integer id, String name, LocalDate date, String description, Duration duration, Integer calories, Double distance, Integer elevationGain) {
        super(id, name, date, description, duration, calories);
        this.distance = distance;
        this.elevationGain = elevationGain;
    }

    public CardioActivity() {}

    public Integer getElevationGain() {
        return elevationGain;
    }

    public void setElevationGain(Integer elevationGain) {
        this.elevationGain = elevationGain;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    @Override
    public String toString() {
        return "Cardio{" +
                "distance=" + distance +
                ", elevationGain=" + elevationGain +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", description='" + description + '\'' +
                ", duration=" + duration +
                ", calories=" + calories +
                '}';
    }
}
