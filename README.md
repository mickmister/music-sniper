# midi-jam-helper

Use web midi to queue up chords to play on command. Play chords on your midi device (with your limbs) during recording mode, then have them play on your midi device that supports audio output in playback mode. No rhythm is used for recording or playback. The chords will be sustained until you choose to move to another chord or stop playback altogether.


## Setup

* Plug in your midi device.
* Load/reload the page in your browser.
* Choose the midi device you want to be your input/output(s).

## Recording

* Set the application to recording mode by selecting "Recording Mode" in the main control panel.
* Hit record to start capturing.
* Play a chord on the midi device. The app will capture your midi "on" events and determine which notes make up the chord you want to playback.
* After playing the chord, press the "next chord" button, or press the "finish progression" button.


## Playback

* Set the application to playback mode by selecting "Playback Mode" in the main control panel.
* Press "Start Playback" to play the first chord of your progression.
* All the notes of the chord will be transferred to your midi device to be played simultaneously.
* The notes will continue ringing out until you press "Next Chord" or "Stop Chord"
