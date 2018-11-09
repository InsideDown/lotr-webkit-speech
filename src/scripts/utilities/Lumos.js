import Events from '../config/Events';
import Utils from '../utilities/Utils';

class Lumos {
  constructor(options) {
    console.log(this);
    //list of actions for each array of words
    this.actionsArray = [
      {
        words: ['melon', 'madeline', 'nylon', 'melena', 'matlock', 'maryland'],
        callback: this.lightsOn.bind(this),
        callbackParams: Utils.rgbToXY(0,0,255)
      }, 
      {
        words: ['lu', 'lumos', 'loo', 'lou', 'neumo', 'lum', 'limo', 'logo', 'lowe', 'mouse', 'lil'],
        callback: this.lightsOn.bind(this),
        callbackParams: Utils.rgbToXY(255,255,255)
      },
      {
        words: ['red', 'read'],
        callback: this.lightsOn.bind(this),
        callbackParams: Utils.rgbToXY(255,0,0)
      },
      {
        words: ['orange'],
        callback: this.lightsOn.bind(this),
        callbackParams: Utils.rgbToXY(255,204,0)
      },
      {
        words: ['yellow'],
        callback: this.lightsOn.bind(this),
        callbackParams: Utils.rgbToXY(255,255,0)
      },
      {
        words: ['green'],
        callback: this.lightsOn.bind(this),
        callbackParams: Utils.rgbToXY(84,107,45)
      },
      {
        words: ['blue'],
        callback: this.lightsOn.bind(this),
        callbackParams: Utils.rgbToXY(0,0,255)
      },
      {
        words: ['purple', 'viol'],
        callback: this.lightsOn.bind(this),
        callbackParams: Utils.rgbToXY(150,0,204)
      },
      {
        words: ['avada', 'kedavra', 'expecto', 'patron'],
        callback: this.lightsAnimation.bind(this)
      },
      {
        words: ['ox', 'ocks', 'lights off'],
        callback: this.lightsOff.bind(this)
      }
    ];

    this.audio = new Audio('/assets/audio/lights-audio.mp3');
    this.lightTimer = 10000;    //how long should the light stay on 
    this.lightOnTimeout = null;
    this.actionsArrayLength = this.actionsArray.length;
    this.addListeners();
  }

  /**
   * turn our lights on
   */
  lightsOn(options) {
    let self = this;
    let jsonObj = {
        "bri":254,
        "on": true,
        "sat":254//,
        //"transitiontime": 0
    };

    if(options) {
      jsonObj.xy = [options.x, options.y];
    }
    if(self.lightOnTimeout !== null) { clearTimeout(self.lightsOnTimeout); }

    Utils.putRequest({json:jsonObj, callback: function(options) {
        if(options.error){
          console.error('lights on error: ', options.error);
        }else{
          console.log('lights on');
          self.lightOnTimeout = setTimeout(function(){
            self.lightsOff();
          }.bind(this), self.lightTimer);
        }
      }
    });
  }

  /**
   * set our lights to a certain color
   */
  lightsAnimation() {
    let animColors = [
      Utils.rgbToXY(255,0,0), Utils.rgbToXY(0,255,0), Utils.rgbToXY(0,0,255),
      Utils.rgbToXY(255,0,0), Utils.rgbToXY(0,255,0), Utils.rgbToXY(0,0,255),
      Utils.rgbToXY(255,0,0)
    ];
    let animTiming = 2200;
    let counter = 0;
    let animColorLen = animColors.length;
    this.lightsOn(animColors[0]);
    this.audio.play();

    let lightInterval = setInterval(function() {
      if(counter <= animColorLen - 1) {
        counter++;
        this.lightsOn(animColors[counter]);
      }else {
        this.lightsOff();
        clearInterval(lightInterval);
      }
    }.bind(this), animTiming);
  }

  /**
   * turn our lights off
   */
  lightsOff() {
    Utils.putRequest({json:{on:false}, callback: function(options) {
        if(options.error){
          console.error('lights off error: ', options.error);
        }else{
          console.log('lights off');
        }
      }
    });
  }

  //*************
  //EVENTS
  //*************
  addListeners() {
    $(document).on(Events.LIGHTS_EVENT, this._onLightVoiceEvent.bind(this));
  }

  _onLightVoiceEvent(event, voiceTxt) {
    let i = 0;
    let j = 0;
    let curWord;
    for(i=0;i<this.actionsArrayLength;i++){
      for(j=0;j<this.actionsArray[i].words.length;j++){
        curWord = this.actionsArray[i].words[j];
        if(voiceTxt.indexOf(curWord) !== -1){
            this.actionsArray[i].callback(this.actionsArray[i].callbackParams);
            return;
        }
      }
    }
  }
}

export default Lumos;
