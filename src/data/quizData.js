// Quiz Questions Data

const quizData = [
  {
    id: 1,
    question: "Which dress were we wearing during our first selfie?",
    options: [
      "Green Chuti and White Shirt",
      "Pink Chuti and Black Shirt",
      "Red Chuti and Yellow Shirt",
      "Yellow Chuti and Grey T-Shirt",
    ],
    correctIndex: 0,
    memoryImage: "assets/Images/Question1_Dress_First_Selfie.jpeg",
    memoryCaption: "Our very first selfie together! 💕",
    audio: "assets/Music/Manjal_Veyil_Q1.mpeg",
  },
  {
    id: 2,
    question: "When was the first time i have seen ya?",
    options: [
      "Engineering graphics class",
      "Birthday wish video",
      "1 year CSE classroom",
      "Mechanical Civil Connector"
    ],
    correctIndex: 1, // Birthday wish video
    memoryImage: "assets/Images/Q2_First_See.png",
    memoryCaption: "The moment that started it all! ✨",
    audio: "assets/Music/Q2_ulaga-azhagiye-neeyaa.mp3",
  },
  {
    id: 3,
    question: "When was out best black twinning and when was our white twinning?",
    options: [
      "The chocolate room & College",
      "Creamery & Haribhavanam",
      "Hidden forks & Valarmathi",
      "College & Burger tree"
    ],
    correctIndex: 0, // The chocolate room & College
    memoryImage: "assets/Images/Q3_Black_White_Twinning.png",
    memoryCaption: "Twinning like we planned it! 🖤🤍",
    audio: "assets/Music/Q3_Ennavale_Adi_Ennavale.mp3",
  },
  {
    id: 4,
    question: "What was our outfit, when we took a selfie while running to board your college bus",
    options: [
      "Yellow top and blue shirt",
      "Black top and white polos",
      "White top and Olive shirt",
      "Blue top and white polos"
    ],
    correctIndex: 2, // white top and Olive shirt
    memoryImage: "assets/Images/Q4_Bus_Late.jpg",
    memoryCaption: "Running but still making time for a selfie! 🏃‍♀️💨",
    audio: "assets/Music/Q4_Following Her.mp3",
  },
  {
    id: 5,
    question: "One of my Favourite photo of all time, this actually happened when we are going out for this movie",
    options: [
      "Captain Miller",
      "Lubber bandhu",
      "Dragon",
      "Ponniyin selvan"
    ],
    correctIndex: 3, // Ponniyin selvan
    memoryImage: "assets/Images/Q5_Favorite_Photo.jpg",
    memoryCaption: "Such a beautiful day with you! 🍿",
    audio: "assets/Music/Q5_Aga Naga Ringtone.mp3",
  },
  {
    id: 6,
    question: "What is the favourite gift which you have given to me",
    options: [
      "Photo Diary",
      "Frame",
      "Youuuuuuuuuuuuu",
      "Computer desk doll"
    ],
    correctIndex: 2, // Youuuuuuuuuuuuu
    memoryImage: "assets/Images/Q6_First_Gift.jpg",
    memoryCaption: "The best gift I could ever ask for! 🎁💕",
    audio: "assets/Music/Q6_Pattuma.mp3",
  },
  {
    id: 7,
    question: "Which member of your family i did meet first",
    options: [
      "Your dad",
      "Your Mom",
      "Your brother"
    ],
    correctIndex: 2, // Your brother
    memoryImage: "assets/Images/Q7_First_In_Family.jpg",
    memoryCaption: "A nervous but memorable first meet! 👨‍👩‍👦",
    audio: "assets/Music/Q7_siddharth abhimanyu bgm.mp3",
  },
  {
    id: 8,
    question: "When was the first time you came with me as a passenger in two wheeler",
    options: [
      "To SS Hyderabad",
      "To VR Mall",
      "To Phoenix Mall",
      "To Nandhana Palace"
    ],
    correctIndex: 0, // To SS Hyderabad
    memoryImage: "assets/Images/Q8_Bike_Ride.jpg",
    memoryCaption: "Best ride ever! 🏍️",
    audio: "assets/Music/Q8_Bike_Ride.mp3",
  },
  {
    id: 9,
    question: "Our unexpected twinning moment happened at",
    options: [
      "Phoenix mall bangalore",
      "Church Street Koramangala",
      "Nexus mall Koramangala"
    ],
    correctIndex: 0, // Phoenix mall bangalore
    memoryImage: "assets/Images/Q9_Unexpected_Twinning.jpg",
    memoryCaption: "Great minds think (and dress) alike! 👯‍♀️",
    audio: "assets/Music/Q9_Finding Love.mp3",
  },
  {
    id: 10,
    question: "Our Caffffffeeee ?",
    options: [
      "Hidden Fork",
      "Creamery",
      "High For this"
    ],
    correctIndex: 1, // Creamery
    memoryImage: "assets/Images/Q10_Our_Cafe.jpg",
    memoryCaption: "Our favorite spot! ☕️",
    audio: "assets/Music/Q10_Kuru_Kuru.mp3",
  },
  {
    id: 11,
    question: "One of the surprise visit which you gave me, i liked it actually when remembering it now",
    type: "text",
    regex: /prozone/i,
    actualAnswer: "Prozone Mall",
    memoryImage: "assets/Images/Q11_Surprise_Visit.jpg",
    memoryCaption: "Best surprise visit ever! 🥺",
    audio: "assets/Music/Q11_Soulmates Unite.mp3",
  },
  {
    id: 12,
    question: "Place where one of my favorite photo was taken (where you would rest your face on my shoulders)",
    type: "text",
    regex: /koramangala|park/i,
    actualAnswer: "Koramangala Park",
    memoryImage: "assets/Images/Q12_Shoulder_Photo.jpg",
    memoryCaption: "My favorite shoulder rest! 🥰",
    audio: "assets/Music/Q12_Tharame Tharame.mp3",
  },
  {
    id: 13,
    question: "Platform la picha edukara pose, epo nadandhuchu idhu?",
    options: [
      "During our placement class",
      "Yuktha College",
      "Annual Day",
      "Hackfest"
    ],
    correctIndex: 1, // Yuktha College
    memoryImage: "assets/Images/Q13_Platform_Pose.jpg",
    memoryCaption: "Hilarious memories! 😂",
    audio: "assets/Music/Q13_Thanga Pushpam.mp3",
  }
];

export default quizData;
