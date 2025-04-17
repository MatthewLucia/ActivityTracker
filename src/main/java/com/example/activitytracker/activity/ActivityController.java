package com.example.activitytracker.activity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/activity")
@CrossOrigin(origins = "*")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public ResponseEntity<List<ActivityResponseDto>> getActivities() {
        List<Activity> activities = activityService.getActivities();
        List<ActivityResponseDto> response = new ArrayList<>();
        for (Activity activity : activities) {
            ActivityResponseDto dto = new ActivityResponseDto(activity);
            response.add(dto);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{activityId}")
    public ResponseEntity<ActivityResponseDto> getActivityById(@PathVariable("activityId") Integer activityId) {
        Optional<Activity> activityOpt = activityService.getActivityById(activityId);
        if (activityOpt.isPresent()) {
            ActivityResponseDto dto = new ActivityResponseDto(activityOpt.get());
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Activity> addNewActivity(@RequestBody Activity activity) {
        activityService.addNewActivity(activity);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "{activityId}")
    public void deleteActivity(@PathVariable("activityId") Integer activityId) {
        activityService.deleteActivity(activityId);
    }

    @PutMapping(path = "{activityId}")
    public void updateActivity(
            @PathVariable("activityId") Integer activityId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Duration duration,
            @RequestParam(required = false) Integer calories,
            @RequestParam(required = false) Double distance,
            @RequestParam(required = false) Integer elevationGain,
            @RequestParam(required = false) List<StrengthExercise> exercises
            ) {
        activityService.updateActivity(activityId, name, date, description, duration, calories, distance, elevationGain, exercises);
    }
}
