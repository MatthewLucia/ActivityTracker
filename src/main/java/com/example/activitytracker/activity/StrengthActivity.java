package com.example.activitytracker.activity;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.*;

@Entity
@DiscriminatorValue("STRENGTH")
public class StrengthActivity extends Activity {
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @CollectionTable(name = "strength_exercises", joinColumns = @JoinColumn(name = "activity_id"))
    private List<StrengthExercise> exercises;

    public StrengthActivity() {}


    public StrengthActivity(Integer id, String name, LocalDate date, String description, Duration duration, Integer calories, List<StrengthExercise> exercises) {
        super(id, name, date, description, duration, calories);
        this.exercises = exercises;
    }

    public List<StrengthExercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<StrengthExercise> exercises) {
        this.exercises = exercises;
    }

    @Override
    public String toString() {
        return "StrengthActivity{" +
                "exercises=" + exercises +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", description='" + description + '\'' +
                ", duration=" + duration +
                ", calories=" + calories +
                '}';
    }
}
