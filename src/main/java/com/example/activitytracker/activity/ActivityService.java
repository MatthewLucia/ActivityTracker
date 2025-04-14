package com.example.activitytracker.activity;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getActivities() {
        return activityRepository.findAll();
    }

    public Optional<Activity> getActivityById(Integer activityId) {
        return activityRepository.findById(activityId);
    }

    public void addNewActivity(Activity activity) {
        Optional<Activity> activityOptional = activityRepository.findById(activity.getId());
        if (activityOptional.isPresent()) {
            throw new IllegalStateException("Activity already exists");
        }
        activityRepository.save(activity);
    }

    public void deleteActivity(Integer activityId) {
        boolean exists = activityRepository.existsById(activityId);
        if (!exists) {
            throw new IllegalArgumentException("Activity does not exist");
        }
        activityRepository.deleteById(activityId);
    }

    @Transactional
    public void updateActivity(Integer activityId,
                           String name,
                           LocalDate date,
                           String description,
                           Duration duration,
                           Integer calories,
                           Double distance,
                           Integer elevationGain,
                           List<StrengthExercise> exercises
                               ) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new IllegalArgumentException("Activity does not exist"));

        if (!name.isEmpty() && !name.equals(activity.getName())) {
            activity.setName(name);
        }

        if (date != null && !date.equals(activity.getDate())) {
            activity.setDate(date);
        }

        if (description != null && !description.equals(activity.getDescription())) {
            activity.setDescription(description);
        }

        if (duration != null && !duration.equals(activity.getDuration())) {
            activity.setDuration(duration);
        }

        if (calories != null && !calories.equals(activity.getCalories())) {
            activity.setCalories(calories);
        }

        if (activity instanceof CardioActivity cardioActivity) {
            if (distance != null && !distance.equals(cardioActivity.getDistance())) {
                cardioActivity.setDistance(distance);
            }

            if(elevationGain != null && !elevationGain.equals(cardioActivity.getElevationGain())) {
                cardioActivity.setElevationGain(elevationGain);
            }
        }

        if (activity instanceof StrengthActivity strengthActivity) {
            if (exercises != null && !exercises.isEmpty() && !exercises.equals(strengthActivity.getExercises())) {
                strengthActivity.setExercises(exercises);
            }
        }
    }
}
