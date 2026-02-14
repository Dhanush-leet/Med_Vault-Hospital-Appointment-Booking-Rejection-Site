package com.medvault.dto;

import lombok.Builder;
import lombok.Data;

public class DashboardStats {
    private long totalUsers;
    private long totalDoctors;
    private long totalPatients;
    private long totalAppointments;

    public DashboardStats(long totalUsers, long totalDoctors, long totalPatients, long totalAppointments) {
        this.totalUsers = totalUsers;
        this.totalDoctors = totalDoctors;
        this.totalPatients = totalPatients;
        this.totalAppointments = totalAppointments;
    }

    public static DashboardStatsBuilder builder() {
        return new DashboardStatsBuilder();
    }

    public static class DashboardStatsBuilder {
        private long totalUsers;
        private long totalDoctors;
        private long totalPatients;
        private long totalAppointments;

        public DashboardStatsBuilder totalUsers(long val) {
            this.totalUsers = val;
            return this;
        }

        public DashboardStatsBuilder totalDoctors(long val) {
            this.totalDoctors = val;
            return this;
        }

        public DashboardStatsBuilder totalPatients(long val) {
            this.totalPatients = val;
            return this;
        }

        public DashboardStatsBuilder totalAppointments(long val) {
            this.totalAppointments = val;
            return this;
        }

        public DashboardStats build() {
            return new DashboardStats(totalUsers, totalDoctors, totalPatients, totalAppointments);
        }
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalDoctors() {
        return totalDoctors;
    }

    public void setTotalDoctors(long totalDoctors) {
        this.totalDoctors = totalDoctors;
    }

    public long getTotalPatients() {
        return totalPatients;
    }

    public void setTotalPatients(long totalPatients) {
        this.totalPatients = totalPatients;
    }

    public long getTotalAppointments() {
        return totalAppointments;
    }

    public void setTotalAppointments(long totalAppointments) {
        this.totalAppointments = totalAppointments;
    }
}
