// export const dummyTags = [
//   {
//     id: "1",
//     name: "UI/UX",
//   },
//   {
//     id: "2",
//     name: "Software Engineering",
//   },
//   {
//     id: "3",
//     name: "Artificial Intelligence",
//   },
// ];

// export const dummyProvinces = [
//   {
//     id: "1",
//     name: "JAWA BARAT",
//   },
//   {
//     id: "2",
//     name: "JAWA TENGAH",
//   },
//   {
//     id: "3",
//     name: "JAWA TIMUR",
//   },
// ];

// export const dummyCities = [
//   {
//     id: "1",
//     name: "KOTA BANDUNG",
//   },
//   {
//     id: "2",
//     name: "KABUPATEN BANDUNG",
//   },
//   {
//     id: "3",
//     name: "KOTA CIMAHI",
//   },
// ];

// export const dummyUser = {
//   name: "Marchotridyo",
//   email: "marcho@gmail.com",
//   city: "KOTA BANDUNG",
//   role: "MENTOR",
//   tags: ["UI/UX", "Artificial Intelligence", "Software Engineering"],
//   description: "Saya adalah seorang mahasiswa tingkat akhir di ITB.",
// };

// export const dummyMentors = [
//   {
//     id: "1",
//     name: "Marchotridyo",
//     city: "KOTA BANDUNG",
//     tags: [
//       "Artificial Intelligence",
//       "Software Engineering",
//       "Education",
//       "Sales dan Marketing",
//     ],
//     imageUrl: "",
//     subscriptionStatus: "FREE",
//   },
//   {
//     id: "2",
//     name: "Maria Khelli",
//     city: "KOTA BANDUNG",
//     tags: ["Artificial Intelligence", "Software Engineering"],
//     imageUrl: "/next.svg",
//     subscriptionStatus: "PREMIUM",
//   },
//   {
//     id: "3",
//     name: "Malik Akbar",
//     city: "KOTA BANDUNG",
//     tags: [
//       "Artificial Intelligence",
//       "Software Engineering",
//       "Education",
//       "Sales dan Marketing",
//       "UI/UX",
//     ],
//     imageUrl: "/vercel.svg",
//     subscriptionStatus: "PREMIUM",
//   },
//   {
//     id: "4",
//     name: "Fayza Nadia",
//     city: "KOTA BANDUNG",
//     tags: ["Artificial Intelligence"],
//     imageUrl: "",
//     subscriptionStatus: "FREE",
//   },
//   {
//     id: "5",
//     name: "Oppenheimer",
//     city: "KOTA BANDUNG",
//     tags: [
//       "Artificial Intelligence",
//       "Software Engineering",
//       "Education",
//       "Sales dan Marketing",
//     ],
//     imageUrl: "",
//     subscriptionStatus: "PREMIUM",
//   },
// ];

// export const dummyMentorWithPicture = {
//   name: "Marchotridyo",
//   imageUrl: "/next.svg",
//   tags: [
//     "Artificial Intelligence",
//     "Software Engineering",
//     "Sales dan Marketing",
//   ],
//   city: "KOTA BANDUNG",
//   subscriptionStatus: "FREE",
//   description: "Marcho adalah seorang mahasiswa tingkat akhir di IF ITB.",
// };

// export const dummyMentorWithoutPicture = {
//   name: "Malik Akbar",
//   imageUrl: "",
//   tags: ["Artificial Intelligence", "Software Engineering"],
//   city: "KOTA BANDUNG",
//   subscriptionStatus: "PREMIUM",
//   description: "Malik Akbar adalah seorang mahasiswa tingkat akhir di IF ITB.",
// };

// export const dummyReviews = [
//   {
//     id: "1",
//     menteeName: "Maria Khelli",
//     updatedAt: new Date("2023-01-02").toISOString(),
//     review: "Sesi mentoringnya menyenangkan!",
//     rating: 2,
//   },
//   {
//     id: "2",
//     menteeName: "Fayza Nadia",
//     updatedAt: new Date("2023-01-02").toISOString(),
//     review:
//       "Sesi mentoringnya menyenangkan! Saya ingin mengikutinya kembali! Penjelasannya sangat jelas!",
//     rating: 3,
//   },
//   {
//     id: "1",
//     menteeName: "Oppenheimer",
//     updatedAt: new Date("2023-01-02").toISOString(),
//     review: "Sesi mentoringnya menyenangkan!",
//     rating: 3,
//   },
// ];

