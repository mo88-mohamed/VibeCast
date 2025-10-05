/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Episode } from '../types/podcasts';
import FontAwesome from '@react-native-vector-icons/fontawesome';

type playerRouteProp = RouteProp<{ params: Episode }, 'params'>;

// Enable playback in silence mode
Sound.setCategory('Playback');

const AudioScreen = () => {
  const { artist,  image, title, enclosureUrl } = useRoute<playerRouteProp>().params;
  const soundRef = useRef<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setupPlayer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (soundRef.current) {
        soundRef.current.release();
      }
    };
  }, []);

  const setupPlayer = () => {
    const sound = new Sound(enclosureUrl, '', (error) => {
      if (error) {
        console.error('Failed to load sound', error);
        setIsLoading(false);
        return;
      }
      
      soundRef.current = sound;
      setDuration(sound.getDuration());
      setIsLoading(false);
      
      // Auto-play
      sound.play((success) => {
        if (success) {
          setIsPlaying(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      });
      setIsPlaying(true);
      startProgressTracking();
    });
  };

  const startProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (soundRef.current) {
        soundRef.current.getCurrentTime((seconds) => {
          setCurrentTime(seconds);
        });
      }
    }, 500);
  };

  const togglePlayback = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      soundRef.current.play((success) => {
        if (success) {
          setIsPlaying(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      });
      setIsPlaying(true);
      startProgressTracking();
    }
  };

  const skipForward = () => {
    if (!soundRef.current) return;
    const newTime = Math.min(currentTime + 10, duration);
    soundRef.current.setCurrentTime(newTime);
    setCurrentTime(newTime);
  };

  const skipBackward = () => {
    if (!soundRef.current) return;
    const newTime = Math.max(currentTime - 10, 0);
    soundRef.current.setCurrentTime(newTime);
    setCurrentTime(newTime);
  };

  const onSliderValueChange = (value: number) => {
    if (!soundRef.current) return;
    soundRef.current.setCurrentTime(value);
    setCurrentTime(value);
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image || '' }} style={styles.albumArt} />

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.artist}>{artist}</Text> */}
        </View>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={currentTime}
        onSlidingComplete={onSliderValueChange}
        minimumTrackTintColor="#000"
        maximumTrackTintColor="#000"
        thumbTintColor="#000"
        disabled={isLoading}
      />

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={skipBackward}>
          <FontAwesome name="step-backward" size={32}  />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
          <FontAwesome
            name={isPlaying ? 'pause' : 'play'}
            size={32}
    
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipForward}>
          <FontAwesome name="step-forward" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AudioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#1f0036',
  },
  albumArt: {
    width: '85%',
    alignSelf: 'center',
    height: 400,
    borderRadius: 20,
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 190,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    // color: '#fff',
  },
  artist: {
    fontSize: 16,
    // color: '#ccc',
  },
  slider: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 160 : 170,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  timeText: {
    // color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 70,
    height: 70,
    // backgroundColor:"#jdnj",
    // backgroundColor: '#8a4fff',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8a4fff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginHorizontal: 40,
  },
  controlIcon: {
    width: 50,
    height: 50,
  },
});

