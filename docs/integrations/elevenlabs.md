---
sidebar_position: 3
---

# ElevenLabs Integration

ElevenLabs provides advanced voice synthesis, voice cloning, and audio processing capabilities.

## Configuration

### Required API Key

```json
{
  "apiKeys": {
    "elevenlabs_api_key": "..."
  }
}
```

## Available Actions

### textToSpeech

Convert text to natural-sounding speech.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Text to convert |
| `voiceId` | string | No | Voice ID |
| `voiceName` | string | No | Voice name (alternative to ID) |
| `modelId` | string | No | Model to use |
| `stability` | number | No | Voice stability (0-1) |
| `similarityBoost` | number | No | Similarity to original (0-1) |

**Models:**

| Model | Description |
|-------|-------------|
| `eleven_multilingual_v2` | High quality, 29 languages |
| `eleven_flash_v2_5` | Fast, low latency |
| `eleven_turbo_v2_5` | Balanced quality/speed |

**Example:**

```json
{
  "action": "textToSpeech",
  "arguments": {
    "text": "Welcome to our platform!",
    "voiceName": "Rachel",
    "modelId": "eleven_multilingual_v2"
  }
}
```

### speechToText

Transcribe audio with speaker diarization.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileUrl` | string | Yes | Audio file URL |
| `languageCode` | string | No | Language code |
| `diarize` | boolean | No | Enable speaker detection |

**Example:**

```json
{
  "action": "speechToText",
  "arguments": {
    "fileUrl": "https://example.com/meeting.mp3",
    "diarize": true
  }
}
```

### voiceClone

Create a voice clone from audio samples.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Name for the voice |
| `files` | string[] | Yes | Paths to audio samples |
| `description` | string | No | Voice description |

**Example:**

```json
{
  "action": "voiceClone",
  "arguments": {
    "name": "Custom Voice",
    "files": ["/path/to/sample1.mp3", "/path/to/sample2.mp3"],
    "description": "Professional male voice"
  }
}
```

### soundEffect

Generate sound effects from text descriptions.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Description of sound |
| `durationSeconds` | number | No | Duration (0.5-5s) |

**Example:**

```json
{
  "action": "soundEffect",
  "arguments": {
    "text": "Soft rain falling on leaves",
    "durationSeconds": 3
  }
}
```

### isolateAudio

Remove background noise from audio.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileUrl` | string | Yes | Audio file URL |

## Voice Library

### Available Voices

Search for voices:

```typescript
await mcp__ElevenLabs__search_voices({
  search: "professional",
  sort: "name"
});
```

### Popular Voices

| Voice | Style |
|-------|-------|
| Rachel | Warm, conversational |
| Adam | Clear, professional |
| Bella | Friendly, energetic |
| Antoni | Deep, authoritative |

## Conversational AI

Create voice agents for phone interactions:

```typescript
await mcp__ElevenLabs__create_agent({
  name: "Support Agent",
  firstMessage: "Hi, how can I help you today?",
  systemPrompt: "You are a helpful support agent...",
  voiceId: "voice-id"
});
```

## Best Practices

### Voice Selection

- Match voice to audience and purpose
- Test multiple voices before choosing
- Consider language support needs

### Quality Settings

- Higher stability = more consistent output
- Higher similarity = closer to original voice
- Balance based on use case

### Cost Management

- Use flash models for drafts
- Cache frequently used audio
- Batch similar requests

## Related

- [OpenAI Integration](/integrations/openai)
- [Integrations Overview](/integrations/overview)
