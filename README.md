# WEB3 Suite Snap
A decentralized productivity suite for a decentralized web using metamask snaps


<ol>
<li>DECENTRALIZED Notes app</li>
A multi purpose notes snap that can serve as vault , address book, notes app etc.
Substitute to vault, contacts and keep
<li>Chit chat</li>
A chating app based upon decentralized graph database (gun.js)
substitute to google chat (g-suite)

<li>AN Event planner </li>
Be the true owner of your event planning
Substitute to google calendar.



<li>NEWS api </li>
A custom news search engine using newsapi
substitute to chrome news search
A custom news search engine using newsapi
substitute to chrome news search




In `snap.manifest.json` modified `initialPermissions` to include necessary permission:
```JSON
"initialPermissions": {
  "snap_confirm": {},
  "snap_manageState": {},
  "endowment:network-access": {}
},
```

### Dependencies
```Javascript
gun.js

```

Clone the current repository [WEB3 Suite Snap](https://github.com/amritanshu19/web3-suite-snap)
and then run the following commands.
```Shell
yarn install

yarn build

yarn serve
```

developed with snap which uses encryption to store title and content securely inside of a Snap! and works in more secured way than google suit.

