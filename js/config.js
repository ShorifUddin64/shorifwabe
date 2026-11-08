/* ============ EDIT YOUR CONTENT HERE ============ */
const CONFIG={
  brand:"yourname.com",
  email:"hello@yourname.com",
  bossQuestion:"How did you like the website?",
  sampleReply:"I really liked it. The website feels alive, and I can see exactly how you work.",
  bossAnswers:[
    "Thank you! That means a lot. If you have a project in mind, send me a message at hello@yourname.com.",
    "Glad you enjoyed the tour. I build things like this for clients too. Let’s talk!",
    "Great to hear. Want something similar for your own business? Email me anytime."
  ],
  rooms:[
    {name:"Reception",title:"How can I help you?",cap:"A personal welcome",sub:"Follow the receptionist, meet the boss and head home.",text:"Welcome in! Make yourself at home.",tags:[]},
    {name:"Work Studio",title:"Projects",cap:"The work studio",sub:"Where the real building happens.",text:"This is where I build AI apps, websites and automations. Replace this text with your best project and what it achieved.",tags:["AI apps","Websites","Automation"]},
    {name:"Design Room",title:"Design",cap:"The design room",sub:"Layouts, colour and motion.",text:"Clean interfaces and smooth animation. Describe your design style and tools here.",tags:["UI/UX","Figma","Motion"]},
    {name:"Meeting Room",title:"Services",cap:"The meeting room",sub:"How we can work together.",text:"List what you offer: landing pages, chatbots, custom tools. Keep it short and clear.",tags:["Landing pages","Chatbots","Custom tools"]},
    {name:"Operations",title:"Process",cap:"Operations",sub:"From idea to launch.",text:"Idea, design, build, test, launch. Explain how long each step takes and how you communicate.",tags:["Plan","Build","Launch"]},
    {name:"The Lounge",title:"About me",cap:"The lounge",sub:"A little bit about the person behind it.",text:"Write two or three lines about yourself, your story and what you enjoy outside work.",tags:["Curious","Fast learner","Coffee"]},
    {name:"Boss Cabin",title:"The boss asks",cap:"A conversation with the boss",sub:"A personal question and a positive first impression.",text:"",tags:[]}
  ]
};
/* ================================================= */

/* ---- optional real people (.glb) : see models/README.md. Missing files are ignored. ---- */
const MODELS={
  people:["models/person1.glb","models/person2.glb","models/person3.glb"],
  boss:"models/boss.glb",recep:"models/recep.glb",visitor:"models/visitor.glb",guard:"models/guard.glb",
  idle:"models/idle.glb",walk:"models/walk.glb",sit:"models/sit.glb",run:"models/run.glb",
  wave:"models/wave.glb",knock:"models/knock.glb",water:"models/water.glb",
  height:1.78,walkTimeScale:2
};
/* ---- optional real photo textures (jpg) : see textures/README.md. Missing files are ignored. ---- */
const REALTEX={asphalt:"textures/asphalt.jpg",grass:"textures/grass.jpg",wood:"textures/wood.jpg",sky:"textures/sky.jpg",tileScale:{grass:2,wood:1}};
