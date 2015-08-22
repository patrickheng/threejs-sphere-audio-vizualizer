var Audio = (function() {
	// Define how much information your want to get from the original frequency data
	// Here 3 for TREBLE, MEDIUM and BASS
	var SEP_VALUE  = 3;

	function Audio() {

		var self = this;

		this.ctx = new AudioContext();
		this.audio = document.getElementById('myAudio');
		this.audioSrc = this.ctx.createMediaElementSource(this.audio);
		this.analyser = this.ctx.createAnalyser();
		this.audioData = [];

		// Connect the MediaElementSource with the analyser
		this.audioSrc.connect(this.analyser);
		this.audioSrc.connect(this.ctx.destination);

		// FrequencyBinCount tells how many values are receive from the analyser
		this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

		this.audio.play();
	};


	Audio.prototype.getFrequencyData = function() {
		this.analyser.getByteFrequencyData(this.frequencyData);
		return this.frequencyData;
	};

	Audio.prototype.getAudioData = function() {
		this.analyser.getByteFrequencyData(this.frequencyData);

		// Split array into 3
		var frequencyArray = this.splitFrenquencyArray(this.frequencyData, SEP_VALUE);
		// Make average of frenquency array entries
		for(var i = 0; i < frequencyArray.length; i++) {
			var average = 0;

			for(var j = 0; j < frequencyArray[i].length; j++) {
				average += frequencyArray[i][j];
			}
			this.audioData[i] = average/frequencyArray[i].length;
		}
		return this.audioData;
	}

	Audio.prototype.splitFrenquencyArray = function (arr, n){
		var tab = Object.keys(arr).map(function (key) {return arr[key]});
		var len = tab.length,
			result = [],
			i = 0;

		while (i < len) {
			var size = Math.ceil((len - i) / n--);
			result.push(tab.slice(i, i + size));
			i += size;
		}
		return result;
	}

	return Audio;
})();