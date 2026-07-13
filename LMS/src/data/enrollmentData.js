// src/data/enrollmentData.js
// Replace these with Supabase queries later, e.g.:
// const { data } = await supabase.from('enrollments').select('*').order('date', { ascending: false });

export const STAT_CARDS = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$12,450.00",
    delta: "+8.5%",
    trend: "up",
    icon: "wallet2",
  },
  {
    id: "students",
    label: "Total Students",
    value: "1,240",
    delta: "+4.3%",
    trend: "up",
    icon: "people-fill",
  },
  {
    id: "courses",
    label: "Active Courses",
    value: "12",
    delta: "Stable",
    trend: "flat",
    icon: "journal-bookmark-fill",
  },
  {
    id: "completion",
    label: "Completion Rate",
    value: "87.2%",
    delta: "-1.4%",
    trend: "down",
    icon: "bullseye",
  },
];

export const REVENUE_SERIES = [
  { month: "May", revenue: 6200, students: 810 },
  { month: "Jun", revenue: 7400, students: 890 },
  { month: "Jul", revenue: 6900, students: 940 },
  { month: "Aug", revenue: 8800, students: 1020 },
  { month: "Sep", revenue: 9600, students: 1110 },
  { month: "Oct", revenue: 12450, students: 1240 },
];

export const QUICK_ACTIONS = [
  { id: "new-course", label: "New Course", icon: "plus-circle" },
  { id: "upload-lesson", label: "Upload Lesson", icon: "upload" },
  { id: "invite-student", label: "Invite Student", icon: "person-plus" },
  { id: "export-data", label: "Export Data", icon: "download" },
];

export const ENROLLMENTS = [
  {
    id: "enr-1",
    student: "Marcus Halloway",
    email: "marcus.h@mail.com",
    course: "Advanced UI Design Systems",
    date: "Oct 24, 2023",
    status: "Confirmed",
  },
  {
    id: "enr-2",
    student: "Emma Rodgers",
    email: "emma.r@mail.com",
    course: "Futuristic Architecture",
    date: "Oct 23, 2023",
    status: "Confirmed",
  },
  {
    id: "enr-3",
    student: "David Chen",
    email: "david.c@mail.com",
    course: "Digital Product Management",
    date: "Oct 22, 2023",
    status: "Pending",
  },
  {
    id: "enr-4",
    student: "Sara Malik",
    email: "sara.m@mail.com",
    course: "Intro to UX Research",
    date: "Oct 21, 2023",
    status: "Cancelled",
  },
  {
    id: "enr-5",
    student: "Owen Price",
    email: "owen.p@mail.com",
    course: "Motion Design Basics",
    date: "Oct 20, 2023",
    status: "Confirmed",
  },
];

export const TEACHER_PROFILE = {
  name: "Sarah Collins",
  role: "Product Design Instructor",
  avatarInitials: "SC",
};