// export const dummyMyBookings = [
//   {
//     id: "1",
//     approvalStatus: "PENDING",
//     mentorName: "Marchotridyo",
//     date: new Date("2023-01-02").toISOString(),
//     review: "",
//     meetingUrl: "",
//   },
//   {
//     id: "2",
//     approvalStatus: "APPROVED",
//     mentorName: "Marchotridyo",
//     date: new Date("2023-01-02").toISOString(),
//     review: "",
//     meetingUrl: "https://www.google.com",
//   },
//   {
//     id: "3",
//     approvalStatus: "REJECTED",
//     mentorName: "Marchotridyo",
//     date: new Date("2023-01-02").toISOString(),
//     review: "",
//     meetingUrl: "",
//   },
//   {
//     id: "4",
//     approvalStatus: "APPROVED",
//     mentorName: "Marchotridyo",
//     date: new Date("2023-01-02").toISOString(),
//     review: "Bagus materinya!",
//     meetingUrl: "https://www.google.com",
//   },
// ];

// export const dummyMenteeBookings = [
//   {
//     id: "1",
//     approvalStatus: "PENDING",
//     menteeName: "Marchotridyo",
//     date: new Date("2023-01-02").toISOString(),
//     meetingUrl: "",
//   },
//   {
//     id: "2",
//     approvalStatus: "APPROVED",
//     menteeName: "Marchotridyo",
//     date: new Date("2023-01-02").toISOString(),
//     meetingUrl: "https://www.google.com",
//   },
//   {
//     id: "3",
//     approvalStatus: "REJECTED",
//     menteeName: "Marchotridyo",
//     date: new Date("2023-01-02").toISOString(),
//     meetingUrl: "",
//   },
// ];

// export const dummyGroupSessions = [
//   {
//     id: "1",
//     name: "Belajar HTML dan CSS untuk pemula",
//     date: new Date("2023-01-02").toISOString(),
//     meetingUrl: "https://www.google.com",
//     mentorId: "1",
//     mentorName: "Marchotridyo",
//     maxParticipant: 10,
//     bookedCount: 3,
//   },
//   {
//     id: "2",
//     name: "Belajar JavaScript untuk pemula",
//     date: new Date("2023-01-02").toISOString(),
//     meetingUrl: "https://www.google.com",
//     mentorId: "2",
//     mentorName: "Malik Akbar",
//     maxParticipant: 10,
//     bookedCount: 2,
//   },
//   {
//     id: "3",
//     name: "Belajar React.JS untuk pemula",
//     date: new Date("2023-01-02").toISOString(),
//     meetingUrl: "https://www.google.com",
//     mentorId: "3",
//     mentorName: "Maria Khelli",
//     maxParticipant: 10,
//     bookedCount: 9,
//   },
// ];

// export const dummyGroupSession = {
//   id: "1",
//   name: "Belajar HTML dan CSS untuk pemula",
//   mentorId: "1",
//   mentorName: "Marchotridyo",
//   mentorDescription: "Halo! Saya adalah mahasiswa akhir Informatika ITB.",
//   description:
//     "Dalam sesi grup ini, kita akan mempelajari dasar dari HTML dan CSS untuk membangun sebuah aplikasi berbasis web.",
//   date: new Date("2023-01-02").toISOString(),
//   maxParticipant: 10,
//   bookedCount: 4,
// };

// export const dummyGroupDiscussions = [
//   {
//     id: "1",
//     userId: "1",
//     userName: "Marchotridyo",
//     content:
//       "Di sini, saya mempelajari bahwa HTML dan CSS adalah fondasi yang penting untuk dimiliki untuk seorang web engineer.",
//     createdAt: new Date("2023-01-02").toISOString(),
//   },
//   {
//     id: "2",
//     userId: "2",
//     userName: "Malik Akbar",
//     content:
//       "HTML dan CSS sangat menarik untuk dipelajari, namun kita harus pelan-pelan dalam mempelajarinya agar tidak overwhelmed.",
//     createdAt: new Date("2023-01-02").toISOString(),
//   },
// ];
