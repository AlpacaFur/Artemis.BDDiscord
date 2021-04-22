//META{"name":"ArtemisGSI","website":"https://artemis-rgb.com/","source":"https://github.com/AlpacaFur/Artemis.BDDiscord"}*//

function getModule (props) {
return BdApi.findModuleByProps.apply(null, props);
}

module.exports = class ArtemisGSI {
    getName () {
        return 'ArtemisGSI';
    }

    getDescription () {
        return 'Sends information to Artemis about various Discord components.';
    }

    getVersion () {
        return '4.2.0';
    }

    getAuthor () {
        return 'Popato, DrMeteor, AAGaming, AlpacaFur';
    }

    getChanges () {
        return {
        '1.0.0' :
                    `
                        Initial version.
                    `,
        '1.0.1' :
                    `
                        Added conditions for only reacting to local user.
                    `,
        '1.0.2' :
                    `
                        Removed isBeingCalled.
                        Removed redundant loop.
                    `,
        '1.0.3' :
                    `
                        Updated the CDN for the library.
                    `,
        '1.1' :
                    `
                        Made the state only be sent if it changed.
                    `,
        '2.0' :
                    `
                        Version bump to stop the update prompt derping.
                    `,
        '2.1.0':
                    `
                        Allow to track mute/deafen statuses outside voice channels.
                        Fix unread status for Enhanced Discord users.
                        Actually fix self-updating loop
                    `,
        '2.1.1':
                    `
                        Fix "being_called" boolean so it's now usable (triggers when user calls and getting called in DMs)
                    `,
        '2.2.0':
                    `
                        Rewrite a bunch of stuff
                    `,
        '2.3.0':
                    `
                        Ported rewrite from AAGaming
                    `,
        '3.0.0':
                    `
                        Edited to work with Artemis
                    `,
        '4.0.0':
                    `
                        Changed the endpoint url from main to betterDiscordData.
                    `,
        '4.0.1':
                    `
                        Artemis-side changes to bump Nuget packages
                    `,
        '4.1.0':
                    `
                        Added the option to override the URL.
                    `,
        '4.2.0':
                    `
                        Added the option to specify local network URLs and added last request response indicator.
                    `
        };
    }

  getSettingsPanel() {
    let div = document.createElement("div")
    div.classList.add("artemis-rgb-settings")
    let label = document.createElement("label")
    label.textContent = "Host URL (leave empty to fetch from Artemis):"

    let innerContainer = document.createElement("div")
    let http = document.createElement("p")
    http.textContent = "http://"

    let input = document.createElement("input")
    input.setAttribute("placeholder", this.urlToFormat(this.defaultUrl) || "Unable to load default URL")
    input.setAttribute("value", this.currentUrl())

    innerContainer.append(http, input)

    let button = document.createElement("button")
    button.textContent = "Set URL"
    
    let currentUrlLabel = document.createElement("p")
    currentUrlLabel.textContent = "Current URL:"
    let currentUrl = document.createElement("p")
    currentUrl.textContent = this.currentUrl() || "No URL set!"

    let lastReq = document.createElement("p")
    lastReq.textContent = "Last Request: "
    let status = document.createElement("span")
    status.classList.remove("success")
    status.classList.remove("error")
    status.classList.add(this.lastRequestWasError ? "error" : "success")
    status.textContent = this.lastRequestWasError ? "Error" : "Success"
    lastReq.append(status)

    button.addEventListener("click", ()=>{
      if (input.value.startsWith("http://")) input.value = input.value.slice(7)
      if (input.value.trim() == "") {
        if (this.defaultUrl) {
          this.setUrl(this.defaultUrl)
          currentUrl.textContent = this.currentUrl()
          BdApi.saveData("ArtemisGSI", "endpoint-url", "")
          status.classList.remove("error", "success")
          status.classList.add("pending")
          status.textContent = "Pending..."
          this.sendJsonViaHttp(this.json, (error)=>{
            status.classList.remove("pending")
            status.classList.add(error ? "error" : "success")
            status.textContent = error ? "Error" : "Success"
          })
        }
        else {
          this.invalidateUrl()
          currentUrl.textContent = "No URL set!"
          BdApi.saveData("ArtemisGSI", "endpoint-url", "")
          BdApi.showToast("URL Reset to default, but the default couldn't be found!", {type:"warn"})
        }
      }
      else {
        let error = this.setUrl(input.value)
        if (error) {
          BdApi.showToast("Invalid URL!", {type:"error"})
        }
        else {
          currentUrl.textContent = this.currentUrl()
          BdApi.saveData("ArtemisGSI", "endpoint-url", this.currentUrl())
          BdApi.showToast("URL successfully saved!", {type:"success"})
          status.classList.remove("error", "success")
          status.classList.add("pending")
          status.textContent = "Pending..."
          this.sendJsonViaHttp(this.json, (error)=>{
            status.classList.remove("pending")
            status.classList.add(error ? "error" : "success")
            status.textContent = error ? "Error" : "Success"
          })
          
        }
      }
    })
    let style = document.createElement("style")
    style.textContent = `.artemis-rgb-settings{padding:20px;box-sizing:border-box;border-radius:10px}.artemis-rgb-settings label,.artemis-rgb-settings p:nth-child(5){font-weight:bold}.artemis-rgb-settings div{display:flex;align-items:center}.artemis-rgb-settings > div > p{margin:9px 0 0;font-family:monospace}.artemis-rgb-settings input{background-color:var(--artemis-rgb-el);border:none;padding:5px 10px;border-radius:5px;color:var(--artemis-rgb-fg);font-family:monospace;width:100%;box-sizing:border-box;margin-top:10px}.artemis-rgb-settings > button{margin:5px 0;padding:10px 22px;background-color:#3E82E5;color:white;border-radius:3px;border:none;transition:background-color 0.15s ease}.artemis-rgb-settings > button:hover{background-color:#3875CE}.artemis-rgb-settings > button:active{background-color:#3268B7}.theme-light .artemis-rgb-settings{color:black;background-color:#ffffff;--artemis-rgb-bg:#ffffff;--artemis-rgb-fg:black;--artemis-rgb-el:#ddd}.theme-dark .artemis-rgb-settings{color:white;background-color:#36393F;--artemis-rgb-bg:#36393F;--artemis-rgb-fg:white;--artemis-rgb-el:#4c5059}.artemis-rgb-settings > p:nth-child(6){font-family:monospace}.artemis-rgb-settings span{padding:0 7px;border-radius:4px}.artemis-rgb-settings span.error{background-color:#982929}.artemis-rgb-settings span.success{background-color:green}.artemis-rgb-settings span.pending{background-color:#AB892E}`
    div.append(style, label, innerContainer, button, currentUrlLabel, currentUrl, lastReq)
    return div
  }

  getSelectedGuild () {
    const channel = this.getChannel(this.channels.getChannelId())
    return channel ? this.getGuild(channel.guild_id) : null;
  }

  getSelectedTextChannel () {
    return this.getChannel(this.channels.getChannelId());
  }

  getSelectedVoiceChannel () {
    return this.getChannel(this.channels.getVoiceChannelId());
  }

  getLocalStatus () {
    return this.getStatus(this.getCurrentUser().id);
  }

  load () {}// legacy

  urlToFormat(url) {
    try {
      url = new URL(url)
    }
    catch {
      console.error("[ArtemisGSI]: Invalid url:", x)
      return true
    }
    return url.hostname + ':' + url.port
  }

  currentUrl() {
    return this.host + ":" + this.port
  }

  invalidateUrl() {
    this.host = undefined
    this.port = undefined
  }

  setUrl(x, showErrors) {
    if (!x.startsWith("http://")) x = "http://" + x
    let url;
    try {
      url = new URL(x)
    }
    catch {
      console.error("[ArtemisGSI]: Invalid url:", x)
      return true
    }
    if (!url.port) {
      if (showErrors) BdApi.showToast("Please specify a port!", {type:"error"})
      return true
    }
    if (!url.host) {
      if (showErrors) BdApi.showToast("Please specify a host!", {type:"error"})
      return true
    }
    this.host = url.hostname
    this.port = url.port
    return false
  }

  start () {

    this.savedUrl = BdApi.loadData("ArtemisGSI", "endpoint-url") || ""

    let fs = require("fs")
    if (fs.existsSync("C:/ProgramData/Artemis/webserver.txt")) {
      this.defaultUrl = fs.readFileSync("C:/ProgramData/Artemis/webserver.txt", 'utf8')
      if (this.defaultUrl.startsWith("http://*:")) this.defaultUrl = "http://localhost:" + this.defaultUrl.slice(9);
    }
    else if (!this.savedUrl) {
      BdApi.alert("Plugin Error","Artemis doesn't seem to be installed! Couldn't find the webserver.txt file at \"C:/ProgramData/Artemis/webserver.txt\" \n\n If you know that it is installed, please set a host URL in settings!")
    }

    if (this.savedUrl) this.setUrl(this.savedUrl)
    else if (this.defaultUrl) { 
      let error = this.setUrl(this.defaultUrl)
      if (error) BdApi.alert("Plugin Error",`There is no saved URL and the one Artemis provided (${this.defaultUrl}) cannot be parsed. Please report this error!`)
    }
    console.log(`[ArtemisGSI]: Using host "${this.host}" and port "${this.port}"`)

    this.http = require("http")
    this.lastRequestWasError = false
    this.json = {
      user:{
        id: -1,
        status: 'undefined',
        self_mute: false,
        self_deafen : false,
        mentions: false,
        unread_messages: false,
        being_called: false
      },
      guild: {
        id: -1,
        name: ''
      },
      text: {
        id: -1,
        type: -1,
        name: ''
      },
      voice: {
        id: -1,
        type: -1,
        name: ''
      }
    };
    // eslint-disable-next-line no-unused-expressions
    this.lastJson;
    this.getCurrentUser = getModule([ 'getUser', 'getUsers' ], false).getCurrentUser;
    this.getStatus = getModule([ 'getApplicationActivity' ], false).getStatus;
    this.getChannel = getModule([ 'getChannel' ], false).getChannel;
    this.getGuild = getModule([ 'getGuild' ], false).getGuild;
    this.channels = getModule([ 'getChannelId' ], false);
    const { getUser } = getModule([ 'getUser' ], false),
      voice = getModule([ 'isMute', 'isDeaf', 'isSelfMute', 'isSelfDeaf' ], false),
      { getCalls } = getModule([ 'getCalls' ], false),
      { getUnreadGuilds } = getModule([ 'getUnreadGuilds' ], false),
      { getTotalMentionCount } = getModule([ 'getTotalMentionCount' ], false),
      isMute = voice.isMute.bind(voice),
      isDeaf = voice.isDeaf.bind(voice),
      isSelfMute = voice.isSelfMute.bind(voice),
      isSelfDeaf = voice.isSelfDeaf.bind(voice);
      /*
       * { getChannel } = getModule([ 'getChannel' ], false), // we dont use this yet
       * const { getVoiceStates } = getModule([ 'getVoiceState' ], false),
       */
    
    this.updatetimer = setInterval(() => {
      // eslint-disable-next-line consistent-this
      const guild = this.getSelectedGuild();
      const localUser = this.getCurrentUser();
      const localStatus = this.getLocalStatus();
      const textChannel = this.getSelectedTextChannel();
      const voiceChannel = this.getSelectedVoiceChannel();
      /*
       * if (voiceChannel) {
       *   var voiceStates = getVoiceStates(voiceChannel.guild_id);
       * } not implemented
       */

      if (localUser && localStatus) {
        this.json.user.id = localUser.id;
        this.json.user.status = localStatus;
      } else {
        this.json.user.id = -1;
        this.json.user.status = '';
      }

      if (guild) {
        this.json.guild.id = guild.id;
        this.json.guild.name = guild.name;
      } else {
        this.json.guild.id = -1;
        this.json.guild.name = '';
      }

      if (textChannel) {
        this.json.text.id = textChannel.id;
        if (textChannel.type === 0) { // text channel
          this.json.text.type = 0;
          this.json.text.name = textChannel.name;
        } else if (textChannel.type === 1) { // pm
          this.json.text.type = 1;
          this.json.text.name = getUser(textChannel.recipients[0]).username;
        } else if (textChannel.type === 3) { // group pm
          this.json.text.type = 3;
          if (textChannel.name) {
            this.json.text.name = textChannel.name;
          } else {
            let newname = '';
            for (let i = 0; i < textChannel.recipients.length; i++) {
              const user = textChannel.recipients[i];
              newname += `${getUser(user).username} `;
            }
            this.json.text.name = newname;
          }
        }
      } else {
        this.json.text.id = -1;
        this.json.text.type = -1;
        this.json.text.name = '';
      }

      if (voiceChannel) {
        if (voiceChannel.type === 1) { // call
          this.json.voice.type = 1;
          this.json.voice.id = voiceChannel.id;
          this.json.voice.name = getUser(voiceChannel.recipients[0]).username;
        } else if (voiceChannel.type === 2) { // voice channel
          this.json.voice.type = 2;
          this.json.voice.id = voiceChannel.id;
          this.json.voice.name = voiceChannel.name;
        } else if (voiceChannel.type === 3) { // group call
          this.json.voice.type = 3;
          this.json.voice.id = voiceChannel.id;
          this.json.voice.name = voiceChannel.name;
        }
      } else {
        this.json.voice.id = -1;
        this.json.voice.type = -1;
        this.json.voice.name = '';
      }

      this.json.user.self_mute = isSelfMute();
      this.json.user.self_deafen = isSelfDeaf();
      this.json.user.mute = isMute();
      this.json.user.deafen = isDeaf();

      this.json.user.unread_messages = false;
      this.json.user.mentions = false;
      this.json.user.being_called = false;

      this.json.user.mentions = getTotalMentionCount();
      this.json.user.unread_messages = Object.values(getUnreadGuilds()).length;

      if (getCalls().filter((x) => x.ringing.length > 0).length > 0) {
        this.json.user.being_called = true;
      }

      if (JSON.stringify(this.json) !== this.lastJson) {
        this.lastJson = JSON.stringify(this.json);
        this.sendJsonViaHttp(this.json);
      }
    }, 100);
  }

  async sendJsonToArtemis (json) {
    fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(json),
      mode:'no-cors',
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .catch(error => console.log(`Artemis GSI error: ${error}`));
  }

  sendJsonViaHttp(json, callback) {
    if (!this.host || !this.port) {
      console.warn("[ArtemisGSI] Host or port is undefined!")
    }

    const data = JSON.stringify(json)

    const req = http.request({
      hostname: this.host,
      port: this.port,
      path: '/plugins/de1123d1-4ce5-418f-a761-20ed2ffb9566/betterDiscordData',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }, _=>{
      this.lastRequestWasError = false
      if (callback) callback(false)
    })

    req.on("error", (e)=>{ 
      console.error(e)
      this.lastRequestWasError = true  
      if (callback) callback(true)
    })

    req.write(data)
    req.end()
  }

  stop () {
    clearInterval(this.updatetimer);
    // this.unpatch();
    this.ready = false;
  }
};