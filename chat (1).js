
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAzhN_lCYcajNSklVmyXYwpPaAxgOePkkk",
  authDomain: "juatz-chat-c8d24.firebaseapp.com",
  projectId: "juatz-chat-c8d24",
  storageBucket: "juatz-chat-c8d24.appspot.com",
  messagingSenderId: "197046464153",
  appId: "1:197046464153:web:8d78e692b8d3f36726d208",
  measurementId: "G-DPRYZW6XRB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.sendMessage = async function () {
  const username = document.getElementById("username").value || "Mgeni";
  const expert = document.getElementById("expert").value;
  const message = document.getElementById("messageInput").value;

  if (message.trim() !== "") {
    await addDoc(collection(db, "chats"), {
      user: username,
      to: expert,
      text: message,
      timestamp: new Date()
    });
    document.getElementById("messageInput").value = "";
  }
};

const chatBox = document.getElementById("chatBox");
const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));

onSnapshot(q, (snapshot) => {
  chatBox.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    chatBox.innerHTML += `<p><strong>${data.user} kwa ${data.to}:</strong> ${data.text}</p>`;
  });
  chatBox.scrollTop = chatBox.scrollHeight;
});
