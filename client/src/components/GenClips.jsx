import axios from 'axios';
import React, { useState } from 'react';

const GenClips = () => {
  const [voiceType, setVoiceType] = useState(["Male", "Female"]);
  const [selectedVoiceType, setSelectedVoiceType] = useState("Male");

  const [volume, setVolume] = useState(10);
  const [voiceSpeed, setVoiceSpeed] = useState(9);
  const [pitch, setPitch] = useState(1);
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  // New state for source and target languages
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("en");

  const API_KEY = 'AIzaSyCMJ05_dwlQH6ipqi-7lOuxRcSQYw2-n2Q';

  //Function to translate text using the translate API
  const translateText = async (myText) => {
    if (sourceLang === targetLang) {
      console.log("Will not translate!");
      setTranslatedText(myText);
      return myText;
    } else {
      console.log("Translating..");
      const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=${sourceLang}&target=${targetLang}&q=${encodeURIComponent(myText)}`;

      try {
        const response = await axios.get(url);
        const translatedText = response.data.data.translations[0].translatedText;
        setTranslatedText(translatedText);
        return translatedText;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    }
  }

  // Function to read text aloud using Web Speech API
  const readText = async () => {
    const XI_API_KEY = 'sk_1fa718e479887812560ae779d9acff5a07f721d8261d2837';
    let VOICE_ID = '';

    if(selectedVoiceType === "Male") {
      VOICE_ID = 'pqHfZKP75CvOlQylNhV4';
    } else {
      VOICE_ID = '9BWtsMINqrJLrRacOk9x';
    };

    const finalText = await translateText(text);
    setTranslatedText(finalText);

    if (!finalText) {
      alert("Please enter text to be read or translated.");
      return;
    }
    
    try {
        const response = await axios({
          method: 'post',
          url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
          headers: {
            "Accept": "application/json",
            "xi-api-key": XI_API_KEY,
            "Content-Type": "application/json"
          },
          data: {
            text: finalText,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.9,
              similarity_boost: 0.5,
              pitch: pitch
            }
          },
          responseType: 'arraybuffer'  // set to arraybuffer to handle binary audio data
        });
        return response.data;

    } catch (error) {
        console.error('Error generating speech:', error.response || error);
    }
  };

  const TTSread = async () => {
    const voiceData = await readText();
    
    if (voiceData) {
        // Create a Blob from the response data and play it
        const audioBlob = new Blob([voiceData], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        // Apply volume and speed adjustments directly to the Audio element
        audio.volume = volume / 10; // Set volume (scaled from 0-1)
        audio.playbackRate = voiceSpeed / 10; // Adjust playback rate for speed

        audio.play().catch((error) => {
            console.error("Error playing audio:", error);
        });
    } else {
        console.error("Failed to retrieve voice data.");
    }
  };

  const TTSsave = async () => {
    const voiceData = await readText();
    
    if (voiceData) {
        // Convert to base64 if not already in that format
        const base64Audio = btoa(
            new Uint8Array(voiceData).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        // Write the response data (audio) to an MP3 file
        try {
            const response = await axios.post('http://localhost:3001/save-audio', { audioData: base64Audio });
            console.log(response.data);
            alert('Audio file saved as output.mp3');
        } catch (error) {
            console.error('Error saving audio:', error);
        }
    };
  };


  return (
    <div className="md:mt-20 md:px-20">
      <main className="border rounded-xl p-4 bg-indigo-950 max-w-[1200px] mx-2 md:mx-auto">
        <h1 className="mt-6 mb-12 text-3xl">VocaliseIt</h1>
        <section className="container">
          <div className="grid">
            <label className="" htmlFor="Voice">
              Voice Options
            </label>
            <select
              id="Voice"
              value={selectedVoiceType}
              onChange={(e) => setSelectedVoiceType(e.target.value)}
            >
              {voiceType.map((voice, index) => (
                <option key={index} value={voice}>
                  {voice}
                </option>
              ))}
            </select>
          </div>

          <div className="grid">
            <section>
            <textarea
                id="ttsUserInput"
                name="bio"
                placeholder="Write something short and sweet to say..."
                aria-label="Professional short bio"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </section>
          </div>

          <details>
            <summary role="button" className="contrast outline noBorder">
              Audio Output
            </summary>
            <div className="container-fluid centered">
              <div className="">
                <label htmlFor="volume">Volume Control</label>
                <input
                  type="range"
                  id="volume"
                  min="0"
                  max="10"
                  step="1"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </div>

              <div className="">
                <label htmlFor="speed">Voice Speed Control</label>
                <input
                  type="range"
                  id="speed"
                  min="0"
                  max="15"
                  step="3"
                  value={voiceSpeed}
                  onChange={(e) => setVoiceSpeed(e.target.value)}
                />
              </div>

              <div className="">
                <label htmlFor="pitch">Pitch Control</label>
                <input
                  type="range"
                  id="pitch"
                  min="0"
                  max="2"
                  step="0.5"
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)} />
              </div>
            </div>
          </details>

          <details>
            <summary role="button" className="contrast outline noBorder">
              Translation Options
            </summary>
            <div className="grid">
              <label>Translate From</label>
              <select
                id="TranslateFrom"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="ar">Arabic</option>
              </select>

              <label>Translate To</label>
              <select
                id="TranslateTo"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
            <section>
              <textarea
                id="langOutput"
                name="disabled"
                value={translatedText}
                onChange={(e) => setTranslatedText(e.target.value)}
                disabled
              ></textarea>
            </section>
          </details>
          <div className="button-group">
          <button id="readBtn" className="read-button" onClick={ TTSread }>
            Read!
          </button>
          <button id="saveBtn" className="save-button" onClick={ TTSsave }>
            Save voice clip!
          </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GenClips;