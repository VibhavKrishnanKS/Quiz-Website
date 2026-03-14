// Quiz Questions Data
// Add new questions here — the quiz will automatically pick them up!
// correctIndex: 0 = A, 1 = B, 2 = C, 3 = D
// audio: (optional) background music that loops while the question is active

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
    correctIndex: 0, // A — Change this if needed!
    memoryImage: "/assets/Question1_Dress.jpeg",
    memoryCaption: "Our very first selfie together! 💕",
    audio: "/assets/Manjal_Veyil_Q1.mpeg",
  },
  // Add more questions below in the same format:
  // {
  //   id: 2,
  //   question: "Your question here?",
  //   options: ["Option A", "Option B", "Option C", "Option D"],
  //   correctIndex: 0,
  //   memoryImage: "/assets/Question2_Image.jpeg",
  //   memoryCaption: "A beautiful memory! ✨",
  // },
];

export default quizData;
