import React from 'react'

const Content = () => {
    return (
        <div>
            <main>
                <section className="container">
                    <div className="grid">
                        <select id="API">
                            <option defaultValue="responsiveVoice" disabled >Speech API</option>
                            <option value="responsiveVoice">Responsive Voice</option>
                            <option value="synthSpeech">SynthSpeech</option>
                        </select>
                        <select id="Voice">
                            <option defaultValue="Male" disabled >Voice Options</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>


                    <div className="grid">
                        <section>
                            <textarea id="ttsUserInput" name="bio" placeholder="Write some text htmlFor Codey to read..." aria-label="Professional short bio"></textarea>
                            <small>Keep it short and sweet!</small>
                        </section>
                    </div>

                    <details>
                        <summary role="button" className="contrast outline noBorder">Audio Output</summary>
                        <div className="container-fluid centered">
                            <div className="voice-settings">
                                <label htmlFor="volume">Volume Control</label>
                                <input type="range" id="volume" min="0" max="10" step="1" />
                            </div>

                            <div className="voice-settings">
                                <label htmlFor="speed">Voice Speed Control</label>
                                <input type="range" id="speed" min="0" max="15" step="3" />
                            </div>

                            <div className="voice-settings">
                                <label htmlFor="pitch">Pitch Control</label>
                                <input type="range" id="pitch" min="0" max="2" step="0.5" />
                            </div>
                        </div>
                    </details>

                    <details>
                        <summary role="button" className="contrast outline noBorder">Translation Options</summary>
                        <div className="grid">
                            <select id="TranslateFrom">
                                <option defaultValue="en" disabled >Translate From</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="ja">Japanese</option>
                                <option value="ar">Arabic</option>
                            </select>
                            <select id="TranslateTo">
                                <option defaultValue="en" disabled >Translate To</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="ja">Japanese</option>
                                <option value="ar">Arabic</option>
                            </select>
                        </div>
                        <section>
                            <textarea id="langOutput" name="disabled" value = "Translated text will show here..." disabled>
                            </textarea>
                        </section>
                    </details>

                    <button id="ttsBtn" className="container-fluid">Read!</button>
                </section>
            </main>
        </div>
    )
}

export default Content
