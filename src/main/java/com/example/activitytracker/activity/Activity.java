package com.example.activitytracker.activity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDate;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "activity_type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "activity")
public abstract class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Integer id;
    protected String name;
    protected LocalDate date;
    protected String description;
    @JsonDeserialize(using = DurationDeserializer.class)
    protected Duration duration;
    protected Integer calories;

    public Activity() {}

    public Activity(Integer id,
                    String name,
                    LocalDate date,
                    String description,
                    Duration duration,
                    Integer calories) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.duration = duration;
        this.calories = calories;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public Duration getDuration() {
        return duration;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", description='" + description + '\'' +
                ", duration=" + duration +
                ", calories=" + calories +
                '}';
    }
}
