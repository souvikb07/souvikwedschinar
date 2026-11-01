import wave
import math
import struct

def generate_wedding_music():
    sample_rate = 44100
    duration = 24.0 # 24 seconds loop
    num_samples = int(sample_rate * duration)
    
    # Scale notes in Hz (Raag Yaman / Major 9th romantic Indian wedding scale)
    # Root C4 = 261.63 Hz, D4 = 293.66, E4 = 329.63, F#4 = 369.99, G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25
    notes = {
        'C3': 130.81, 'G3': 196.00, 'C4': 261.63, 'D4': 293.66,
        'E4': 329.63, 'Fs4': 369.99, 'G4': 392.00, 'A4': 440.00,
        'B4': 493.88, 'C5': 523.25, 'D5': 587.33, 'E5': 659.25,
        'G5': 783.99
    }
    
    # Melody sequence: (start_sec, duration_sec, note_name, volume)
    # Warm bansuri flute style
    melody = [
        (0.5, 2.0, 'E4', 0.28), (2.5, 1.2, 'G4', 0.25), (3.7, 2.3, 'A4', 0.30),
        (6.0, 1.8, 'G4', 0.25), (7.8, 3.2, 'C5', 0.32),
        (11.0, 1.5, 'B4', 0.26), (12.5, 1.5, 'A4', 0.28), (14.0, 2.5, 'G4', 0.30),
        (16.5, 2.0, 'E4', 0.26), (18.5, 1.8, 'D4', 0.24), (20.3, 3.5, 'C4', 0.30)
    ]
    
    # Harp arpeggios: (start_sec, note_name)
    arpeggio_pattern = ['C3', 'G3', 'C4', 'E4', 'G4', 'C4', 'E4', 'G4']
    harp_notes = []
    t = 0.0
    while t < duration:
        for n in arpeggio_pattern:
            harp_notes.append((t, n))
            t += 0.375 # 8 notes every 3 seconds
            
    # Tambura drone (C3 and G3 warm harmonics)
    drone_freqs = [130.81, 196.00, 261.63]
    
    samples_left = [0.0] * num_samples
    samples_right = [0.0] * num_samples
    
    # Render Drone
    for i in range(num_samples):
        sec = i / sample_rate
        d_val = 0.0
        for f in drone_freqs:
            d_val += 0.05 * math.sin(2 * math.pi * f * sec)
            # subtle warmth overtone
            d_val += 0.02 * math.sin(2 * math.pi * f * 2 * sec)
        samples_left[i] += d_val
        samples_right[i] += d_val
        
    # Render Harp Plucks
    for start_t, n_name in harp_notes:
        freq = notes.get(n_name, 261.63)
        start_idx = int(start_t * sample_rate)
        note_len = int(1.8 * sample_rate)
        for j in range(note_len):
            idx = start_idx + j
            if idx >= num_samples: break
            t_note = j / sample_rate
            # string decay envelope: attack 10ms, exponential decay
            env = math.exp(-3.2 * t_note) if t_note > 0.01 else (t_note / 0.01)
            # string harmonics
            val = env * 0.14 * (
                math.sin(2 * math.pi * freq * t_note) +
                0.4 * math.sin(2 * math.pi * freq * 2 * t_note) +
                0.2 * math.sin(2 * math.pi * freq * 3 * t_note)
            )
            # stereo spread
            pan = 0.5 + 0.25 * math.sin(start_t)
            samples_left[idx] += val * (1.0 - pan)
            samples_right[idx] += val * pan
            
    # Render Bansuri Flute Melody
    for start_t, dur, n_name, vol in melody:
        freq = notes.get(n_name, 329.63)
        start_idx = int(start_t * sample_rate)
        note_len = int(dur * sample_rate)
        for j in range(note_len):
            idx = start_idx + j
            if idx >= num_samples: break
            t_note = j / sample_rate
            
            # soft flute envelope with gentle vibrato
            att = min(1.0, t_note / 0.18)
            rel = min(1.0, (dur - t_note) / 0.25) if t_note > dur - 0.25 else 1.0
            vibrato = 1.0 + 0.008 * math.sin(2 * math.pi * 5.2 * t_note) if t_note > 0.3 else 1.0
            
            f_inst = freq * vibrato
            # flute waveform: rich fundamental, soft odd harmonics
            val = att * rel * vol * (
                math.sin(2 * math.pi * f_inst * t_note) +
                0.22 * math.sin(2 * math.pi * f_inst * 2 * t_note) +
                0.12 * math.sin(2 * math.pi * f_inst * 3 * t_note)
            )
            samples_left[idx] += val * 0.5
            samples_right[idx] += val * 0.5

    # Crossfade loop ends (1.5 seconds)
    fade_len = int(1.5 * sample_rate)
    for i in range(fade_len):
        t_fade = i / fade_len
        # blend end into beginning
        end_idx = num_samples - fade_len + i
        samples_left[i] = samples_left[i] * t_fade + samples_left[end_idx] * (1.0 - t_fade)
        samples_right[i] = samples_right[i] * t_fade + samples_right[end_idx] * (1.0 - t_fade)

    # Master and write 16-bit stereo PCM WAV
    out_wav = "public/assets/bg-music.wav"
    with wave.open(out_wav, 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        
        frames = bytearray()
        for i in range(num_samples):
            # soft limiter
            sl = max(-1.0, min(1.0, samples_left[i]))
            sr = max(-1.0, min(1.0, samples_right[i]))
            
            il = int(sl * 32767)
            ir = int(sr * 32767)
            frames.extend(struct.pack('<hh', il, ir))
            
        wf.writeframes(frames)
        
    print(f"Generated {out_wav} ({duration}s looping audio)")

if __name__ == "__main__":
    generate_wedding_music()
