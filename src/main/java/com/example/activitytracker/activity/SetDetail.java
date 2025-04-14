package com.example.activitytracker.activity;

import jakarta.persistence.*;

@Entity
class SetDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer reps;
    private Double weight;

    public SetDetail() {}

    public SetDetail(Integer reps, Double weight) {
        this.reps = reps;
        this.weight = weight;
    }

    public Integer getReps() {
        return reps;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "{reps=" + reps + ", weight=" + (weight != null ? weight : "N/A") + "}";
    }
}