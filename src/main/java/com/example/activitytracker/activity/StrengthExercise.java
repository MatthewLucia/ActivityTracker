package com.example.activitytracker.activity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class StrengthExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private Integer sets;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "exercise_id")
    private List<SetDetail> setDetails; // List containing reps & weights per set

    public StrengthExercise() {}

    public StrengthExercise(String type, List<SetDetail> setDetails) {
        this.type = type;
        this.setDetails = setDetails;
        this.sets = setDetails.size();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getSets() {
        return sets;
    }

    public void setSets(Integer sets) {
        this.sets = sets;
    }

    public List<SetDetail> getSetDetails() {
        return setDetails;
    }

    public void setSetDetails(List<SetDetail> setDetails) {
        this.setDetails = setDetails;
        this.sets = setDetails.size();
    }

    @Override
    public String toString() {
        return "StrengthExercise{" +
                "type='" + type + '\'' +
                ", sets=" + sets +
                ", setDetails=" + setDetails +
                '}';
    }
}