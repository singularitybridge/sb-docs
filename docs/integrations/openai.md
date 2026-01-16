---
sidebar_position: 2
---

# OpenAI Integration

The OpenAI integration provides access to speech synthesis, audio transcription, and web search capabilities.

## Configuration

### Required API Key

```bash
OPENAI_API_KEY=sk-...
```

Or via company settings:

```json
{
  "apiKeys": {
    "openai_api_key": "sk-..."
  }
}
```

## Available Actions

### generateOpenAiSpeech

Generate speech from text using OpenAI's TTS models.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Text to convert to speech |
| `voice` | string | No | Voice ID (default: `alloy`) |
| `model` | string | No | TTS model (default: `tts-1`) |

**Available Voices:**
- `alloy` - Neutral, balanced
- `echo` - Warm, natural
- `fable` - Expressive
- `onyx` - Deep, authoritative
- `nova` - Energetic, bright
- `shimmer` - Soft, gentle

**Example:**

```json
{
  "action": "generateOpenAiSpeech",
  "arguments": {
    "text": "Hello, welcome to our service!",
    "voice": "nova",
    "model": "tts-1-hd"
  }
}
```

### transcribeAudioWhisperFromURL

Transcribe audio files using Whisper.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | URL of audio file |
| `language` | string | No | Language code (auto-detected if not specified) |

**Supported Formats:**
- MP3, MP4, MPEG, MPGA
- M4A, WAV, WEBM

**Example:**

```json
{
  "action": "transcribeAudioWhisperFromURL",
  "arguments": {
    "url": "https://example.com/audio.mp3",
    "language": "en"
  }
}
```

**Response:**

```json
{
  "text": "Transcribed text content...",
  "duration": 45.2
}
```

### webSearch

Search the web using OpenAI's capabilities (via Perplexity integration).

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search query |

**Example:**

```json
{
  "action": "webSearch",
  "arguments": {
    "query": "latest TypeScript features 2025"
  }
}
```

## Model Support

### Chat Models

Used for agent conversations:

| Model | Context | Best For |
|-------|---------|----------|
| `gpt-5` | 128K | Most capable |
| `gpt-4o` | 128K | Complex tasks |
| `gpt-4o-mini` | 128K | Fast responses |
| `o3` | 128K | Deep reasoning |
| `o3-mini` | 128K | Balanced reasoning |

### Embedding Models

Used for vector search:

| Model | Dimensions | Use Case |
|-------|------------|----------|
| `text-embedding-ada-002` | 1536 | Default embeddings |
| `text-embedding-3-small` | 1536 | Cost-effective |
| `text-embedding-3-large` | 3072 | Higher quality |

## Code Execution

OpenAI's Code Interpreter can be used for data processing:

```typescript
// Via executeCode action
{
  "action": "executeCode",
  "arguments": {
    "code": "import pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.describe())",
    "fileUrl": "https://example.com/data.csv"
  }
}
```

See [Code Execution Feature](/features/code-execution) for details.

## Best Practices

### Cost Optimization

- Use `gpt-4o-mini` for simple tasks
- Limit max tokens appropriately
- Cache common responses

### Quality

- Use `gpt-4o` for complex reasoning
- Provide clear, specific prompts
- Include examples when helpful

### Speech

- Use `tts-1-hd` for production quality
- Match voice to use case
- Keep text concise for natural speech

## Related

- [Code Execution](/features/code-execution)
- [Vector Search](/features/vector-search)
- [Integrations Overview](/integrations/overview)
