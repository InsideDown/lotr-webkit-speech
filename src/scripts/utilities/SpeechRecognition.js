import Events from '../config/Events';

class SpeechRecognition {
  constructor(options) {
    this.$el = options.$el;
    this.$btnStop = options.$btnStop ? options.$btnStop : null;
    this.$log = options.$log ? options.$log : null;
    this.ignoreOnEnd = options.ignoreOnEnd ? options.ignoreOnEnd : false;

    this.recognizing = false;
    this.stopBtnClicked = false;

    this.init();
  }

  init() {
    if (!('webkitSpeechRecognition' in window)) {
      console.error("speech recognition not supported");
    } else {
      this.initSpeechRecognition();
      this.addListeners();
    }
  }

  //*************
  //METHODS
  //*************
  /**
   * initialze our speech recognition vars
   */
  initSpeechRecognition() {
    if(this.recognition) { this.recognition.stop(); }
    let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    //continually allow speech
    this.recognition.continuous = true;
    //results returned by recognizer will not change
    this.recognition.interimResults = false;
    //define our grammar
    // let colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral' ];
    // let grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';
    // let speechRecognitionList = new SpeechGrammarList();
    // speechRecognitionList.addFromString(grammar, 1);
    // this.recognition.grammars = speechRecognitionList;
  }

  /**
   * kick off our speech recognition
   */
  startRecognition() {
    if(this.recognizing) {
      this.recognition.stop();
    }
    this.recognition.start();
  }

  stopRecognition() {
    if(this.recognizing) {
      this.recognizing = false;
      this.recognition.stop();
    }
  }

  /**
   * restart speech recognition if it stops
   */
  resetRecognition() {
    console.log('resetting recog ---');
    this.recognizing = false;
    this.recognition.stop();

    this.startRecognition();
  }

  //*************
  //EVENTS
  //*************
  addListeners() {
    this.$el.on('click', this.onStartClick.bind(this));
    if(this.$btnStop) { this.$btnStop.on('click', this.onStopClick.bind(this)); }


    this.recognition.onstart = function() {
      console.log("recognition start");
      this.recognizing = true;
    }.bind(this);

    this.recognition.onerror = function(event) {
      this.recognizing = false;
      console.log('--- recognition error -----');
      console.error(event.error);
    }.bind(this);

    this.recognition.onend = function(event) {
      //console.log('recognition end');
      if(this.ignoreOnEnd && !this.stopBtnClicked) {
        //console.log('ignoring end ---');
        this.resetRecognition();
        return;
      }else {
        this.stopBtnClicked = false;
      }
    }.bind(this);

    this.recognition.onresult = function(event) {
      //console.log('recognition result');
      let curIndex = event.resultIndex;
      let curEventResponse = event.results[curIndex];
      let curResponseText;
      let curConfidence;
      if(curEventResponse.isFinal) {
        curResponseText = curEventResponse[0].transcript.toLowerCase();
        curConfidence = curEventResponse[0].confidence;
        $( document ).trigger( Events.LIGHTS_EVENT, [ curResponseText ] );
        if(this.$log) {
          this.$log.html(this.$log.html() + '<br />' + curResponseText + ", " + curConfidence);
        }
        this.stopRecognition();
        //this.resetRecognition();
      }
    }.bind(this);
  }

  onStartClick(event) {
    event.preventDefault();
    this.startRecognition();
  }

  onStopClick(event) {
    event.preventDefault();
    this.stopBtnClicked = true;
    this.stopRecognition();
  }

}

export default SpeechRecognition;
