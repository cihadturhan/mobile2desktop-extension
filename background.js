
const socket = io('https://mobile2desktop.herokuapp.com', {jsonp: false});
const ba = chrome.browserAction;
const rt = chrome.runtime;

rt.onMessage.addListener((message)=>{
  setAllRead();
});

const list = [];
var joined = false;
var content = 'Hello World';
//setAllRead();

socket.on('connect', () => {
  console.log('connected!');

  register();
}).on('conn_error', (...args)=>{
  console.error(args);
});

function register() {
  socket.emit('register', 'uid1');
  console.log('register!');
  joined = true;

}

function sendMessage() {
  if (joined) {
    console.log('message send');
    socket.emit('message', content)
  }
}

socket.on('disconnect', ()=> {
  console.log('disconnected');
});

socket.on('message', (message)=> {
  console.log('message');
  list.unshift({
    uid: 0,
    message,
    createdAt: moment()
  });
  setUnread(list.length)
});

function setAllRead() {
  ba.setBadgeBackgroundColor({color: [0, 255, 0, 128]});
  ba.setBadgeText({text: ''});   // <-- set text to '' to remove the badge
}

function setUnread(unreadItemCount) {
  ba.setBadgeBackgroundColor({color: [255, 0, 0, 128]});
  ba.setBadgeText({text: ' '});
}