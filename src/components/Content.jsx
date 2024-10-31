import React from 'react'

const Content = () => {
    return (
        <div>
            <main>
                <section class="container">
                    <div class="grid">
                        <select id="API">
                            <option value="responsiveVoice" disabled selected>Speech API</option>
                            <option value="responsiveVoice">Responsive Voice</option>
                            <option value="synthSpeech">SynthSpeech</option>
                        </select>
                        <select id="Voice">
                            <option value="Male" disabled selected>Voice Options</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>


                    <div class="grid">
                        <section>
                            <textarea id="ttsUserInput" name="bio" placeholder="Write some text for Codey to read..." aria-label="Professional short bio"></textarea>
                            <small>Keep it short and sweet!</small>
                        </section>
                    </div>

                    <details>
                        <summary role="button" class="contrast outline noBorder">Audio Output</summary>
                        <div class="container-fluid centered">
                            <div class="voice-settings">
                                <label for="volume">Volume Control</label>
                                <input type="range" id="volume" min="0" max="10" step="1" />
                            </div>

                            <div class="voice-settings">
                                <label for="speed">Voice Speed Control</label>
                                <input type="range" id="speed" min="0" max="15" step="3" />
                            </div>

                            <div class="voice-settings">
                                <label for="pitch">Pitch Control</label>
                                <input type="range" id="pitch" min="0" max="2" step="0.5" />
                            </div>
                        </div>
                    </details>

                    <details>
                        <summary role="button" class="contrast outline noBorder">Translation Options</summary>
                        <div class="grid">
                            <select id="TranslateFrom">
                                <option value="en" disabled selected>Translate From</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="ja">Japanese</option>
                                <option value="ar">Arabic</option>
                            </select>
                            <select id="TranslateTo">
                                <option value="en" disabled selected>Translate To</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="ja">Japanese</option>
                                <option value="ar">Arabic</option>
                            </select>
                        </div>
                        <section>
                            <textarea id="langOutput" name="disabled" disabled>
                                Translated text will show here...
                            </textarea>
                        </section>
                    </details>

                    <button id="ttsBtn" class="container-fluid">Read!</button>
                </section>
            </main>
        </div>
    )
}

export default Content
