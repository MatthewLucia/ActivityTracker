package com.example.activitytracker.activity;

public class ActivityResponseDto {
    private final String type;
    private final Activity activity;

    public ActivityResponseDto(Activity activity) {
        this.type = activity.getClass().getSimpleName();
        this.activity = activity;
    }

    public String getType() {
        return type;
    }

    public Activity getActivity() {
        return activity;
    }
}
