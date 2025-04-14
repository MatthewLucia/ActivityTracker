package com.example.activitytracker.activity;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.time.Duration;
import java.time.LocalDate;

@Configuration
public class ActivityConfig {

    @Bean
    CommandLineRunner activityCommandLineRunner(ActivityRepository repository) {
        return args -> {
            CardioActivity demo_cardio_activity = new CardioActivity(
                    1,
                    "Neighborhood Run 03-20-2025",
                    LocalDate.of(2025, 3, 20),
                    "Run down Pearl Street and back along the Winooski River.",
                    Duration.ofMinutes(29),
                    456,
                    2.7,
                    89
            );

            List<SetDetail> benchPressSets = List.of(
                    new SetDetail(12, 100.0),
                    new SetDetail(10, 110.0),
                    new SetDetail(8, 120.0)
            );
            List<SetDetail> shoulderPressSets = List.of(
                    new SetDetail(12, 40.0),
                    new SetDetail(10, 30.0),
                    new SetDetail(8, 40.0)
            );
            List<SetDetail> chestFlySets = List.of(
                    new SetDetail(12, 110.0),
                    new SetDetail(10, 90.0),
                    new SetDetail(8, 110.0)
            );
            List<SetDetail> tricepCableExtensionSets = List.of(
                    new SetDetail(12, 22.5),
                    new SetDetail(10, 20.0),
                    new SetDetail(8, 22.5),
                    new SetDetail(8, 17.5)
            );
            StrengthExercise benchPress = new StrengthExercise("Bench Press", benchPressSets);
            StrengthExercise shoulderPress = new StrengthExercise("Shoulder Press", shoulderPressSets);
            StrengthExercise chestFly = new StrengthExercise("Chest Fly", chestFlySets);
            StrengthExercise tricepCableExtensions = new StrengthExercise("Tricep Cable Extensions", tricepCableExtensionSets);

            StrengthActivity demo_strength_activity = new StrengthActivity(
                    2,
                    "Demo Strength Activity",
                    LocalDate.of(2025, 1, 1),
                    "Description",
                    Duration.ofMinutes(60),
                    100,
                    List.of(benchPress, shoulderPress, chestFly, tricepCableExtensions)
            );

            repository.save(demo_cardio_activity);
            repository.save(demo_strength_activity);
        };
    }
}
